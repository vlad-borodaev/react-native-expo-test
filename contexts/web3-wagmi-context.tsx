import { createContext } from "react";
import { chain, configureChains, createClient } from "wagmi";
import {
    connectorsForWallets,
    getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import Constants from "expo-constants";

const ALCHEMY_API_KEY = Constants.manifest?.extra?.ALCHEMY_API_KEY || "";

const { chains, provider, webSocketProvider } = configureChains(
    [chain.goerli, chain.mainnet],
    [alchemyProvider({ apiKey: ALCHEMY_API_KEY })]
);

export const wagmiChains = chains;

const { wallets } = getDefaultWallets({
    appName: "RainbowKit demo",
    chains,
});

const appInfo = { appName: "Test App" };

const connectors = connectorsForWallets(wallets);

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});
