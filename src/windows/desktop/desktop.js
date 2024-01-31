import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "../../pages/App";
import "../../assets/css/title-bar.css";
import { AppWindow } from "../../classes/AppWindow";
import { kWindowNames } from "../../constants/consts";
import { useRunningGame } from "overwolf-hooks";

const Root = () => {
  useEffect(() => {
    new AppWindow(kWindowNames.desktop);
  }, []);

  return <App />;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<Root />);
