import React from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

import treeIconFile from "./tree.png";
import RatingStar from "../RatingStar";

// Define your custom icon
const treeIcon = new Icon({
  iconUrl: treeIconFile, //  tree icon file
  iconSize: [25, 25], // size of the icon
});

export default function ParkMarker({ place, applyRef }) {
  const rating = Math.round(place.rating);

  return (
    <Marker
      position={[place.geometry.location.lat, place.geometry.location.lng]}
      icon={treeIcon}
      ref={applyRef}
    >
      <Popup>
        <div className="max-w-sm rounded overflow-hidden">
          <img
            className="w-full"
            src="https://goparkplay.com/wp-content/uploads/2021/05/batch_IMG_6959-800x600.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 pt-4">
            <Link
              to={`/placedetails?placeId=${place._id}`}
              className="font-bold text-xl mb-2"
            >
              {place.name}
            </Link>
            <div className="flex items-center">
              <RatingStar rating={rating} />
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                {place.user_ratings_total} ratings
              </span>
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
              <svg
                version="1.1"
                className="w-5 h-5 text-gray-400 inline-block"
                fill="currentColor"
                viewBox="0 0 395.71 395.71"
              >
                <g>
                  <path
                    d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                  />
                </g>
              </svg>
              {place.formatted_address}
            </div>
          </div>
          <div className="px-6 pt-1 pb-2">
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #park
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
