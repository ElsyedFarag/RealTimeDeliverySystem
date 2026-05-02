import { useState } from "react";
import useSignalR from "../../hooks/useSignalR";

export default function TrackOrder() {
  const [driver, setDriver] = useState(null);

  useSignalR(null, (driverData) => {
    setDriver(driverData);
  });

  return (
    <div>
      <h2>📍 Track Order</h2>

      {driver && (
        <div>
          <p>Driver ID: {driver.driverId}</p>
          <p>Lat: {driver.latitude}</p>
          <p>Lng: {driver.longitude}</p>
        </div>
      )}
    </div>
  );
}