import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100vh;
  transition: 0.2s;
  background: linear-gradient(90deg, #ffffff, #fbf8f6);
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ResultGenre = styled.div`
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
  border: 4px solid #ec4820;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  white-space: pre-wrap;
  font-size: 18px;
  height: 500px;
  overflow: scroll;
  color: #000;
  text-align: center;
  padding: 16px;
  margin: 30px;
  border-radius: 20px;
  user-select: text;
  line-height: 32px;
`;
export const MidiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ShowChartButton = styled.div`
  color: #666666;
  font-weight: 800;
  cursor: pointer;
  padding-bottom: 16px;
`;
export const MidiWrapper = styled.div`
  width: 400px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #888888;
  border-radius: 50px;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
`;
export const Button = styled.button`
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
