import React from 'react';
import { ChartImage, HomePageImage, FireImage, AlarmImage, SettingsImage, SwordShieldImage } from '../../constants/base64images';


export type MenuItemsPropsType = {
    Icon: React.JSX.Element;
    name: string;
    path: string;
    className?: string;
}


export const MenuItems: MenuItemsPropsType[] = [
    // {
    //     Icon: <HomePageImage />,
    //     name: "Homepage",
    //     path: "/",
    // },
    {
        Icon: <ChartImage />,
        name: "Grind Summary",
        path: "/",
    },
    {
        Icon: <SwordShieldImage />,
        name: "Grindspots",
        path: "/grindspots",
    },
    {
        Icon: <AlarmImage />,
        name: "Boss Timer Settings",
        path: "/timersettings",
    },
]

export const UtilityMenuItems: MenuItemsPropsType[] = [
    {
        Icon: <SettingsImage />,
        name: "Settings",
        path: "/settings",
    },
]
