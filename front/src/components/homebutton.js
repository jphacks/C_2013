import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div({
    width: "80px",
    height: "80px",
    border: "4px solid pink",
    transform: "rotateZ(45deg) translateX(40px)",
    margin: "20px 50px",
    textAlign: "center"
})

const StyledP = styled.p({
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: "book",
    fontSize: "30px",
    transform: "rotateZ(-45deg) translateX(-37px) translateY(8px)",
    letterSpacing: "7px"
})
const HomeButton = () => {
    return (
        <div style={{ position: "absolute", left: "0" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <StyledDiv>
                    <StyledP>MAKEU</StyledP>
                </StyledDiv>
            </Link>
        </div>
    );
}

export default HomeButton;