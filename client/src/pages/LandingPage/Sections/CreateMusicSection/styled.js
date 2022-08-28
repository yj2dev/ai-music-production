import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.2s;
  height: 100vh;
  & .content {
    font-size: 24px;
    color: #000;
    margin-top: 36px;
  }
`;
