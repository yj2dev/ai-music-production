import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100vh;
  transition: 0.2s;
  background: linear-gradient(90deg, #ffffff, #fbf8f6);

  & .content {
    text-align: center;
    font-size: 24px;
    color: #000;
    margin-top: 36px;
  }

  & .content-lyric {
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
  }

  & .content span {
    color: #ec4820;
    font-weight: bold;
    background-color: #ffffff;
  }
`;

export const SectionLine = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 28px 0 0 0;
  padding: 10px 0;
  box-shadow: 0px 5px 2px 1px #eeeeee;
`;
export const MidiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
