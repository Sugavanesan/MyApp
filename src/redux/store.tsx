import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/AuthReducer";
import { UserReducer } from "./reducers/UserReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    authreducer: AuthReducer,
    userreducer: UserReducer
})

type RootState = ReturnType<typeof rootReducer>;

const persistConfig:PersistConfig<RootState> = {
    key: "root",
    'storage': AsyncStorage,    
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    'devTools':true,
    reducer: persistedReducer,
});
export const persistedStore=persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;