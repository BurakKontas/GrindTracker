// import localstorage from '../classes/SecureAsyncStorage';
// import sessionstorage from '../classes/SecureAsyncSessionStorage';
import storage from "redux-persist/lib/storage";
import { PersistConfig } from 'redux-persist';
import { SettingsState } from './Settings/types';
import { ReportsState } from "./Reports/types";

type PersistConfigsType = {
    settings: PersistConfig<SettingsState>,
    reports: PersistConfig<ReportsState>
}

const PersistConfigs: PersistConfigsType = {
    settings: {
        key: "settings",
        storage: storage,
        whitelist: ["characters", "defaultCharacter", "region", "language"],
    },
    reports: {
        key: "reports",
        storage: storage,
        whitelist: ["reports"],
    }

}

export default PersistConfigs;