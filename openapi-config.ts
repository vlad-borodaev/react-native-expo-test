import type { ConfigFile } from "@rtk-query/codegen-openapi";

const apiUrl = process.env?.NEXT_PUBLIC_API_URL;

const config: ConfigFile = {
    schemaFile: "https://petstore3.swagger.io/api/v3/openapi.json",
    apiFile: "./store/emptyApi.ts",
    apiImport: "emptySplitApi",
    outputFile: "./store/api.ts",
    exportName: "api",
    hooks: true,
};

export default config;
