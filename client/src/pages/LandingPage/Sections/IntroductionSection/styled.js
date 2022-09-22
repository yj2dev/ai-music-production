import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  background: linear-gradient(90deg, #ffffff, #fbf8f6);
  user-select: none;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 64px;
  //border: 1px solid red;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
export const ContentWrapper = styled.div`
  //border: 1px solid green;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.div`
  //border: 1px solid darkviolet;
  user-select: none;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  color: #696969;
  font-weight: 800;
  font-size: 4vw;
  //padding: 12px 16px 84px 128px;
  padding-left: 10%;
  padding-right: 5%;
  padding-bottom: 10%;
  @media screen and (max-width: 767px) {
  }
`;
export const LogoImage = styled.img`
  //border: 1px solid blue;
  height: 28%;
  width: 28%;
  user-select: none;

  //padding: 32px 128px 32px 32px;
  padding-right: 5%;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  @media screen and (max-width: 767px) {
    opacity: 0.5;
    height: 360px;
    width: 360px;
    position: absolute;
    padding: 32px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const NextPageButton = styled.button`
  user-select: none;
  z-index: 100;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  background-color: #fcfaf5;
  color: #767676;
  width: 280px;
  height: 54px;
  border: none;
  outline: none;
  transition-duration: 0.2s;
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: #000000;
  }
  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    bottom: 15%;
  }
`;
export const ScrollPosition = styled.div`
  position: absolute;
  background-color: transparent;
  bottom: 0;
  left: 0;
`;
