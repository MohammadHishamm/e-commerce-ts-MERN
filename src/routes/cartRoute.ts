import express from "express";
import { getActiveCartForUser, addItemToCart, updateItemQuantityInCart, removeItemFromCart, clearCart, checkout } from "../services/cartService";
import validateJWT, {ExtendedRequest} from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try{ const userId = req.user._id;
    //get userId from JWT (middleware)
     const cart = await getActiveCartForUser({userId});
     res.status(200).send(cart);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/items",validateJWT, async (req: ExtendedRequest, res) => {
     try{
         const userId = req.user._id;
         const {productId, quantity} = req.body;
         const response = await addItemToCart({productId,userId, quantity});
         res.status(200).send(response);
     } catch (error) {
         res.status(500).send("Internal Server Error");
     }
})

router.put("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try{
      const userId = req.user._id;
      const { productId, quantity } = req.body;

  // Logic to update the item quantity in the cart
  const response = await updateItemQuantityInCart({ productId, userId, quantity });
  res.status(200).send(response);
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
});

router.delete("/items/:id", validateJWT, async (req: ExtendedRequest, res) => {
  try {
      const userId = req.user._id;
      const { id: productId } = req.params;

  // Logic to remove the item from the cart
  const response = await removeItemFromCart({ productId, userId });
  res.status(200).send(response);
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
});

router.delete("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
      const userId = req.user._id;
      const response = await clearCart({ userId });
      res.status(200).send(response);
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res) => {
  try{ const userId = req.user._id;
  const { address } = req.body;
  const response = await checkout({ userId, address });

  res.status(response.statusCode).send(response.data);
}catch(err){res.status(500).send("Internal Server Error");}
 
});

export default router;