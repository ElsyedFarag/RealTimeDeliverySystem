import { useEffect } from "react";
import { connection, startConnection } from "../signalr/connection";

export default function useSignalR(onOrderReceived, onDriverLocation) {
  useEffect(() => {
    startConnection();

    // 📦 New Order
    connection.on("NewOrderCreated", (order) => {
      console.log("🔥 New Order:", order);
      if (onOrderReceived) onOrderReceived(order);
    });

    // 🚚 Driver location update
    connection.on("DriverLocationUpdated", (data) => {
      console.log("📍 Driver:", data);
      if (onDriverLocation) onDriverLocation(data);
    });

    return () => {
      connection.stop();
    };
  }, []);
}