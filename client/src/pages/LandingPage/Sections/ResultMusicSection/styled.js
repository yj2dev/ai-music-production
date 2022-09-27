import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100vh;
  transition: 0.2s;
  //background: linear-gradient(90deg, #ffffff, #fbf8f6);
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ResultGenre = styled.div`
  user-select: none;
  text-align: center;
  font-size: 24px;
  color: #000;
  padding: 0 0 12px 0;
  & span {
    color: #ec4820;
    font-weight: bold;
    background-color: #ffffff;
  }
`;
export const ResultLyric = styled.div`
  //border: 4px solid #ec4820;
  //box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  //background: #ffffff;

  overflow-y: hidden;
  border-radius: 20px;
  background: linear-gradient(165deg, #ebeae6, #ffffff);
  width: calc(100% - 128px);
  white-space: pre-wrap;
  height: 500px;
  overflow: scroll;
  color: #000;
  text-align: center;
  padding: 32px;
  margin: 30px;
  user-select: text;
  font-size: 22px;
  line-height: 44px;
`;

export const ShowButton = styled.div`
  color: #666666;
  font-weight: 800;
  user-select: none;
  cursor: pointer;
  padding-bottom: 16px;
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
