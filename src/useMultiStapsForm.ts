import { ReactElement, useState } from "react";

export function useMultiStapsForm(staps: ReactElement[]) {
  const [currentStepIndex, setCurrentStapIndex] = useState(0);

  function next() {
    setCurrentStapIndex((i) => {
      if (i >= staps.length - 1) return i;

      return i + 1;
    });
  }


  function back() {
    setCurrentStapIndex((i) => {
      if (i <= 0) return i;

      return i - 1;
    });
  }

  function goTo(index:number){
    setCurrentStapIndex(index);
  }

  return {
    currentStepIndex,
    step: staps[currentStepIndex],
    staps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === staps.length - 1,
    next,
    back,
    goTo,
  };

}
