import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Router from "./../../pages/GrindTracker/Router";
import "../../assets/css/title-bar.css";
import { AppWindow } from "../../classes/AppWindow";
import { kWindowNames } from "../../constants/consts";
import { Providers } from '../../pages/App'

const Root = () => {
  useEffect(() => {
    new AppWindow(kWindowNames.grindTracker);
  }, []);

  return (
    <Providers>
      <Router />
    </Providers>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<Root />);
