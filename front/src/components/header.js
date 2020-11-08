import React from "react";
import MediaQuery from "react-responsive";
import Navbar from "./navbar";
import HomeButton from "./homebutton";
import MenuButton from "./menubutton";

const Header = ({ toggleMenuShown, navs }) => (
  <div
    style={{
      height: "70px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.2)",
      marginBottom: "70px",
    }}
  >
    <HomeButton />
    {navs && (
      <>
        <MediaQuery query="(max-width: 900px)">
          <MenuButton toggleMenuShown={toggleMenuShown} />
        </MediaQuery>

        <MediaQuery query="(min-width: 901px)">
          <Navbar navs={navs} />
        </MediaQuery>
      </>
    )}
  </div>
);

export default Header;
