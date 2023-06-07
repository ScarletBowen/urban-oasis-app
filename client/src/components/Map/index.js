import 'leaflet/dist/leaflet.css';
import React from "react";

import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
  } from 'react-leaflet';

// import * as parkData from "../../data/parks.json";


export default function Mapbox() {
//   const [activePark, setActivePark] = React.useState(null);

  const position = [51.505, -0.09]

  return (
    <div className={{height: '250px'}}>
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  )
}

//   return (
//     <Map center={[45.4, -75.7]} zoom={12}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {parkData.features.map(park => (
//         <Marker
//           key={park.properties.PARK_ID}
//           position={[
//             park.geometry.coordinates[1],
//             park.geometry.coordinates[0]
//           ]}
//           onClick={() => {
//             setActivePark(park);
//           }}
          
//         />
//       ))}

//       {activePark && (
//         <Popup
//           position={[
//             activePark.geometry.coordinates[1],
//             activePark.geometry.coordinates[0]
//           ]}
//           onClose={() => {
//             setActivePark(null);
//           }}
//         >
//           <div>
//             <h2>{activePark.properties.NAME}</h2>
//             <p>{activePark.properties.DESCRIPTION}</p>
//           </div>
//         </Popup>
//       )}
//     </Map>
//   );

