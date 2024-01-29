import React, { useEffect } from "react";
import { createRoot } from "react-dom";
import Timer from "../../pages/Timer/Timer";
import "../../assets/css/title-bar.css";
import { AppWindow } from "../../classes/AppWindow";
import { kWindowNames } from "../../constants/consts";
import { useRunningGame } from "overwolf-hooks";

const Root = () => {
  useEffect(() => {
    new AppWindow(kWindowNames.grindTracker);
  }, []);

  return <Timer />;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<Root />);
