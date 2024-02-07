import React from "react";
import "./slidemenu.css";

import { MenuItemsPropsType, MenuItems, UtilityMenuItems } from "./menuitems";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { isReporting } from "../../redux/Reports/slice";
import { ReportImage } from "../../constants/base64images";

type MenuItemPropsType = {
    Item: MenuItemsPropsType;
    isSelected: boolean;
    handleClick: () => void;
}

const MenuItem: React.FC<MenuItemPropsType> = (props) => {
    const containerClass = `menu-item-container ${props.isSelected ? 'selected' : ''}`;

    return (
        <div className={containerClass} onClick={props.handleClick}>
            <div className="menu-item-icon">
                {props.Item.Icon}
            </div>
            <p className="menu-item-text">{props.Item.name}</p>
        </div>
    );
};


const SlideMenu: React.FC = () => {
    const isReport = useAppSelector(isReporting)
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (path: string) => {
        navigate(path);
    }

    return (
        <div className="slide-menu-container">
            <div>
                {MenuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        Item={item}
                        isSelected={location.pathname == item.path}
                        handleClick={() => handleClick(item.path)}
                    />
                ))}
                {isReport && <MenuItem
                    key={"report"}
                    Item={{
                        Icon: <ReportImage />,
                        name: "Report",
                        path: "/report",
                    }}
                    isSelected={location.pathname == "/report"}
                    handleClick={() => handleClick("/report")}
                />}
            </div>
            <div className="slide-menu-utilities">
                {UtilityMenuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        Item={item}
                        isSelected={location.pathname == item.path}
                        handleClick={() => handleClick(item.path)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SlideMenu;