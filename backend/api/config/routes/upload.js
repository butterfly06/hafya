import express from 'express';
import multer from 'multer';
const app = express();
const router = express.Router();

// Configure where uploaded images will be stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  console.log('Image uploaded:', req.file);
  res.json({ success: true, filename: req.file.filename });
});

app.use('/uploads', express.static('uploads')); // serve uploaded files

export default router;