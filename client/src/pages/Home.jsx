import React from "react";
import { useState } from "react";
import Nav from "../components/Nav";
import Mapbox from "../components/Mapbox";

const Home = () => {
  return (
    <div>
      <h1>Irvine, California</h1>
      <Mapbox />
    </div>
  );
};

export default Home;
