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
import GrindSpot from "./Grindspot/Grindspot";
import UpdateSettingsProvider from "../hooks/updateSettings";
import UpdateReportsProvider from "../hooks/updateReports";
import Report from "./Report/Report";
import Brief from "./Brief/Brief";
import Help from "./Help/Help";

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primeicons/primeicons.css';

import "./App.css";
import OverwolfProvider from "../hooks/useOverwolf";

const MyRoutes = () => {
  return (
    <HashRouter>
      <div className="container">
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/grindspots" element={<GrindSpots />} />
            <Route path="/grindspot/:id" element={<GrindSpot />} />
            {/* <Route path="/timersettings" element={<TimerSettings />} /> */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/report" element={<Report />} />
            <Route path="/brief/:id" element={<Brief />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Layout>
      </div>
    </HashRouter>
  );
};

export function Providers({ children }: { children: React.ReactElement}) {
  return (
    <Provider store={store}>
      <OverwolfProvider>
        <AuthProvider>
          <BdolyticsAPIProvider>
              <PrimeReactProvider>
                <UpdateSettingsProvider>
                  <UpdateReportsProvider>
                    {children}
                  </UpdateReportsProvider>
                </UpdateSettingsProvider>
              </PrimeReactProvider>
          </BdolyticsAPIProvider>
        </AuthProvider>
      </OverwolfProvider>
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
