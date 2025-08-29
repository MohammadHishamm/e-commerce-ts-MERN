import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productService";

const router = express.Router();

router.post("/", async (req,res)=>{
    try{
       const productData= req.body;
       const result = await addProduct(productData);
       res.status(result.statusCode).json(result.data);
   } catch (error) {
       res.status(500).send("Internal Server Error");
   }    
});

router.get("/", async (req,res)=>{
    try {
        const result = await getProducts();
        res.status(result.statusCode).json(result.data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", async (req,res)=>{
    try {
        const productId = req.params.id;
        const result = await deleteProduct(productId);
        res.status(result.statusCode).json(result.data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.put("/:id", async (req,res)=>{
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const result = await updateProduct(productId, updateData);
        res.status(result.statusCode).json(result.data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;