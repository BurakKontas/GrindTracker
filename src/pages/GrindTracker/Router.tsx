import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Startup from "./Startup/Startup";
import Trakcer from "./Tracker/Tracker";

const MyRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<CustomRoute name="homepage"><Homepage /></CustomRoute>} />
                <Route path="/startup/:grindspotid/:id" element={<CustomRoute name="startup"><Startup /></CustomRoute>} />
                <Route path="/tracker/:grindspotid/:id" element={<CustomRoute name="tracker"><Trakcer /></CustomRoute>} />
            </Routes>
        </HashRouter>
    );
};

//@ts-ignore
function CustomRoute({children, ...props}) {
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
