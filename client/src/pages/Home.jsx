import React from "react";
import Mapbox from "../components/Mapbox";
import BackgroundImage from "../assets/greenbg.jpg";

const Home = () => {
  return (
    <div>
      <h1 className="mt-16 ml-20 w-full p-3 flex flex-col items-left text-green-700 font-bold">City: Irvine, California</h1>

      <div style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div>

        </div>
        <div className="leaflet-container">
          <Mapbox />
        </div>
      </div>
    </div>
  );
};

export default Home;
