import { createContext, ReactNode, useContext, useState } from 'react';

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: number;
    quantity: number;
};

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    cartQuantity: number;
    cartItems: CartItem[];
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const getItemQuantity = (id: number) => {
        return (
            cartItems.find((item: CartItem) => item.id === id)?.quantity || 0
        );
    };

    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item: CartItem) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (
                currItems.find((item: CartItem) => item.id === id)?.quantity ===
                1
            ) {
                return currItems.filter((item: CartItem) => item.id !== id);
            } else {
                return currItems.map((item: CartItem) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((currItems) => {
            return currItems.filter((item: CartItem) => item.id !== id);
        });
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                openCart,
                closeCart,
                cartQuantity,
                cartItems,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
