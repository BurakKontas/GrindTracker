import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../redux/store";

import AuthProvider from "../hooks/useAuth";
import BdolyticsAPIProvider from "../hooks/useBdolyticsApi";
import Layout from "../components/layout/layout";

import Homepage from "./Homepage/Homepage";
import Summary from "./Summary/Summary";
import TimerSettings from "./TimerSettings/TimerSettings";
import Settings from "./Settings/Settings";
import GrindSpots from "./Grindspots/Grindspots";

import { PrimeReactProvider } from 'primereact/api';
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

function Providers({ children }: { children: React.ReactElement}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BdolyticsAPIProvider>
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </BdolyticsAPIProvider>
      </AuthProvider>
    </Provider>
  );
}

function App() {
  try {
    return (
      <Providers>
        <HashRouter>
          <MyRoutes />
        </HashRouter>
      </Providers>
    );
  } catch (error) {
    console.error(error);
  }
}

export default App;
