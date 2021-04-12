import React, { useState, useEffect } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelNames, quizLevel }) => {
  const [tab, setTab] = useState([]);
  useEffect(() => {
    const newLevel = levelNames.map((l) => ({ title: l.toUpperCase() }));

    setTab(newLevel);
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={tab}
        activeStep={quizLevel}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"#E0E0E0"}
        defaultTitleColor={"#E0E0E0"}
        completeColor={"#E0E0E0"}
        completeBarColor={"#E0E0E0"}
        barStyle={"dashed"}
        size={45}
        circleFontSize={20}
      />    
    </div>
  );
};

export default React.memo(Levels);
