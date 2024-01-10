import React from "react";
import "./layout.css";

export type LayoutPropsType = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutPropsType> = (props) => {
    return (
        <div className="layout-container">
            <div className="drawer-menu-container">
                {/* Your icon or menu content goes here */}
            </div>
            <div className="content-container">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;