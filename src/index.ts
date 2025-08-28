import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute"


const app = express();
app.use(express.json());
const port = 3001;
mongoose.connect("mongodb://localhost:27017/e-commerce").then(() => {console.log("Connected to MongoDB")}).catch((err) => {console.log(err)});


app.use('/user', userRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});