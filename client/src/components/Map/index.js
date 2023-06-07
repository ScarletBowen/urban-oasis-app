import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as parkData from "./data/parks.json";


const MapBox = () => {
    const [activePark, setActivePark] = React.useState(null);

    <Map center={[45.4, -75.7]} zoom={12}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {parkData.features.map(park => (
            <Marker
            key={park.properties.PARK_ID}
            position={[
                park.geometry.coordinates[1],
                park.geometry.coordinates[0]
            ]}
            onClick={() => {
                setActivePark(park);
            }}
            
            />
        ))}

        {activePark && (
            <Popup
            position={[
                activePark.geometry.coordinates[1],
                activePark.geometry.coordinates[0]
            ]}
            onClose={() => {
                setActivePark(null);
            }}
            >
            <div>
                <h2>{activePark.properties.NAME}</h2>
                <p>{activePark.properties.DESCRIPTION}</p>
            </div>
            </Popup>
        )}
    </Map>
};

export default MapBox;