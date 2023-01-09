import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, wagmiChains } from "./contexts/web3-wagmi-context";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <NativeBaseProvider>
                    <WagmiConfig client={wagmiClient}>
                        <RainbowKitProvider chains={wagmiChains}>
                            <Provider store={store}>
                                <Navigation colorScheme={colorScheme} />
                                <StatusBar />
                            </Provider>
                        </RainbowKitProvider>
                    </WagmiConfig>
                </NativeBaseProvider>
            </SafeAreaProvider>
        );
    }
}
