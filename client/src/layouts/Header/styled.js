import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  display: flex;
  position: fixed;
  color: #000;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  align-items: center;
  height: 64px;
  transition: 0.2s;
  &.active {
    background-color: #000;
    color: #fff;
  }
`;

export const Logo = styled.div`
  & .deactive {
    -webkit-filter: opacity(0.5) drop-shadow(0 0 0 #000);
    filter: invert(98%) sepia(1%) saturate(0%) hue-rotate(112deg)
      brightness(85%) contrast(90%);
  }
  cursor: pointer;
  & img {
    float: left;
    margin-top: 7px;
    width: 25px;
    height: 22px;
    margin-left: 32px;
  }
  & .title {
    float: left;
    font-weight: 800;
    font-size: 22px;
    margin-left: 8px;
  }
`;
