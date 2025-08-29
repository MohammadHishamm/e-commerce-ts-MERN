import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productService";

const router = express.Router();

router.post("/", async (req,res)=>{
   const productData= req.body;
   const result = await addProduct(productData);
   res.status(result.statusCode).json(result.data);
});

router.get("/", async (req,res)=>{
    const result = await getProducts();
    res.status(result.statusCode).json(result.data);
});

router.delete("/:id", async (req,res)=>{
    const productId = req.params.id;
    const result = await deleteProduct(productId);
    res.status(result.statusCode).json(result.data);
});

router.put("/:id", async (req,res)=>{
    const productId = req.params.id;
    const updateData = req.body;
    const result = await updateProduct(productId, updateData);
    res.status(result.statusCode).json(result.data);
});

export default router;