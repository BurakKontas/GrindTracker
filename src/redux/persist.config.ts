// import localstorage from '../classes/SecureAsyncStorage';
// import sessionstorage from '../classes/SecureAsyncSessionStorage';
import storage from "redux-persist/lib/storage";
import { PersistConfig } from 'redux-persist';
import { SettingsState } from './Settings/types';

type PersistConfigsType = {
    settings: PersistConfig<SettingsState>,
    bdolytics: PersistConfig<{ liste: string[] }>,
}

const PersistConfigs: PersistConfigsType = {
    settings: {
        key: "settings",
        storage: storage,
        whitelist: ["characters", "defaultCharacter", "region", "language"],
    },
    bdolytics: {
        key: "bdolytics",
        storage: storage,
        whitelist: ["liste"],
    }

}

export default PersistConfigs;