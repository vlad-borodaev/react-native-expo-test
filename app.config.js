export default ({ config }) => {
    return {
        name: "Test App",
        platforms: ['ios', 'android'],
        extra: {
            API_URL: "",
            ALCHEMY_API_KEY: "",
            environment: process.env.MY_ENVIRONMENT === 'production' ? "production" : "development",
        },
    };
};
