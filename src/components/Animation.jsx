import { useState } from "react";
import Lottie from "react-lottie";

const Animation = ({ animationData, title }) => {
  const [animationState, setAnimationState] = useState({
    isStopped: true,
    isPaused: false,
  });
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleMouseEnter = () => {
    setAnimationState({ ...animationState, isStopped: false });
  };

  const handleMouseLeave = () => {
    setAnimationState({ ...animationState, isStopped: true });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <Lottie
        options={defaultOptions}
        height={165}
        width={165}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
      />
      <h4 style={{ height: "30px" }}>{title}</h4>
    </div>
  );
};

export default Animation;
