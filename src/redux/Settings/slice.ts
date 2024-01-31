import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../hooks";
import { SettingsState } from "./types";
import { BdolyticsRegion } from "../../types/Settings/RegionEnum";
import { SettingsCharacter, SettingsCharacterDefault } from "../../types/Settings/Character";
import { BdolyticsLanguages } from "../../types/Settings/LanguageEnum";

const initialState: SettingsState = {
    characters: [],
    language: BdolyticsLanguages.English,
    defaultCharacter: "",
    region: BdolyticsRegion.NA,
};

export const settingsSlice = createAppSlice({
    name: "settings",
    initialState,
    selectors: {
        getDefaultCharacter: (state) => {
            const foundCharacter = state.characters.find((c) => c.name === state.defaultCharacter);
            return foundCharacter || SettingsCharacterDefault;
        },
        getCharacters: (state) => state.characters,
        getRegion: (state) => state.region,
        getLanguage: (state) => state.language,
        getCharacter: (state, name: string) => state.characters.find((c) => c.name === name),
    },
    reducers: (create) => ({
        addCharacter: create.reducer<SettingsCharacter>((state, action) => {
            if(state.characters.find((c) => c.name === action.payload.name)) 
                throw new Error("Character already exists");
            
            state.characters.push(action.payload);
            if (state.characters.length === 1) {
                state.defaultCharacter = action.payload.name;
            }
        }),
        removeCharacter: create.reducer<string>((state, action) => {
            if(!state.characters.find((c) => c.name === action.payload)) 
                throw new Error("Character does not exist");

            state.characters = state.characters.filter((c) => c.name !== action.payload);
        }),
        setDefaultCharacter: create.reducer<string>((state, action) => {
            if(!state.characters.find((c) => c.name === action.payload)) 
                throw new Error("Character does not exist");

            state.defaultCharacter = action.payload;
        }),
        setRegion: create.reducer<BdolyticsRegion>((state, action) => {
            state.region = action.payload;
        }),
        setLanguage: create.reducer<BdolyticsLanguages>((state, action) => {
            state.language = action.payload;
        }),
        // fetchTodo: create.asyncThunk(
        //     async (id: string, thunkApi) => {
        //         // const res = await fetch(`myApi/todos?id=${id}`)
        //         // return (await res.json()) as any
        //     },
        //     {
        //         pending: (state) => {
                    
        //         },
        //         rejected: (state, action) => {

        //         },
        //         fulfilled: (state, action) => {
                    
        //         },
        //     }
        // ),
    }),
});

// Action creators are generated for each case reducer function
export const { addCharacter, removeCharacter, setDefaultCharacter, setRegion, setLanguage } = settingsSlice.actions;
export const { getDefaultCharacter, getCharacters, getRegion, getCharacter, getLanguage } = settingsSlice.selectors;

export default settingsSlice.reducer;