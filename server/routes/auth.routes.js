import { Router } from 'express';
const router = new Router();
import passport from 'passport';
import * as AuthController from '../controllers/auth.controller';

router.post('/signup', AuthController.signup);

router.post('/login', passport.authenticate('local'), AuthController.generateToken, AuthController.respond);

export default router;
