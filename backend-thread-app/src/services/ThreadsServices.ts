import { v2 as cloudinary } from "cloudinary"
import { Thread } from "../entities/Threads";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createThreadSchema, updateThreadSchema } from "../utils/validators/Thread";

class ThreadsService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response) {
    try {
      const threads = await this.threadRepository.find({
        relations: ["user"],
        order: {
          id: "DESC"
        }
      });

      let responseBaru = []

      threads.forEach(element => {
        responseBaru.push({
          ...element,
          likes_count: Math.floor(Math.random() * 100),
          replies_cout: Math.floor(Math.random() * 100)
        });
      });

      return res.status(200).json(responseBaru);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user"]
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }

  async create(req: Request, res: Response) {
    try {
      const image = res.locals.filename;

      const data = {
        content: req.body.content,
        image,
      };

      const loginSession = res.locals.loginSession;

      const { error } = createThreadSchema.validate(data);

      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      console.log(data);
      

      cloudinary.config({
        cloud_name: "dje5tgwuj",
        api_key: "451686618445968",
        api_secret: "ik0zVU-GMVEXJI--0QK16fqU23M",
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "src/uploads/" + image,
        { folder: "waysbeans-app"}
      );

      console.log("cloudinary response", cloudinaryResponse);
      

      // create object biar typenya sesuai
      const thread = this.threadRepository.create({
        content: data.content,
        image: cloudinaryResponse.secure_url,
        user: {
          id: loginSession.user.id
        }
      });

      // insertion ke database
      const createdThread = this.threadRepository.save(thread);

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });

      const data = req.body;
      const { error } = updateThreadSchema.validate(data)

      if (error) {
        return res.status(400).json({
          error: error
        })
      }

      // bikin pengecekan hanya delete threadnya ketika thread dengan id yg sesuai param itu ada
      if (!thread) {
        return res.status(404).json("Thread ID not found!")
      }


      if (data.content != "") {
        thread.content = data.content;
      }

      if (data.image != "") {
        thread.image = data.image;
      }

      const createdThread = await this.threadRepository.save(thread);
      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });

      // bikin pengecekan hanya delete threadnya ketika thread dengan id yg sesuai param itu ada
      if (!thread) {
        return res.status(404).json("Thread ID not found!")
      }

      const deletedThread = this.threadRepository.delete({
        id: id,
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }
}

export default new ThreadsService();
