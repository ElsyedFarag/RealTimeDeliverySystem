import { useState } from "react";
import useSignalR from "../../hooks/useSignalR";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useSignalR(
    (order) => {
      setOrders((prev) => [order, ...prev]);
    },
    (driver) => {
      setDrivers((prev) => {
        const updated = prev.filter(d => d.driverId !== driver.driverId);
        return [...updated, driver];
      });
    }
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>👨‍💼 Admin Dashboard (Live)</h2>

      <h3>📦 Orders</h3>
      {orders.map((o, i) => (
        <div key={i}>
          #{o.id} - {o.customerName}
        </div>
      ))}

      <h3>🚚 Drivers Live Location</h3>
      {drivers.map((d, i) => (
        <div key={i}>
          Driver: {d.driverId} - {d.latitude}, {d.longitude}
        </div>
      ))}
    </div>
  );
}