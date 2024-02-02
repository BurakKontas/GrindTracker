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
                <Route path="/" element={<CustomRoute><Homepage /></CustomRoute>} />
                <Route path="/startup/:grindspotid/:id" element={<CustomRoute><Startup /></CustomRoute>} />
                <Route path="/tracker/:grindspotid/:id" element={<CustomRoute><Trakcer /></CustomRoute>} />
                <Route path="/result/:grindspotid/:id/:timer" element={<CustomRoute><Result /></CustomRoute>} />
            </Routes>
        </HashRouter>
    );
};

//@ts-ignore
function CustomRoute({children}) {
    return (
        <>
            <div className="ow-drag" style={{ height: 20, width: 400, backgroundColor: "#333", position:"absolute", top:0 }}></div>
            {children}
        </>
    )
}



function Router() {
    try {
        return (
            <div style={{ display: "flex", justifyContent:"center", alignItems:"center", width:"100%", height:800, flexDirection: "column"}} >
            <MyRoutes />
            </div>
        );
    } catch (error) {
        console.error(error);
    }
}

export default Router;
