import { parse } from "qs";
import { cartModel, ICart, ICartItem } from "../modules/cartModel";
import { productModel } from "../modules/productModel";
import { IOrderItem, orderModel } from "../modules/orderModel";

interface CreateCartForUSer {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUSer) => {
  const cart = await cartModel.create({ userId });
  await cart.save();
  return cart;
};

interface getActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: getActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface addItemToCart {
  productId: any;
  userId: string;
  quantity: string;
}

export const addItemToCart = async ({
  productId,
  userId,
  quantity,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );

  if (existInCart) {
    return { data: "item exists", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if (product.stock < parseInt(quantity)) {
    return { data: "Insufficient stock", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: parseInt(quantity),
  });
  cart.totalAmount += product.price * parseInt(quantity);

  const addedItems = await cart.save();
  return { data: addedItems, statusCode: 200 };
};

interface updateIteminCart {
  productId: any;
  userId: string;
  quantity: string;
}

export const updateItemQuantityInCart = async ({
  productId,
  userId,
  quantity,
}: updateIteminCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );

  if (!existInCart) {
    return { data: "Item not found in cart", statusCode: 400 };
  }
  existInCart.quantity = parseInt(quantity);

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId.toString()
  );

  let total = calculateTotalAmount({ cartItems: otherCartItems });
  total += existInCart.unitPrice * existInCart.quantity;

  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface removeItemFromCart {
  productId: any;
  userId: string;
}

export const removeItemFromCart = async ({
  productId,
  userId,
}: removeItemFromCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );

  if (!existInCart) {
    return { data: "Item not found in cart", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId.toString()
  );

  let total = calculateTotalAmount({ cartItems: otherCartItems });
 

  cart.items = otherCartItems;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

const calculateTotalAmount = ({
  cartItems,
}: {
  cartItems: ICartItem[];

}) => {
 

  let total = cartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);
  return total;
};

interface clearCart{
  userId: string;
}


export const clearCart = async ({ userId }: clearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return { data: cart, statusCode: 200 };
};


interface checkout{
  userId: string;
  address: string
}

export const checkout = async ({userId, address}: checkout) => {
  if(!address){
    return { data: "Address is required", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({userId});

  const orderItems= [];

  for(const item of cart.items){
   const product = await productModel.findById(item.product);
    
   if (!product) {
     return { data: "Product not found", statusCode: 400 };
   }

   const orderItem : IOrderItem = {
     productTitle: product.title,
     productImage: product.image,
     quantity: item.quantity,
     unitPrice: item.unitPrice
   };

   orderItems.push(orderItem);
  }

    const order= await orderModel.create({
      orderItems,
      total: cart.totalAmount,
      address,
      userId
      
    });
      
   await order.save();

   cart.status = "completed";
   await cart.save();
   return { data: order, statusCode: 201 };
};