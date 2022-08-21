import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  //height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.2s;
  background-color: #f5a017;
  //background: radial-gradient(circle, #ffd085 0%, #f5a017 100%);

  &.active {
    height: 500px;
    background-color: #ec4820;
    //background: radial-gradient(circle, #ff9a81 0%, #f76642 100%);
  }

  & .content {
    font-size: 24px;
    color: #ffffff;
    margin-top: 12px;
  }

  & .content-lyric {
    border: 4px solid #ec4820;
    //box-shadow: inset 0px 0px 4px 2px #ec4820;
    white-space: pre-wrap;
    font-size: 16px;
    height: 500px;
    overflow: scroll;
    color: #fff;
    text-align: center;
    padding: 16px;
    margin: 12px;
    border-radius: 20px;
    user-select: text;
  }

  & .content span {
    color: #ec4820;
    font-weight: bold;
    background-color: #ffffff;
  }
`;
export const RecordingButtonWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 20%);
  transition: 0.2s;
  position: relative;
  margin: 24px 0;
  cursor: pointer;

  &.active {
    border-radius: 50px;
    width: 164px;
  }

  & .timer {
    color: #e56d53;
    position: absolute;
    font-size: 28px;
    font-weight: 800;
    top: 15px;
    left: 74px;
  }

  & .tip-icon {
    font-size: 24px;
    color: #e79b8c;
    position: absolute;
    top: -6px;
    right: 0px;
    transition: 0.1s;
    cursor: default;
  }

  & .tip-icon:hover {
    color: #ffffff;
  }

  & .tip-modal {
    position: absolute;
    top: -54px;
    padding: 8px 16px;
    border-radius: 4px;
    white-space: nowrap;
    background-color: #ffffff;

    &::before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      bottom: -4px;
      left: 146px;
      transform: rotate(45deg);
    }
  }
`;
export const RecordingButton = styled.button`
  position: absolute;
  top: 11px;
  left: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #ff0033;
  transition: 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;
export const OffIcon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 30%);
`;
export const Audio = styled.audio`
  width: 400px;
  border-radius: 50px;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
`;
export const Button = styled.button`
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  //box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);

  margin-top: 24px;
  //background-color: transparent;
  background-color: #ff0033;
  color: #ecd7b6;
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
