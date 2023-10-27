import * as express from 'express'
import ThreadsController from '../controllers/ThreadsControllers'
import AuthControllers from '../controllers/AuthControllers'
import AuthenticationMiddleware from "../middlewares/Auth"
// import UploadMiddleware from '../middlewares/UploadFiles'
import { upload } from '../middlewares/UploadFiles'

const router = express.Router()

router.get("/threads", ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.patch("/thread/:id", ThreadsController.update)
router.post(
    "/thread", 
    AuthenticationMiddleware.Authentication, 
    upload("image"), 
    ThreadsController.create
)

router.delete(
    "/thread/:id", 
    AuthenticationMiddleware.Authentication, 
    ThreadsController.delete
)   

router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", 
    AuthenticationMiddleware.Authentication, 
    AuthControllers.check
)

export default router