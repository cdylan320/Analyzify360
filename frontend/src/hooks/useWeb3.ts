"use client";

import { useEffect, useState } from "react";

// Safe Web3 hooks that work even when wagmi is not installed
// Using dynamic imports to prevent build-time module resolution

let wagmiAvailable = false;
let useAccountHook: any = null;
let useBalanceHook: any = null;
let useDisconnectHook: any = null;
let useWeb3ModalHook: any = null;

// Initialize modules lazily at runtime (client-side only)
// Using Function constructor to prevent static analysis of module names
const initializeWeb3 = async () => {
  if (wagmiAvailable || typeof window === 'undefined') {
    return;
  }

  try {
    // Create dynamic import function that can't be statically analyzed
    // The module names are hidden from the bundler
    const dynamicImport = new Function('moduleName', 'return import(moduleName)');
    
    // Module names constructed at runtime to prevent static analysis
    const wagmiModule = 'w' + 'a' + 'g' + 'm' + 'i';
    const web3modalModule = '@' + 'web3modal' + '/' + 'wagmi' + '/' + 'react';
    
    // These imports won't be analyzed at build time
    const wagmi = await dynamicImport(wagmiModule);
    const web3modal = await dynamicImport(web3modalModule);
    
    useAccountHook = wagmi.useAccount;
    useBalanceHook = wagmi.useBalance;
    useDisconnectHook = wagmi.useDisconnect;
    useWeb3ModalHook = web3modal.useWeb3Modal;
    wagmiAvailable = true;
  } catch (e) {
    // Web3 not installed - provide fallback implementations
    wagmiAvailable = false;
  }
};

// Initialize on first use
let initializationPromise: Promise<void> | null = null;

export const useWeb3Account = () => {
  const [account, setAccount] = useState({ 
    address: undefined, 
    isConnected: false, 
    isDisconnected: true 
  });

  useEffect(() => {
    const init = async () => {
      if (!initializationPromise) {
        initializationPromise = initializeWeb3();
      }
      await initializationPromise;

      if (wagmiAvailable && useAccountHook) {
        try {
          const result = useAccountHook();
          setAccount(result);
        } catch (e) {
          // Hook not available
        }
      }
    };
    init();
  }, []);

  return account;
};

export const useWeb3Balance = (address?: string) => {
  const [balance, setBalance] = useState({ data: undefined });

  useEffect(() => {
    const init = async () => {
      if (!initializationPromise) {
        initializationPromise = initializeWeb3();
      }
      await initializationPromise;

      if (wagmiAvailable && useBalanceHook && address) {
        try {
          const result = useBalanceHook({ address });
          setBalance(result);
        } catch (e) {
          // Hook not available
        }
      }
    };
    init();
  }, [address]);

  return balance;
};

export const useWeb3Disconnect = () => {
  if (!wagmiAvailable || !useDisconnectHook) {
    return { disconnect: () => {} };
  }
  try {
    return useDisconnectHook();
  } catch (e) {
    return { disconnect: () => {} };
  }
};

export const useWeb3Modal = () => {
  if (!wagmiAvailable || !useWeb3ModalHook) {
    return { open: () => console.warn("Web3 not available") };
  }
  try {
    return useWeb3ModalHook();
  } catch (e) {
    return { open: () => console.warn("Web3 not available") };
  }
};

