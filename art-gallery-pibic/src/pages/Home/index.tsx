import HomeSearch from "src/components/HomeSearch";
import React from "react";
import Header from "src/components/Header";

const Home = () => {
  return (
    <div style={{ padding: "0 5%" }}>
      <Header />
      <HomeSearch />
    </div>
  );
};
export default Home;
