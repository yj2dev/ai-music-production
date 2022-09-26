import styled from "styled-components";

export const ViewLyricWrapper = styled.div`
  padding: 0 32px;
  margin: 30px;
  background: transparent;
  border-radius: 20px;
  width: calc(100% - 128px);
  white-space: pre-wrap;
  overflow: scroll;
  color: #000;
  text-align: center;
  user-select: text;
  font-size: 32px;
  overflow-y: hidden;
  height: 128px;
  line-height: 64px;
  //border: 2px solid gold;
`;
export const Sentence = styled.div`
  font-size: 36px;
`;
export const Button = styled.button`
  margin-top: 32px;
  user-select: none;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  background-color: #00a0cb;
  color: #fff0d6;
  width: 400px;
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
    position: relative;
    top: 2px;
  }
`;
