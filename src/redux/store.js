import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import interviewReducer from "./interviewSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, interviewReducer);

export const store = configureStore({
    reducer: {
        interview: persistedReducer,
    },
});

export const persistor = persistStore(store);
