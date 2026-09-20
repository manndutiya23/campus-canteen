import { useCallback, useEffect, useRef, useState } from "react";

import { getOrder } from "../services/api";

const POLL_INTERVAL_MS = 5000;
const TERMINAL_STATUSES = ["COLLECTED"];

export function usePollOrderStatus(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const intervalRef = useRef(null);

  const fetchOrder = useCallback(async () => {
    try {
      const data = await getOrder(orderId);
      setOrder(data);
      setError("");

      if (TERMINAL_STATUSES.includes(data.status) && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return undefined;

    fetchOrder();

    intervalRef.current = setInterval(fetchOrder, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [orderId, fetchOrder]);

  return { order, loading, error, refresh: fetchOrder };
}
