import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Polyline,
} from "react-leaflet";
import { useQuery } from "@apollo/client";
import "./index.css";
import { useGeolocation } from "@uidotdev/usehooks";

import SearchBox from "../SearchBox.jsx";
import ParkMarker from "./ParkMarker.jsx";

import { FINDALLPARKS } from "../../graphql/queries.js";

export default function Mapbox() {
  const userLocation = useGeolocation();
  // lat/lng for Irvine, CA
  const [centerPosition, setCenterPosition] = useState([
    33.6725744, -117.7432627,
  ]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const { loading, error, data } = useQuery(FINDALLPARKS);
  var refsPopup = {};

  if (loading || userLocation.loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const userPosition = [userLocation.latitude, userLocation.longitude];

  return (
    <div>
      <MapContainer
        center={centerPosition}
        zoom={12}
        className="h-screen"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        <Marker position={userPosition}></Marker>

        {selectedPosition ? (
          <Polyline
            pathOptions={{ color: "blue" }}
            positions={[userPosition, selectedPosition]}
          />
        ) : null}

        {data?.findAllParks.map((place) => (
          <ParkMarker
            key={"ParkMarker" + place._id}
            place={place}
            applyRef={(ref) => {
              refsPopup[place._id] = ref;
            }}
          />
        ))}

        <SearchBox
          setPosition={setCenterPosition}
          userLocation={userLocation}
          refsPopup={refsPopup}
          setSelectedPosition={setSelectedPosition}
        />
      </MapContainer>
    </div>
  );
}
