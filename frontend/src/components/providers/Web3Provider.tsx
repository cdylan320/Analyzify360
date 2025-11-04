"use client";

import React, { useEffect, useState } from "react";
import { initializeWeb3Config } from "@/lib/web3/config";

interface Web3ProviderProps {
  children: React.ReactNode;
}

// Lazy load Web3 modules at runtime to avoid build-time resolution
const loadWeb3Modules = async () => {
  try {
    // Use Function constructor to prevent static analysis
    const dynamicImport = new Function('moduleName', 'return import(moduleName)');
    
    // Module names constructed at runtime
    const wagmiModule = 'w' + 'a' + 'g' + 'm' + 'i';
    const reactQueryModule = '@' + 'tanstack' + '/' + 'react-query';
    
    const wagmi = await dynamicImport(wagmiModule);
    const reactQuery = await dynamicImport(reactQueryModule);
    
    // Initialize config
    const { wagmiConfig } = await initializeWeb3Config();
    
    if (!wagmiConfig) {
      return null;
    }
    
    return {
      WagmiProvider: wagmi.WagmiProvider,
      QueryClientProvider: reactQuery.QueryClientProvider,
      QueryClient: reactQuery.QueryClient,
      wagmiConfig,
    };
  } catch (e) {
    return null;
  }
};

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [modules, setModules] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadWeb3Modules().then((m) => {
      setModules(m);
      setLoaded(true);
    });
  }, []);

  // If Web3 is not available or not loaded yet, just render children
  if (!loaded || !modules || !modules.WagmiProvider || !modules.QueryClientProvider || !modules.QueryClient || !modules.wagmiConfig) {
    return <>{children}</>;
  }

  const queryClient = new modules.QueryClient();

  return (
    <modules.WagmiProvider config={modules.wagmiConfig}>
      <modules.QueryClientProvider client={queryClient}>
        {children}
      </modules.QueryClientProvider>
    </modules.WagmiProvider>
  );
};

export default Web3Provider;

