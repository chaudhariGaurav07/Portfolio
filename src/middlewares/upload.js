import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.memoryStorage(); //buffer insted of file system

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

export default upload
