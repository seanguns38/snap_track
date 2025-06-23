import { Router } from 'express';
import { login, callback } from '../controllers/authController.js';
const router = Router();

router.get('/spotify/login', login);
router.get('/spotify/callback', callback);

export default router;