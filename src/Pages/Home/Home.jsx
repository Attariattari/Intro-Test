import React from "react";
import Navbar from "../../Components/Navbar";
import "../Styles/Home.css";
import HomeContent from "../../Components/HomeContent";

function Home() {
  return (
    <div className="Home">
      <div className="Navbar">
        <Navbar />
      </div>
      <HomeContent />
    </div>
  );
}

export default Home;
