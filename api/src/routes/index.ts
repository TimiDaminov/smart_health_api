import { Router } from 'express';
import { submitData,getData } from '../controllers/deviceController';
const router = Router();


router.post('/submit-data', submitData);
router.get('/get-data', getData);

export default router;
