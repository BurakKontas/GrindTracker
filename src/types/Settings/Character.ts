import { Classes } from "./Classes";

export type SettingsCharacter = {
    name: string;
    class: Classes;
    level: number;
    ap: number;
    dp: number;
};

export const SettingsCharacterDefault = {
    name: "",
    class: Classes.WARRIOR,
    level: 0,
    ap: 0,
    dp: 0,
};