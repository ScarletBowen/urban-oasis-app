import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useQuery } from "@apollo/client";
import './index.css';

import SearchBox from "../SearchBox.jsx";
import ParkMarker from "./ParkMarker.jsx";

import { FINDALLPARKS } from "../../graphql/queries.js";

export default function Mapbox() {
  // lat/lng for Irvine, CA
  const [position, setPosition] = useState([33.6725744, -117.7432627]);
  const { loading, error, data } = useQuery(FINDALLPARKS);
  var refsPopup = {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <MapContainer
        center={position}
        zoom={12}
        className="h-screen"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {data?.findAllParks.map((place) => (
          <ParkMarker
            key={"ParkMarker" + place._id}
            place={place}
            applyRef={(ref) => {
              refsPopup[place._id] = ref;
            }}
          />
        ))}

        <SearchBox setPosition={setPosition} refsPopup={refsPopup} />
      </MapContainer>
    </div>
  );
}
