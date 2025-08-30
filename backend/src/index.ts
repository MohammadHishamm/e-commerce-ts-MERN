import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute";
import { getProducts } from "./services/productService";
import cartRoute from "./routes/cartRoute";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
mongoose.connect("mongodb://localhost:27017/e-commerce").then(() => {console.log("Connected to MongoDB")}).catch((err) => {console.log(err)});


// fetch products :
getProducts();

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});