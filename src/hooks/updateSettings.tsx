import React from "react";
import { createContext, useContext } from "react";
import { BdolyticsRegion } from "../types/Settings/RegionEnum";
import { useAppDispatch } from "../redux/hooks";
import { updateStates } from "../redux/Settings/slice";
import { SettingsState } from "../redux/Settings/types";
import { BdolyticsLanguages } from "../types/Settings/LanguageEnum";

export const UpdateSettingsContext = createContext<UpdateSettingsProviderValueType>(null);

export const useUpdateSettings = () => {
    const context = useContext(UpdateSettingsContext);
    if (!context) {
        throw new Error("useUpdateSettings must be used within a UpdateSettingsProvider");
    }

    return context;
};

export type UpdateSettingsProviderPropsType = {
    children: React.ReactElement
}

export type UpdateSettingsProviderValueType = null;

const UpdateSettingsProvider: React.FC<UpdateSettingsProviderPropsType> = (props) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        console.log("UpdateSettingsProvider Starting to listen to storage...")
        window.addEventListener("storage", (e) => {
            if (e.key !== "persist:settings") return;

            const settingsJson = e.newValue! || "{}";
            const settings = JSON.parse(settingsJson);
            const settingsState: SettingsState = {
                characters: JSON.parse(settings.characters) || [],
                language: JSON.parse(settings.language) || BdolyticsLanguages.English,
                defaultCharacter: JSON.parse(settings.defaultCharacter) || "",
                region: JSON.parse(settings.region) || BdolyticsRegion.NA,
            };
            dispatch(updateStates(settingsState))
        });

        return () => 
            window.removeEventListener("storage", () => {});

    }, [])

    return (
        <UpdateSettingsContext.Provider value={null}>
            {props.children}
        </UpdateSettingsContext.Provider>
    )
}

export default UpdateSettingsProvider;