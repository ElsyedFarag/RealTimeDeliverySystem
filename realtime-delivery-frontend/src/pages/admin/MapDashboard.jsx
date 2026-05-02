import { useState } from "react";
import useSignalR from "../../hooks/useSignalR";
import MapView from "../../components/map/MapView";

export default function MapDashboard() {
  const [drivers, setDrivers] = useState([]);

  useSignalR(null, (driver) => {
    setDrivers((prev) => {
      const filtered = prev.filter(d => d.driverId !== driver.driverId);
      return [...filtered, driver];
    });
  });

  return (
    <div>
      <h2>🗺️ Live Drivers Map</h2>
      <MapView drivers={drivers} />
    </div>
  );
}