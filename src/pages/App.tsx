import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PrimeReactProvider } from 'primereact/api';

import store from "../redux/store";
import AuthProvider from "../hooks/useAuth";
import Layout from "../components/layout/layout";

import Homepage from "./Homepage/Homepage";
import Summary from "./Summary/Summary";
import TimerSettings from "./TimerSettings/TimerSettings";
import Settings from "./Settings/Settings";
import GrindSpots from "./Grindspots/Grindspots";

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primeicons/primeicons.css';

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
              <PrimeReactProvider>
                <MyRoutes />
              </PrimeReactProvider>
            </HashRouter>
          </AuthProvider>
      </Provider>
    );
  } catch (error) {
    console.error(error);
  }
}

export default App;
