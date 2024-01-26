import React, { useContext, useEffect } from "react";
import About from "./LandingPage/About";
import WhyUs from "./LandingPage/WhyUs";
import { HeroSection } from "./LandingPage/HeroSection";
import Categories from "./LandingPage/Categories";
import NewArrivals from "./LandingPage/NewArrivals";
import BestSellers from "./LandingPage/BestSellers";
import LoomBook from "./LandingPage/LoomBook";
import Queries from "./LandingPage/Queries";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {

  const { fetchData, fetchDataFav } = useContext(AuthContext);
  useEffect(() => {
    fetchDataFav();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <HeroSection />
      <Categories />
      <NewArrivals />
      <BestSellers />
      <About />
      <LoomBook />
      <WhyUs />
      <Queries />
    </div>
  );
};

export default Home;
