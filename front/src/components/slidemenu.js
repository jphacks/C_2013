import React from "react";
import SlideMenuButton from "./slidemenubutton";

const menus = ["EYEBROW", "LIP", "NOSE"];

const SlideMenu = ({ toggle }) => {
    return (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", width: "100%", height: "100%", position: "absolute", top: "0", paddingTop: "200px" }}>

            {menus.map((menu) => {
                return (
                    <p onClick={toggle} style={{ textAlign: "center", margin: "50px" }}>
                        <SlideMenuButton value={menu} />
                    </p>
                );
            })}

        </div>
    );
}

export default SlideMenu;