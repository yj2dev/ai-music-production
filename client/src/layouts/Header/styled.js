import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  background-color: #ec4820;
  color: #ffffff;
  height: 48px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  cursor: pointer;
  & img {
    float: left;
    width: 20px;
    height: 20px;
    margin-left: 32px;
  }
  & .title {
    float: left;
    font-family: "Fredoka One", cursive;
    font-size: 20px;
    margin-left: 8px;
  }
`;
