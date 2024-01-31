import { BdolyticsRegion } from "../../types/Settings/RegionEnum";
import { BdolyticsLanguages } from "../../types/Settings/LanguageEnum";
import { SettingsCharacter } from "../../types/Settings/Character";

export interface SettingsState {
    region: BdolyticsRegion;
    language: BdolyticsLanguages;
    characters: SettingsCharacter[];
    defaultCharacter: string; // name of character
}