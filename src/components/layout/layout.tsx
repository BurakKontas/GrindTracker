import React from "react";
import "./layout.css";
import SlideMenu from "../slidemenu/slidemenu";

export type LayoutPropsType = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutPropsType> = (props) => {
    return (
        <div className="layout-container">
            <div className="drawer-menu-container">
                <SlideMenu />
            </div>
            <div className="content-container">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;