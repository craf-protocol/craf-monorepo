import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { NavigationBar } from "../components/NavigationBar";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const prov = jsonRpcProvider({rpc: (chain) => {
    switch (chain.network) {
        case "arbitrum-goerli":
            return {
                http: `https://solemn-billowing-surf.${chain.network}.discover.quiknode.pro/44ba3f466abe41a34fca70430bc8ff88acbd1929/`,
                wss: `wss://solemn-billowing-surf.${chain.network}.discover.quiknode.pro/44ba3f466abe41a34fca70430bc8ff88acbd1929/`,
            }
        case "homestead":
            return {
                http: 'https://eth-mainnet.g.alchemy.com/v2/Yo3FqLiRNG2faWWgn3webF-wi97qURHg',
                webSocket: 'wss://eth-mainnet.g.alchemy.com/v2/Yo3FqLiRNG2faWWgn3webF-wi97qURHg'
            }
        case "arbitrum":
            return {
                http: 'https://arb-mainnet.g.alchemy.com/v2/trhh_mk0ukEsZAy03P464_BvYr4UUln6',
                webSocket: 'wss://arb-mainnet.g.alchemy.com/v2/trhh_mk0ukEsZAy03P464_BvYr4UUln6'
            }
    }
    return {}
}})

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.arbitrumGoerli,
    chain.mainnet,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
      prov,
      publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: "CRAF Webapp",
  chains,
});

const demoAppInfo = {
  appName: "CRAF Webapp",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      // argentWallet({ chains }),
      // trustWallet({ chains }),
      // ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <NavigationBar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
