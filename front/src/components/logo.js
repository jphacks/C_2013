import React from "react";
import styled from "styled-components";

const Rhombus = styled.div({
    width: "200px",
    height: "200px",
    transform: "RotateZ(45deg)",
    border: "solid white 5px",
    margin: "0 auto",
})
const Circle = styled.div({
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "solid 5px white",
    margin: "0 auto",
    transform: "translateY(-170px)"
})

const Logo = () => {
    return (
        <>
            <Rhombus />
            <Circle />
        </>
    );
}

export default Logo;