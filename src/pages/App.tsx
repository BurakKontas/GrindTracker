import { Route, Routes, HashRouter } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage/Homepage";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import About from "./About";
import AuthProvider from "../hooks/useAuth";
import Layout from "../components/layout/layout";

const MyRoutes = () => {
  return (
    <div className="container">
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
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
