import React from "react";
import "./slidemenu.css";

import { MenuItemsPropsType, MenuItems, UtilityMenuItems } from "./menuitems";
import { useNavigate } from "react-router-dom";
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
    const [selectedItem, setSelectedItem] = React.useState(MenuItems[0].name);
    const isReport = useAppSelector(isReporting)
    const navigate = useNavigate();

    const handleClick = (name: string, item: MenuItemsPropsType) => {
        setSelectedItem(name);
        navigate(item.path);
    }

    return (
        <div className="slide-menu-container">
            <div>
                {MenuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        Item={item}
                        isSelected={selectedItem == item.name}
                        handleClick={() => handleClick(item.name, item)}
                    />
                ))}
                {isReport && <MenuItem
                    key={"reporting"}
                    Item={{
                        Icon: <ReportImage />,
                        name: "Report",
                        path: "/report",
                    }}
                    isSelected={selectedItem == "Report"}
                    handleClick={() => handleClick("Report", {
                        Icon: <ReportImage />,
                        name: "Report",
                        path: "/report",
                    })}
                />}
            </div>
            <div className="slide-menu-utilities">
                {UtilityMenuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        Item={item}
                        isSelected={selectedItem == item.name}
                        handleClick={() => handleClick(item.name, item)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SlideMenu;