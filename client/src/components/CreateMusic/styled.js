import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.2s;
  margin-top: 64px;
  height: 100vh;
  position: relative;
  & .content {
    font-weight: 800;
    color: #696969;
    padding: 0 0 32px 0;
  }
  & .content span {
    color: #00a0cb;
  }
`;

export const Audio = styled.audio`
  width: 400px;
  border-radius: 50px;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
`;
export const Button = styled.button`
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  margin-top: 24px;
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
export const ScrollPosition = styled.div`
  position: absolute;
  background-color: transparent;
  bottom: 0;
  left: 0;
`;
export const AIGenreLabelWrapper = styled.label`
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  .lb_title {
    cursor: pointer;
    font-weight: 800;
    color: #696969;
    font-size: 18px;
  }
`;
export const AIGenreLabel = styled.label`
  width: 72px;
  height: 40px;
  font-size: 18px;
  font-weight: 800;
  color: #696969;
  background-color: transparent;
  position: relative;
  display: inline-block;
  border-radius: 100px;

  & input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #dddddd;
    border-radius: 100px;
  }

  & .slider:before {
    position: absolute;
    content: "";
    height: 32px;
    width: 32px;
    left: 4px;
    top: 4px;
    border-radius: 100px;
    transition: 0.4s;
    background-color: #ffffff;
  }
  & input:checked + .slider {
    background-color: #6edc5f;
  }
  & input:checked + .slider:before {
    transform: translateX(32px);
  }
`;
