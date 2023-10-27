// import { NextFunction, Request, Response } from "express";
// import * as multer from "multer";

// export default new class UploadMiddleware {
//     Upload(fieldName: string) {
//         const storage = multer.diskStorage({
//             destination: (req, res, cb) => {
//                 cb(null, "./uploads/")
//             },
//             filename: (req, file, cb) => {
//                 const uniqueSuffix = Date.now()
//                 cb(null, file.filename + "-" + uniqueSuffix + ".png")
//             }
//         })
    
//         const uploadFile = multer({
//             storage: storage
//         })
    
//         return (req: Request, res: Response, next: NextFunction) => {
//             uploadFile.single(fieldName)(req, res, function (err: any) {
//                 if(err) {
//                     return res.status(400).json({ Error: "File upload failed." })
//                 }
    
//                 res.locals.filename = req.file.filename
//                 next()
//             })
//         }
//     }
// }


import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export const upload = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  const uploadFile = multer({ storage: storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, function (error: any) {
      if (error) {
        return res.status(400).json({ error });
      }

      res.locals.filename = req.file.filename;
      next();
    });
  };
};