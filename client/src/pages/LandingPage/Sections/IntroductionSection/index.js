import React, { useRef } from "react";
import {
  Container,
  ContentWrapper,
  LogoImage,
  NextPageButton,
  Content,
  ScrollPosition,
  Section,
  LogoImageWrapper,
} from "./styled";
const logoPath = require("../../../../assets/img/Background/BacgroundIcon.png");
function IntroductionSection() {
  const nextRef = useRef(null);

  const onClickNext = () => {
    console.log("nextRef >> ", nextRef.current);
    nextRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Container>
      <Section>
        <ContentWrapper>
          <Content>내 목소리와 어울리는 장르가 궁금한가요?</Content>
          <NextPageButton onClick={onClickNext}>시작하기</NextPageButton>
        </ContentWrapper>
        <LogoImage src={logoPath} />
      </Section>
      <ScrollPosition ref={nextRef} />
    </Container>
  );
}

export default IntroductionSection;
