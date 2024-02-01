import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';

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

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primeicons/primeicons.css';

import "./App.css";
import GrindSpot from "./Grindspot/Grindspot";

const MyRoutes = () => {
  return (
    <HashRouter>
      <div className="container">
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            <Route path="/" element={<Summary />} />
            <Route path="/grindspots" element={<GrindSpots />} />
            <Route path="/grindspot/:id" element={<GrindSpot />} />
            <Route path="/timersettings" element={<TimerSettings />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </div>
    </HashRouter>
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
          <MyRoutes />
      </Providers>
    );
  } catch (error) {
    console.error(error);
  }
}

export default App;
