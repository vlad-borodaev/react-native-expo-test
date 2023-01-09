import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { useAppSelector } from "./hooks";
import { RootState } from "./store";

export interface AuthState {
    accessToken: string | null;
}

const initialState: AuthState = {
    accessToken: null,
};

export const AUTH_SLICE_KEY = "auth";

export const authSlice = createSlice({
    name: AUTH_SLICE_KEY,
    initialState,
    reducers: {
        login(state, { payload: loginResp }: PayloadAction<any>) {
            const { access_token: accessToken } = loginResp;
            state.accessToken = accessToken;
            return state;
        },
        // @FIXME:
        logout(state) {
            state.accessToken = null;
            return state;
        },
    },
});

export const selectAuth = (state: RootState): AuthState => {
    return state.auth;
};
export const selectAccessToken = (state: RootState): string | null => {
    return selectAuth(state).accessToken;
};

export const useIsTokenBasedAuthorized = (): boolean => {
    const accessToken = useAppSelector(selectAccessToken);
    return Boolean(accessToken);
};

export const addAuthHeader = (
    headers: Headers,
    bearerToken: string | null
): Headers => {
    if (bearerToken) {
        headers.set("Authorization", `Bearer ${bearerToken}`);
    }
    return headers;
};

export const { login, logout } = authSlice.actions;

export const setAuthTokenToRequest: (
    headers: Headers,
    api: Pick<
        BaseQueryApi,
        "getState" | "extra" | "endpoint" | "type" | "forced"
    >
) => MaybePromise<Headers> = (headers, { getState }) => {
    const rootState = getState() as RootState;
    const token = selectAccessToken(rootState);
    addAuthHeader(headers, token);
    return headers;
};
