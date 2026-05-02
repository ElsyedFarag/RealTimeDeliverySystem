import { useEffect, useState } from "react";
import { connection } from "../../signalr/connection";

export default function DriverHome() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    connection.on("OrderAssigned", (data) => {
      console.log("🚚 New Assigned Order", data);
      setOrder(data);
    });
  }, []);

  return (
    <div>
      <h2>🚚 Driver Panel</h2>

      {order ? (
        <div>
          <h3>New Order Assigned</h3>
          <p>Order ID: {order.orderId}</p>
          <p>Status: {order.status}</p>
        </div>
      ) : (
        <p>No orders yet...</p>
      )}
    </div>
  );
}