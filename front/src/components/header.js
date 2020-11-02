import React from "react";
import MediaQuery from "react-responsive";
import Navbar from "./navbar";
import HomeButton from "./homebutton";
import MenuButton from "./menubutton";

function Header({ toggle }) {
  return (
    <div style={{ height: "200px" }}>
      <HomeButton />

      <MediaQuery query="(max-width: 900px)">
        <MenuButton toggle={toggle} />
      </MediaQuery>

      <MediaQuery query="(min-width: 901px)">
        <Navbar />
      </MediaQuery>
    </div>
  );
}

export default Header;
