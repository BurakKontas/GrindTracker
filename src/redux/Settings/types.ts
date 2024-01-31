import { BdolyticsRegion } from "../../types/Bdolytics/BdolyticsRegionEnum";
import { SettingsCharacter } from "../../types/Settings/Character";

export interface SettingsState {
    region: BdolyticsRegion;
    characters: SettingsCharacter[];
    defaultCharacter: string; // name of character
}