import { productModel } from "../modules/productModel";

export const addProduct = async (productData: {title: string; image: string; price: string; stock: number}) => {
  const newProduct = new productModel(productData);
  await newProduct.save();
  return {data : newProduct, statusCode: 200};
};

export const getProducts = async () => {
  const products = await productModel.find();
  if(products.length === 0){
    return {data: "No products found", statusCode: 404};
  }
  return {data: products, statusCode: 200};
};

export const deleteProduct = async (productId: string) => {
  await productModel.findByIdAndDelete(productId);
  return {data: "Product deleted successfully", statusCode: 200};
};

export const updateProduct = async (productId: string, updateData: {title?: string; image?: string; price?: string; stock?: number}) => {
  const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, {new: true});
  return {data: updatedProduct, statusCode: 200};
};
