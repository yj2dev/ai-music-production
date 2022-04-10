import React from "react";
import { Container, Logo } from "./styled";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="img/logo.png" />
        <div className="title">Music Production Bot</div>
      </Logo>
    </Container>
  );
};

export default Header;
