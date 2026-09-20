import { useEffect, useRef } from "react";

function canUseNotifications() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function useOrderReadyNotification(order) {
  const previousStatusRef = useRef(null);

  useEffect(() => {
    if (!canUseNotifications()) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!order) return;

    const becameReady =
      order.status === "READY" && previousStatusRef.current !== "READY";

    if (becameReady && canUseNotifications() && Notification.permission === "granted") {
      new Notification("Your order is ready!", {
        body: `Order ${order.orderId} is ready for pickup. Pickup code: ${order.pickupCode}`,
      });
    }

    previousStatusRef.current = order.status;
  }, [order]);
}
