import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import BdolyticsService from "../service/bdolytics";
import { BdolyticsRegion } from "../types/Settings/RegionEnum";
import { BdolyticsGrindspotsPagesEnum, BdolyticsGrindspotsResponse } from "../types/Bdolytics/Grindspots";
import { BdolyticsItemResponse } from "../types/Bdolytics/Item";
import { BdolyticsGrindspotResponse } from "../types/Bdolytics/Grindspot";
import { useAppSelector } from "../redux/hooks";
import { getLanguage, getRegion } from "../redux/Settings/slice";
import { MarketDataItem } from "../types/Bdolytics/MarketData";
import { useCookies } from 'react-cookie';

export const BdolyticsAPIContext = createContext<BdolyticsAPIProviderValueType>({
    //default values
    getGrindspots: (page: BdolyticsGrindspotsPagesEnum = BdolyticsGrindspotsPagesEnum.PAGE1) => undefined!,
    getGrindspot: (id: number | string) => undefined!,
    getItem: (id: number | string) => undefined!,
    getItems: (ids: number[] | string[]) => undefined!,
    getImage: (image: string) => undefined!,
    getMarketPricesData: (id: number | string) => undefined!
})

export const useBdolyticsAPI = () => {
    const context = useContext(BdolyticsAPIContext);
    if (!context) {
        throw new Error("useBdolyticsAPI must be used within a BdolyticsAPIProvider");
    }

    if (!context.getGrindspots) console.warn("useBdolyticsAPI.getGrindspots not implemented");
    if (!context.getGrindspot) console.warn("useBdolyticsAPI.getGrindspot not implemented");
    if (!context.getImage) console.warn("useBdolyticsAPI.getImage not implemented");
    if (!context.getItem) console.warn("useBdolyticsAPI.getItem not implemented");
    if (!context.getItems) console.warn("useBdolyticsAPI.getItems not implemented");
    if (!context.getMarketPricesData) console.warn("useBdolyticsAPI.getMarketPricesData not implemented");

    return context;
};
export type BdolyticsAPIProviderPropsType = {
    children: React.ReactElement
}

export type BdolyticsAPIProviderValueType = {
    getGrindspots: (page?: BdolyticsGrindspotsPagesEnum) => Promise<BdolyticsGrindspotsResponse | undefined>
    getGrindspot: (id: number | string) => Promise<BdolyticsGrindspotResponse | undefined>
    getItem: (id: number | string) => Promise<BdolyticsItemResponse | undefined>
    getItems: (ids: number[] | string[]) => Promise<BdolyticsItemResponse[] | undefined>
    getImage: (image: string) => Promise<string | undefined>
    getMarketPricesData: (id: number | string) => Promise<number | undefined>
}

const BdolyticsAPIProvider: React.FC<BdolyticsAPIProviderPropsType> = (props) => {
    const language = useAppSelector(getLanguage)
    const region = useAppSelector(getRegion)
    const [bdolyticsService, setBdolyticsService] = useState<BdolyticsService>(new BdolyticsService(language, region));

    useEffect(() => {
        setBdolyticsService(new BdolyticsService(language, region))
    }, [language, region])

    const getGrindspots = async (page: BdolyticsGrindspotsPagesEnum = BdolyticsGrindspotsPagesEnum.PAGE1): Promise<BdolyticsGrindspotsResponse> => {
        return await bdolyticsService.getGrindspots(page);
    };

    const getGrindspot = async (id: number | string): Promise<BdolyticsGrindspotResponse> => {
        if(typeof id === "string") id = parseInt(id);
        return await bdolyticsService.getGrindspot(id);
    }

    const getItem = async (id: number | string): Promise<BdolyticsItemResponse> => {
        if (typeof id === "string") id = parseInt(id);
        return await bdolyticsService.getItem(id);
    }

    const getItems = async (ids: number[] | string[]): Promise<BdolyticsItemResponse[]> => {
        let items: BdolyticsItemResponse[] = []
        for (let id of ids) {
            items.push(await getItem(id))
        }
        return items
    }

    const getImage = async (image: string): Promise<string> => {
        return await bdolyticsService.getImage(image);
    }

    const getMarketPricesData = async (id: number | string): Promise<number | undefined> => {
        if (typeof id === "string") id = parseInt(id);
        let response = await bdolyticsService.getMarketPriceOfItems();
        let data = response.data;
        let item = data.find((item) => item.id === id);
        if (item) return item.price;
        let itemData = await getItem(id);
        return itemData.data.sell_price;
    }

    return (
        <BdolyticsAPIContext.Provider value={{ getGrindspots, getGrindspot, getItem, getItems, getImage, getMarketPricesData }}>
            {props.children}
        </BdolyticsAPIContext.Provider>
    )
}

export default BdolyticsAPIProvider;