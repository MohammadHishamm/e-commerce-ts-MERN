import mongoose, {Schema,Document} from "mongoose";


export interface IUser extends Document {

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: "user" | "dealer" | "superadmin";
}

const userSchema = new Schema<IUser>({ 
    firstname : { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["user", "dealer","superadmin"], default: "user" }  
});

export const userModel = mongoose.model<IUser>("User", userSchema);
