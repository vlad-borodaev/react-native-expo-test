import { createApi } from "@reduxjs/toolkit/query/react";
import { buildBaseQueryWithReauthFunc } from "./build-base-query-with-rearfunc";

export const MY_API = "my_api";

export const emptySplitApi = createApi({
    baseQuery: buildBaseQueryWithReauthFunc(),
    reducerPath: MY_API,
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
    endpoints: () => {
        return {};
    },
});
