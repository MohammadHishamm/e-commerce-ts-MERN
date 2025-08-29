import express from 'express';
import { register, login } from '../services/userService';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const result = await register(data);
    res.status(result.statusCode).send(result.data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } 
});

router.post('/login', async (req, res) => {
   try {
     const findUser = await login(req.body);
     res.status(findUser.statusCode).send(findUser.data);
   } catch (error) {
     res.status(500).send("Internal Server Error");
   }
});

export default router;