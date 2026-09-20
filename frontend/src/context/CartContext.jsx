import { useMemo, useState } from "react";
import { CartContext } from "./cartContextValue";

export function CartProvider({ children }) {
  const [items, setItems] = useState({});

  function addItem(item) {
    setItems((currentItems) => ({
      ...currentItems,
      [item.itemId]: {
        item,
        quantity: (currentItems[item.itemId]?.quantity || 0) + 1,
      },
    }));
  }

  function increaseItem(itemId) {
    setItems((currentItems) => ({
      ...currentItems,
      [itemId]: { ...currentItems[itemId], quantity: currentItems[itemId].quantity + 1 },
    }));
  }

  function decreaseItem(itemId) {
    setItems((currentItems) => {
      const currentItem = currentItems[itemId];
      if (!currentItem || currentItem.quantity <= 1) {
        const remainingItems = { ...currentItems };
        delete remainingItems[itemId];
        return remainingItems;
      }
      return { ...currentItems, [itemId]: { ...currentItem, quantity: currentItem.quantity - 1 } };
    });
  }

  function removeItem(itemId) {
    setItems((currentItems) => {
      const remainingItems = { ...currentItems };
      delete remainingItems[itemId];
      return remainingItems;
    });
  }

  const value = useMemo(() => {
    const cartItems = Object.values(items);
    return {
      items: cartItems,
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
      itemCount: cartItems.reduce((total, entry) => total + entry.quantity, 0),
      total: cartItems.reduce((total, entry) => total + Number(entry.item.price) * entry.quantity, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

