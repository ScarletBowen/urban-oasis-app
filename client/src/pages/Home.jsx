import React from "react";
import { useState } from "react";
import Mapbox from "../components/Mapbox";
import BackgroundImage from "../assets/greenbg.jpg";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${BackgroundImage})`,
      backgroundPosition: 'center', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat'
    }}>
      <h1>Irvine, California</h1>
      <Mapbox />
      <Footer />
    </div>
  );
};

export default Home;

