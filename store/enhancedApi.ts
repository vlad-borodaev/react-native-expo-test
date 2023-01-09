import { api } from "./api";

export const enhancedApiWithTags = api.enhanceEndpoints({
    addTagTypes: [""],
    endpoints: {},
});

export const { } = enhancedApiWithTags;
