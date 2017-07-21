import { Router } from 'express';
const router = new Router();
import passport from 'passport';
import * as UsersController from '../controllers/users.controller';


router.get('/', passport.authenticate('jwt'), UsersController.getUsers);

router.put('/update', passport.authenticate('jwt'), UsersController.updateUser);

router.post('/add', passport.authenticate('jwt'), UsersController.createUser);

export default router;
