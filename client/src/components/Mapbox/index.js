import React from "react";

import { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { useQuery } from "@apollo/client";

import SearchBox from "../SearchBox.jsx";

import { FINDALLPARKS } from "../../graphql/queries.js";
import treeIconFile from "./tree.png";

// Define your custom icon
const treeIcon = new Icon({
  iconUrl: treeIconFile, //  tree icon file
  iconSize: [25, 25], // size of the icon
});

export default function Mapbox() {
  const position = [33.6725744, -117.7432627]; // lat/lng for Irvine, CA
  const { loading, error, data } = useQuery(FINDALLPARKS);

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

        <SearchBox />

        {data?.findAllParks.map((place, index) => (
          <Marker
            key={index}
            position={[
              place.geometry.location.lat,
              place.geometry.location.lng,
            ]}
            icon={treeIcon}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
