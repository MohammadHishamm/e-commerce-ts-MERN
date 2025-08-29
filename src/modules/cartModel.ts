import mongoose, {Schema, ObjectId, Document} from "mongoose";
import { IProduct } from "./productModel";

const cartStatusEnum = ["active", "completed"]

export interface ICartItem extends Document {
   product: IProduct;
   unitPrice: number;
   quantity: number;
}



export interface ICart extends Document {
   userId: ObjectId | string;
   items: ICartItem[];
   totalAmount: number;
   status: "active" | "completed" ;
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new Schema<ICart>({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   items: { type: [cartItemSchema], required: true },
   totalAmount: { type: Number, required: true, default: 0 },
   status: { type: String, enum: cartStatusEnum, default: "active" }
})

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);