"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { Product } from "@/lib/types";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      } else {
        const newItem: CartItem = { ...action.payload, quantity: 1 };
        
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      }
    }
    
    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
      };
    }
    
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      
      if (!itemToUpdate) return state;
      
      const quantityDiff = quantity - itemToUpdate.quantity;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (itemToUpdate.price * quantityDiff)
      };
    }
    
    case "INCREASE_QUANTITY": {
      const itemToUpdate = state.items.find(item => item.id === action.payload);
      if (!itemToUpdate) return state;
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + itemToUpdate.price
      };
    }
    
    case "DECREASE_QUANTITY": {
      const itemToUpdate = state.items.find(item => item.id === action.payload);
      if (!itemToUpdate || itemToUpdate.quantity <= 1) return state;
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - itemToUpdate.price
      };
    }
    
    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  getCartSummary: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const increaseQuantity = (productId: string) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: productId });
  };

  const decreaseQuantity = (productId: string) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartSummary = () => {
    if (state.items.length === 0) {
      return "سبد خرید شما خالی است.";
    }

    const summary = state.items.map(item => 
      `• ${item.name} - تعداد: ${item.quantity} - قیمت: ${item.price.toLocaleString('fa-IR')} تومان`
    ).join('\n');

    return `سبد خرید شما:\n${summary}\n\nمجموع: ${state.totalPrice.toLocaleString('fa-IR')} تومان\nتعداد کل: ${state.totalItems} عدد`;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}