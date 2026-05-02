import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ drivers }) {
  return (
    <MapContainer
      center={[30.0444, 31.2357]} // Cairo default
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {drivers.map((d, i) => (
        <Marker key={i} position={[d.latitude, d.longitude]}>
          <Popup>
            🚚 Driver: {d.driverId}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}