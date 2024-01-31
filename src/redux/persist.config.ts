import storage from '../classes/SecureAsyncStorage';
// import storage from "redux-persist/lib/storage";
import { PersistConfig } from 'redux-persist';
import { SettingsState } from './Settings/types';

type PersistConfigsType = {
    settings: PersistConfig<SettingsState>,
}

const PersistConfigs: PersistConfigsType = {
    settings: {
        key: "settings",
        storage: storage,
        whitelist: ["characters", "defaultCharacter", "region", "language"],
    },

}

export default PersistConfigs;