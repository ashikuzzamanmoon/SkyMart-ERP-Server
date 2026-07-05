import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginValidationSchema } from './auth.validation';
import auth from '../../middlewares/auth'; // We'll create this next

const router = express.Router();

router.post('/login', validateRequest(loginValidationSchema), AuthController.login);

router.post('/refresh-token', AuthController.refreshToken);

router.get('/me', auth, AuthController.getMe);

export const AuthRoutes = router;
