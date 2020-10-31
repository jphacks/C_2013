import React from "react";
import Navbar from "./navbar";
import HomeButton from "./homebutton";

function Header() {
  return (
    <div style={{ height: "200px" }}>
      <HomeButton />
      <Navbar />
    </div>
  );
}

export default Header;
