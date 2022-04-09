import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.2s;
  background-color: #f5a017;
  //background: radial-gradient(circle, #ffd085 0%, #f5a017 100%);

  & audio {
    width: 500px;
  }
  &.active {
    background-color: #ec4820;
    //background: radial-gradient(circle, #ff9a81 0%, #f76642 100%);
  }
  & .content {
    font-size: 24px;
    color: #ffffff;
  }
`;
export const RecordingButtonWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 50%);
  transition: 0.2s;
  position: relative;
  margin: 24px 0;
  cursor: pointer;

  &.active {
    border-radius: 50px;
    width: 164px;
  }
  & .timer {
    //color: #ffffff;
    color: #ff0033;
    position: absolute;
    font-size: 28px;
    font-weight: 800;
    top: 15px;
    left: 74px;
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
  background-color: rgba(0, 0, 0, 50%);
`;
