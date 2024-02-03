import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import settingsReducer from "./Settings/slice";
import PersistConfigs from "./persist.config";
import reportsReducer from "./Reports/slice";

const rootReducer = {
    settings: persistReducer(PersistConfigs.settings, settingsReducer),
    reports: persistReducer(PersistConfigs.reports, reportsReducer),
};

// Configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;