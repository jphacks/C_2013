import React from "react";
import styled from "styled-components";
import Logo from "../components/logo";
import StartButton from "../components/startbutton";

const StyledDiv = styled.div({
    background: "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246))",
    textAlign: "center",
})
const StyledP = styled.p({
    fontFamily: "book",
    fontSize: "100px",
    color: "white",
    letterSpacing: "20px",
    paddingTop: "10%"
})

const TopPage = () => {
    return (
        <>
            <StyledDiv>
                <StyledP>MAKEU</StyledP>
                <Logo />
                <StartButton />
            </StyledDiv>
        </>
    );
}

export default TopPage;