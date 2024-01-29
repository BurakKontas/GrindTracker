import React from "react";
import "./layout.css";
import SlideMenu from "../slidemenu/slidemenu";
import { Logo } from "./logo";


export type LayoutPropsType = {
    children: React.ReactNode;
}

export const AppHeaderLogo = () => {
    return (
        <div className="header-logo">
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <Logo className="header-logo" />
                <div className="header-title">
                    <h1>GrindTracker</h1>
                </div>
            </div>
        </div>
    )
}

export const AppHeaderButtons = () => {
    return (
        <div>
            <button style={{ paddingTop: 6 }} id="hotkeyButton" className="window-control window-control-hotkey" />
            <button style={{ paddingTop: 6 }} id="minimizeButton" className="window-control window-control-minimize" />
            <button style={{ paddingTop: 6 }} id="closeButton" className="window-control window-control-close" />
        </div>
    )
}

export const AppHeader = () => {
    return (
        <header className="header" id="header">
            <AppHeaderLogo />
            <AppHeaderButtons />
        </header>
    )
}

const Layout: React.FC<LayoutPropsType> = (props) => {
    return (
        <div>
            <AppHeader />
            <div className="layout-container">
                <div className="drawer-menu-container">
                    <SlideMenu />
                </div>
                <div className="content-container">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;