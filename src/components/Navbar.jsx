import React from "react";
import logo from "../assets/Vectorlogo.png";
import profile from "../assets/Profile.png";

const Navbar = () => {
  return (
    <div className="lg:w-[10%] w-full lg:h-screen h-20 flex lg:flex-col flex-row items-center justify-between lg:py-8 lg:px-6 py-4 px-4">
      <div>
        <img src={logo} alt="logo" className="bg-black" />
      </div>
      <div>
        <img src={profile} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
