import { cartModel } from "../modules/cartModel";

interface CreateCartForUSer{
    userId: string;
}


const createCartForUser= async ({userId}: CreateCartForUSer) =>{
     const cart = await cartModel.create({userId})
     await cart.save();
     return cart;
}


interface getActiveCartForUser{
    userId: string;
}

export const getActiveCartForUser = async ({userId}: getActiveCartForUser) => {
 let cart = await cartModel.findOne({userId, status: "active"});
 if(!cart){
     cart = await createCartForUser({userId});
 }
 return cart;
}

