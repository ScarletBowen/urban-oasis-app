import React from "react";
import { useState } from "react";
import Mapbox from "../components/Mapbox";
import BackgroundImage from "../../assets/greenbg.jpg";

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${BackgroundImage})`,
      backgroundPosition: 'center', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat'
    }}>
      <Nav /> {/* Inserted Nav component */}
      <h1>Irvine, California</h1>
      <Mapbox />
    </div>
  );
};

export default Home;

