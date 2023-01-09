import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, StateFromReducersMapObject } from "redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AUTH_SLICE_KEY, authSlice, AuthState } from "./auth.store";
import { emptySplitApi, MY_API } from "./emptyApi";

const reducer = {
    [MY_API]: emptySplitApi.reducer,
    [AUTH_SLICE_KEY]: authSlice.reducer,
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
    key: "root",
    storage,
    //only for .reducerPath
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(emptySplitApi.middleware);
        },
        devTools: process.env.NODE_ENV === "development",
        preloadedState,
    });
};

let preloadedAuthState: AuthState | undefined;

export const store = makeStore({ auth: preloadedAuthState });

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = StateFromReducersMapObject<typeof reducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
