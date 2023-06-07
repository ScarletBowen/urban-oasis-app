import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { StripeProvider } from './StripeProvider';
import DonationForm from './DonationForm';

function App() {
  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '50vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © <a href=&quot;https://openstreetmap.org&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={[51.505, -0.09]} />
      </MapContainer>
      <StripeProvider>
        <div className="App">
          <h1>Donation</h1>
          <DonationForm />
        </div>
      </StripeProvider>
    </div>
  );
}

export default App;
