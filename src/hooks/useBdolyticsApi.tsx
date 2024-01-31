import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import BdolyticsService from "../service/bdolytics";
import { BdolyticsRegion } from "../types/Settings/RegionEnum";
import { BdolyticsGrindspotsPagesEnum, BdolyticsGrindspotsResponse } from "../types/Bdolytics/Grindspots";
import { BdolyticsItemResponse } from "../types/Bdolytics/Item";
import { BdolyticsGrindspotResponse } from "../types/Bdolytics/Grindspot";
import { useAppSelector } from "../redux/hooks";
import { getLanguage, getRegion } from "../redux/Settings/slice";

export const BdolyticsAPIContext = createContext<BdolyticsAPIProviderValueType>({
    //default values
    getGrindspots: (page: BdolyticsGrindspotsPagesEnum = BdolyticsGrindspotsPagesEnum.PAGE1) => undefined!,
    getGrindspot: (id: number | string) => undefined!,
    getItem: (id: number | string) => undefined!,
    getItems: (ids: number[] | string[]) => undefined!,
    getImage: (image: string) => undefined!
})

export const useBdolyticsAPI = () => {
    const context = useContext(BdolyticsAPIContext);
    if (!context) {
        throw new Error("useBdolyticsAPI must be used within a BdolyticsAPIProvider");
    }

    if (!context.getGrindspots) console.warn("useBdolyticsAPI.getGrindspots not implemented");

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
        return await bdolyticsService.getGrindspot(parseInt(id.toString()));
    }

    const getItem = async (id: number | string): Promise<BdolyticsItemResponse> => {
        return await bdolyticsService.getItem(parseInt(id.toString()));
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


    return (
        <BdolyticsAPIContext.Provider value={{ getGrindspots, getGrindspot, getItem, getItems, getImage }}>
            {props.children}
        </BdolyticsAPIContext.Provider>
    )
}

export default BdolyticsAPIProvider;