import multer from "multer";
import path from "path";

// Import utils
import { PROFILE_UPLOAD_DIR } from "./variables/paths";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PROFILE_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });
