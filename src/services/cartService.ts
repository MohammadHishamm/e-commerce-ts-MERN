import { parse } from "qs";
import { cartModel } from "../modules/cartModel";
import { productModel } from "../modules/productModel";

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
