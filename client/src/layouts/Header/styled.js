import styled from "styled-components";

export const Container = styled.div`
  background-color: #ec4820;
  color: #ffffff;
  height: 48px;
  display: flex;
  align-items: center;

  & .title {
    font-family: "Fredoka One", cursive;
    font-size: 20px;
    margin-left: 8px;
  }
`;

export const Logo = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 32px;
`;
