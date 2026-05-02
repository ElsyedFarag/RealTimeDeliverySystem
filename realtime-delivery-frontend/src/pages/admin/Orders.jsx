import { useState } from "react";
import { assignOrderToDriver } from "../../api/orderApi";
import useSignalR from "../../hooks/useSignalR";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [driverId, setDriverId] = useState("");

  useSignalR((order) => {
    setOrders((prev) => [order, ...prev]);
  });

  const handleAssign = async (orderId) => {
    await assignOrderToDriver(orderId, driverId);
    alert("Order Assigned 🚚");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Orders Management</h2>

      <input
        placeholder="Driver Id"
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
      />

      {orders.map((o) => (
        <div key={o.id} style={{ margin: 10 }}>
          <b>Order #{o.id}</b> - {o.customerName}

          <button onClick={() => handleAssign(o.id)}>
            Assign
          </button>
        </div>
      ))}
    </div>
  );
}