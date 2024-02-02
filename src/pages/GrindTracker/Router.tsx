import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Startup from "./Startup/Startup";
import Trakcer from "./Tracker/Tracker";
import Result from "./Result/Result";

const MyRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/startup/:grindspotid/:id" element={<Startup />} />
                <Route path="/tracker/:grindspotid/:id" element={<Trakcer />} />
                <Route path="/result/:grindspotid/:id/:timer" element={<Result />} />
            </Routes>
        </HashRouter>
    );
};



function Router() {
    try {
        return (
            <div style={{ display: "flex", justifyContent:"center", alignItems:"center", width:"100%", height:800}}>
            <MyRoutes />
            </div>
        );
    } catch (error) {
        console.error(error);
    }
}

export default Router;
