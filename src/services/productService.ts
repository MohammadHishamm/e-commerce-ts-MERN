import { productModel } from "../modules/productModel";

export const addProduct = async (productData: {title: string; image: string; price: string; stock: number}) => {
  
  try{
  const newProduct = new productModel(productData);

  const isExist = await productModel.findOne({title: productData.title});
  if (isExist) {
    return {data: "Product already exists", statusCode: 400};
  }

  await newProduct.save();
  return {data : newProduct, statusCode: 200};
} catch(err){
  return {data: "Internal Server Error", statusCode: 500};
}
};

export const getProducts = async () => {
  try {
    const products = await productModel.find();
    if (products.length === 0) {
      return { data: "No products found", statusCode: 404 };
    }
    return { data: products, statusCode: 200 };
  } catch (err) {
    return { data: "Internal Server Error", statusCode: 500 };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await productModel.findByIdAndDelete(productId);
    return { data: "Product deleted successfully", statusCode: 200 };
  } catch (err) {
    return { data: "Internal Server Error", statusCode: 500 };
  }
};

export const updateProduct = async (productId: string, updateData: {title?: string; image?: string; price?: string; stock?: number}) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, {new: true});
    return {data: updatedProduct, statusCode: 200};
  } catch (err) {
    return { data: "Internal Server Error", statusCode: 500 };
  }
};
