import express from "express";
import { getActiveCartForUser, addItemToCart } from "../services/cartService";
import validateJWT, {ExtendedRequest} from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
    const userId = req.user._id;
    //get userId from JWT (middleware)
     const cart = await getActiveCartForUser({userId});
     res.status(200).send(cart);
})
export default router;

router.post("/items",validateJWT, async (req: ExtendedRequest, res) => {

     const userId = req.user._id;
     const {productId, quantity} = req.body;
     const response = await addItemToCart({productId,userId, quantity});
     res.status(200).send(response);
})