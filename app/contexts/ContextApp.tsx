"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface Product {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
interface CartSummary {
  totalPrice: number;
  totalQuantity: number;
  products: Product[];
}

interface AppContextProps {
  searchValue: string | null;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
  totalQuant: number | null;
  setTotalQuant: React.Dispatch<React.SetStateAction<number | null>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cartSummary: CartSummary | undefined;
  setCartSummary: React.Dispatch<React.SetStateAction<CartSummary | undefined>>;
  addItemToCart: (data: Product) => void;
  updateItemQuantity: (id: number, index: number,  quantity: number, size: string, color: string) => void;
  removeItemFromCart: (id: number,  index: number) => void;
  productsCart: Product[];
  calculateCartSummary: (cartItems: Product[]) => CartSummary;
  disclosure: UseDisclosureReturn;
  disclosureFav: UseDisclosureReturn;
}

const ContextApp = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [productsCart, setProductsCart] = useState<Product[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>();
  const [totalQuant, setTotalQuant] = useState<number | null>(null);
  const disclosure = useDisclosure();
  const disclosureFav = useDisclosure();
  
  const calculateCartSummary = (cartItems: Product[]): CartSummary => {
    const { totalPrice, totalQuantity } = cartItems.reduce(
      (acc, { price, quantity }) => {
        return {
          totalPrice: price * quantity + acc.totalPrice,
          totalQuantity: quantity + acc.totalQuantity,
        };
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
  
    return {
      totalPrice,
      totalQuantity,
      products: cartItems,
    };
  };
  
  useEffect(() => {
    const storedCart = localStorage.getItem("MyCart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart) as Product[];
      setProductsCart(cartItems);
      setCartSummary(calculateCartSummary(cartItems));
    } else {
      // Se o carrinho estiver vazio, inicialize com um array vazio
      setProductsCart([]);
      setCartSummary({ totalPrice: 0, totalQuantity: 0, products: [] });
    }
  }, [/* Dependências conforme necessário */]);
  
  const addItemToCart = (data: Product) => {
    const { id, quantity, size, color } = data;
  
    const existingProduct = productsCart.find(
      (product) =>
        product.id === id && product.size === size && product.color === color
    );
  
    let updatedCart: Product[];
  
    if (!existingProduct) {
      updatedCart = [...productsCart, { ...data, quantity }];
    } else {
      updatedCart = productsCart.map((product) =>
        product.id === id && product.size === size && product.color === color
          ? { ...product, quantity: product.quantity + quantity }
          : product
      );
    }
  
    setProductsCart(updatedCart);
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calculateCartSummary(updatedCart));
  };
  const removeItemFromCart = (id: number, index: number) => {
    const updatedCart = productsCart.filter((item, indexItem) => item.id !== id || indexItem !== index);
    setProductsCart(updatedCart);
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calculateCartSummary(updatedCart));
  };

  const updateItemQuantity = (
    id: number,
    index: number,
    quantity: number,
    size: string,
    color: string = "default"
  ) => {
    const updatedCart = productsCart.map((product, i) =>
      i === index && product.id === id
        ? { ...product, quantity, size, color }
        : product
    );
  
    setProductsCart(updatedCart);
    localStorage.setItem("MyCart", JSON.stringify(updatedCart));
    setCartSummary(calculateCartSummary(updatedCart));
  };

  const contextValue: AppContextProps = {
    searchValue,
    setSearchValue,
    cartSummary,
    setCartSummary,
    totalQuant,
    setTotalQuant,
    filteredProducts,
    calculateCartSummary,
    productsCart,
    setFilteredProducts,
    removeItemFromCart,
    updateItemQuantity,
    addItemToCart,
    disclosure,
    disclosureFav,
  };

  return (
    <ContextApp.Provider value={contextValue}>{children}</ContextApp.Provider>
  );
};

export { ContextApp, AppProvider };
