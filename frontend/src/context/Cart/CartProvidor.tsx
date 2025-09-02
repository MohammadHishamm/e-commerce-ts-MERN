import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContent";



const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addItemtoCart = (productId: string) => {
    console.log(productId);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemtoCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
