import styled from "styled-components";

export const InputWrapper = styled.div`
  & input[type="text"] {
    margin-top: 48px;
    margin-bottom: 24px;
    padding: 0 25px;
    width: 350px;
    height: 54px;
    box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
    color: #696969;
    border: none;
    outline: none;
    border-radius: 50px;
    transition-duration: 0.2s;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
  }
`;
export const GenreButtonWrapper = styled.div`
  margin-top: 24px;
`;
export const GenreButton = styled.button`
  margin: 0 10px;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  color: #696969;
  background-color: rgba(0, 0, 0, 20%);
  width: 190px;
  height: 54px;
  border: none;
  outline: none;
  border-radius: 50px;
  transition-duration: 0.2s;
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    color: #ffffff;
  }
  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    background-color: #ff0033;
    position: relative;
    top: 2px;
  }
  &.active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    background-color: #ff0033;
    position: relative;
    color: #fff;
    top: 2px;
  }
`;
