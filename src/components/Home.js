import React from "react";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Trusted from "./Trusted";
import FeatureProduct from "./FeatureProduct";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
