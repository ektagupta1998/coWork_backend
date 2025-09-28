import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("photo"), (req, res) => {
  try {
    res.json({
      message: "File uploaded successfully!",
      file: req.file
    });
  } catch (err) {
    res.status(500).json({ error: "File upload failed" });
  }
});

export default router;
