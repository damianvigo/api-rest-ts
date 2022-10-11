import { Router } from 'express';
import { loginCtrl, registerCtrl } from '../controllers/auth';

const router = Router();

/*
 * http://localhost:3002/auth/register
 * http://localhost:3002/auth/login
 */
router.post('/register', registerCtrl);
router.post('/login', loginCtrl);

export { router };
