import React from "react";
import { Container } from "./styled";
import CreateMusic from "../../../../components/CreateMusic";
import Abcjs from "react-abcjs";

const CreateMusicSection = () => {
  return (
    <Container>
      <CreateMusic />
      <Abcjs
        abcNotation={
          "X:1\nT:Example\nM:4/4\nC:Trad.\nK:G\n|:Gccc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|"
        }
        parserParams={{}}
        engraverParams={{ responsive: "resize" }}
        renderParams={{ viewportHorizontal: true }}
      />
    </Container>
  );
};

export default CreateMusicSection;
