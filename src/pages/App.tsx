import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../redux/store";
import AuthProvider from "../hooks/useAuth";
import Layout from "../components/layout/layout";

import Homepage from "./Homepage/Homepage";
import Summary from "./Summary/Summary";
import TimerSettings from "./TimerSettings/TimerSettings";
import Settings from "./Settings/Settings";
import GrindSpots from "./Grindspots/Grindspots";

import "./App.css";

const MyRoutes = () => {
  return (
    <div className="container">
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<Settings />} />
          <Route path="/grindspots" element={<GrindSpots />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/timersettings" element={<TimerSettings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </div>
  );
};

function App() {
  try {
    return (
      <Provider store={store}>
        <AuthProvider>
          <HashRouter>
            <MyRoutes />
          </HashRouter>
        </AuthProvider>
      </Provider>
    );
  } catch (error) {
    console.error(error);
  }
}

export default App;
