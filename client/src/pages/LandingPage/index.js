import React from "react";
import CreateMusicSection from "./Sections/CreateMusicSection";
import IntroductionSection from "./Sections/IntroductionSection";
import ResultMusicSection from "./Sections/ResultMusicSection";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const genre = useSelector((state) => state.music.genre);

  return (
    <>
      <IntroductionSection />
      <CreateMusicSection />
      {genre && <ResultMusicSection />}
    </>
  );
};

export default LandingPage;
