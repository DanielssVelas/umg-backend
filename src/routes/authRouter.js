import { Router } from 'express';
import routerCallback from './router-callback.js';
import { authController } from '../controllers/index.js';

const router = Router();

router.post(
  '/auth/login',
  routerCallback(authController.loginController)
);

export default router;