import { Router } from 'express';
const router = new Router();
import passport from 'passport';
import * as FieldsController from '../controllers/fields.controller';


router.get('/', passport.authenticate('jwt'), FieldsController.getFields);

router.put('/update', passport.authenticate('jwt'), FieldsController.updateField);

router.post('/add', passport.authenticate('jwt'), FieldsController.createField);

router.post('/delete', passport.authenticate('jwt'), FieldsController.deleteField);

export default router;
