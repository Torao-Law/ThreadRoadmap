import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { User } from "../entities/User"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { loginSchema, registerSchema } from "../utils/validators/Auth"
import { Request, Response } from "express"

export default new class AuthService {
  private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)

  async register(req: Request, res: Response) : Promise<Response> {
    try {
      const data = req.body

      const { error, value } = registerSchema.validate(data)

      if(error) return res.status(400).json({ Error: error.details[0].message })

      const cekEmail = await this.AuthRepository.count({
        where: {
          email: value.email
        }
      })

      if(cekEmail > 0) return res.status(400).json({ Error: "Email is already registered!" })

      const hashPassword = await bcrypt.hash(value.password, 10)
      
      const user = this.AuthRepository.create({
        full_name: value.full_name,
        username: value.username,
        email: value.email,
        password: hashPassword
      })

      const registerUser = await this.AuthRepository.save(user)

      return res.status(201).json(registerUser)
    } catch (err) {
      return res.status(500).json({ Error: "Error while registering an user" });
    }
  }

  async login(req: Request, res: Response) : Promise<Response> {
    try {
      const data = req.body

      const { error, value } = loginSchema.validate(data)

      const checkEmail = await this.AuthRepository.findOne({
        where: {
          email: value.email
        },
        select: ["id", "full_name", "email", "username", "password"]
      })

      if(!checkEmail) return res.status(400).json({ Error: "Email is not registered" })

      const isCheckPassword = await bcrypt.compare(value.password, checkEmail.password)

      if(!isCheckPassword) return res.status(400).json({ Error: "Password is wrong!" })

      const user = this.AuthRepository.create({
        id: checkEmail.id,
        full_name: checkEmail.full_name,
        username: checkEmail.username,
        email: checkEmail.email,
      })

      const token = await jwt.sign({ user }, "dumbwaysterbaik", { expiresIn: "1h" })

      return res.status(200).json({
        user,
        token
      });
    } catch (err) {
      return res.status(500).json({ Error})
    }
  }

  async check(req: Request, res: Response) : Promise<Response> {
    try {
      const loginSession = res.locals.loginSession
      
      console.log(loginSession);
      
      const user = await this.AuthRepository.findOne({
        where: {
          id: loginSession.user.id
        }
      })

      return res.status(200).json({ user, message: "Token is valid" })
    } catch {
      return res.status(500).json({ Error: "Somethink wrong in server, please check your session logged in"})
    }
  }
}