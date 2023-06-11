import React from "react";
import Mapbox from "../components/Mapbox";
import BackgroundImage from "../assets/greenbg.jpg";

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${BackgroundImage})`,
      backgroundPosition: 'center', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat'
    }}>
      <h1 className="text-4xl font-bold text-center text-white m-5">Irvine, California</h1>
      <Mapbox />
    </div>
  );
};

export default Home;

