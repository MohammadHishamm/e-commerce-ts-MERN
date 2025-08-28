import express from 'express';
import { register, login } from '../services/userService';

const router = express.Router();


router.post('/register', async (req, res) => {
    const data = req.body;
  const result = await register(data);
  res.status(result.statusCode).send(result.data);
});

router.post('/login', async (req, res) => {
   const findUser = await login(req.body);
   res.status(findUser.statusCode).send(findUser.data);
});

export default router;