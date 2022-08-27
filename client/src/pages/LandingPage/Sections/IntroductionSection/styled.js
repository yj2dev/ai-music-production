import styled from "styled-components";

export const Container = styled.div`
  /* margin-top: 64px; */
  position: relative;
  width: 100%;
  height: 100vh;

  .Background_Img {
    width: 100%;
    height: 100%;
  }
`;

export const InfoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
  top: 0px;
`;

export const InfoContainer_Text = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 100%;
  top: 45%;

  margin-left: 100px;
  word-break: keep-all;

  .InfoContainer_Text_Header {
    font-size: 35px;
    margin-bottom: 40px;
    color: #747474;
  }

  .InfoContainer_Text_Span {
    display: block;
    font-size: 30px;
    margin-bottom: 40px;
    color: #767676;
  }

  .InfoContainer_Text_Btn {
    border: none;
    width: 240px;
    padding: 20px;
    font-size: 20px;
    border-radius: 20px;
    background-color: #fcfaf5;
    box-shadow: 0px 0px 3px rgba(203, 203, 203, 0.5),
      inset 1px 0px 2px rgba(239, 239, 239, 0.9);
    cursor: pointer;
  }
`;

export const InfoContainer_Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .Background_Icon {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
