import "leaflet/dist/leaflet.css";
import React from "react";
import "./index.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';

export default function Mapbox() {
    const position = [47.573457, -122.417387] // Adjusted to a valid lat/lng
    const markers = [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-122.417387, 47.573457]
            },
            "properties": {
                "name": "Charles Richey Sr Viewpoint"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-122.349245, 47.627746]
            },
            "properties": {
                "name": "Ward Springs Park"
            }
        },
    ]

    return (
        <div style={{height: '100vh'}}>
            <MapContainer center={position} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.geometry.coordinates.reverse()}>
                        <Popup>{marker.properties.name}</Popup>
                    </Marker>
            
                ))}
                
            </MapContainer>
        </div>
    )
}





