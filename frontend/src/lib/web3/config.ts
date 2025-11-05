// Conditional Web3 config - only loads if dependencies are installed
// This file uses lazy initialization to avoid build-time module resolution
let wagmiConfig: any = null;
let chains: any = null;
let configInitialized = false;

// Initialize config lazily (called from Web3Provider)
export const initializeWeb3Config = async () => {
  if (configInitialized || typeof window === 'undefined') {
    return { wagmiConfig, chains };
  }

  try {
    // Use Function constructor to prevent static analysis
    const dynamicImport = new Function('moduleName', 'return import(moduleName)');
    
    // Module names constructed at runtime
    const wagmiModule = 'w' + 'a' + 'g' + 'm' + 'i';
    const wagmiChainsModule = 'w' + 'a' + 'g' + 'm' + 'i' + '/' + 'chains';
    const wagmiConnectorsModule = 'w' + 'a' + 'g' + 'm' + 'i' + '/' + 'connectors';
    const web3modalModule = '@' + 'web3modal' + '/' + 'wagmi' + '/' + 'react';

    const wagmi = await dynamicImport(wagmiModule);
    const wagmiChains = await dynamicImport(wagmiChainsModule);
    const wagmiConnectors = await dynamicImport(wagmiConnectorsModule);
    const web3modal = await dynamicImport(web3modalModule);

    // Get projectId from environment variables
    const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id';

    // Configure chains
    chains = [
      wagmiChains.mainnet,
      wagmiChains.sepolia,
      wagmiChains.polygon,
      wagmiChains.arbitrum
    ];

    // Create wagmi config
    wagmiConfig = wagmi.createConfig({
      chains,
      connectors: [
        wagmiConnectors.injected(),
        wagmiConnectors.metaMask(),
        wagmiConnectors.walletConnect({ projectId }),
      ],
      transports: {
        [wagmiChains.mainnet.id]: wagmi.http(),
        [wagmiChains.sepolia.id]: wagmi.http(),
        [wagmiChains.polygon.id]: wagmi.http(),
        [wagmiChains.arbitrum.id]: wagmi.http(),
      },
    });

    // Create Web3Modal
    if (projectId && projectId !== 'your-project-id') {
      web3modal.createWeb3Modal({
        wagmiConfig,
        projectId,
        chains,
        enableAnalytics: true,
        enableOnramp: true,
      });
    }

    configInitialized = true;
  } catch (e) {
    // Web3 dependencies not installed - config will be null
    configInitialized = true; // Mark as initialized to prevent retries
  }

  return { wagmiConfig, chains };
};

export { wagmiConfig, chains };

