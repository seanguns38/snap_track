import { Router } from 'express';
import { parseImage, addToPlaylist } from '../controllers/songController.js';
import multer from 'multer';
const upload = multer();
const router = Router();

router.post('/parse', upload.single('image'), parseImage);
router.post('/add', addToPlaylist);

export default router;