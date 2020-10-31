import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div({
    borderRadius: "100px",
    backgroundColor: "rgba(255, 0, 128, 0.3)",
    fontFamily: "book",
    fontSize: "50px",
    width: "300px",
    color: "white",
    margin: "0 auto",
    letterSpacing: "10px",
    textAlign: "center",
})

const StartButton = () => {
    return (
        <Link to="/video" style={{ textDecoration: "none" }}>
            <StyledDiv>START</StyledDiv>
        </Link>
    );
}

export default StartButton;