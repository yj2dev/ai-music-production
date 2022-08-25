import React, { useEffect, useState } from "react";
import { Container, Logo } from "./styled";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <Container className={scrollPosition > 0 && "active"}>
      <Logo onClick={() => navigate("/")}>
        <img
          src="img/logo_fw.png"
          className={scrollPosition == 0 && "deactive"}
        />
        <div className="title">
          맞춤형 작사작곡&nbsp;
          <span style={{ color: "#00a0cb", fontSize: "18px" }}>데모</span>
        </div>
      </Logo>
    </Container>
  );
};

export default Header;
