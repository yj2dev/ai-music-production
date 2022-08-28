import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100vh;
  transition: 0.2s;
  background: linear-gradient(90deg, #ffffff, #fbf8f6);
`;

export const Section = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
  padding-top: 64px;
  border: 1px solid red;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
export const ContentWrapper = styled.div`
  border: 1px solid green;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.div`
  border: 1px solid darkviolet;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #696969;
  font-weight: 800;
  font-size: 4vw;
  padding: 12px 16px 48px 32px;
`;
export const LogoImage = styled.img`
  border: 1px solid blue;
  //width: 40%;
  width: 100px;
  //padding: 32px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NextPageButton = styled.button`
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  background-color: #fcfaf5;
  color: #767676;
  width: 300px;
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
  width: 16px;
  height: 16px;
  bottom: 0px;
  left: 0;
`;
