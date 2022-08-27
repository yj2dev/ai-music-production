import React from "react";

import {
  Container,
  InfoContainer,
  InfoContainer_Text,
  InfoContainer_Image,
} from "./styled";

function IntroductionSection() {
  return (
    <Container>
      <img
        className="Background_Img"
        alt="Background_Img"
        src={require("../../../../assets/img/Background/Background.png")}
      />
      <InfoContainer>
        <InfoContainer_Text>
          <h2 className="InfoContainer_Text_Header">
            목소리로 나에게 어울리는 노래 장르와 하나의 곡을 완성시켜보자
          </h2>
          <span className="InfoContainer_Text_Span">맞춤형 작사작곡</span>
          <button className="InfoContainer_Text_Btn">시작하기</button>
        </InfoContainer_Text>
        <InfoContainer_Image>
          <img
            className="Background_Icon"
            alt="Background_Icon"
            src={require("../../../../assets/img/Background/BacgroundIcon.png")}
          />
        </InfoContainer_Image>
      </InfoContainer>
    </Container>
  );
}

export default IntroductionSection;
