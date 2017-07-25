import { Router } from 'express';
const router = new Router();
import passport from 'passport';
import * as RecordsController from '../controllers/records.controller';


router.get('/', passport.authenticate('jwt'), RecordsController.getRecords);

router.put('/update', passport.authenticate('jwt'), RecordsController.updateRecord);

router.post('/add', passport.authenticate('jwt'), RecordsController.createRecord);

router.post('/delete', passport.authenticate('jwt'), RecordsController.deleteRecord);

export default router;
