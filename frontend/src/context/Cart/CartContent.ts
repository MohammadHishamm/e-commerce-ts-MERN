import { createContext, useContext } from "react";
import type { CartItem } from "../../types/cartItem";


interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItem: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItem: () => {},
});

export const useCart = () => useContext(CartContext);
