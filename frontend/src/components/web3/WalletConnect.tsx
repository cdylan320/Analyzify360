"use client";

import React from "react";
import { Button, Icon } from "../ui";
import { motion } from "framer-motion";
import { useWeb3Account, useWeb3Balance, useWeb3Disconnect, useWeb3Modal } from "@/hooks/useWeb3";

interface WalletConnectProps {
  variant?: "button" | "badge" | "minimal";
  showBalance?: boolean;
  className?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  variant = "button",
  showBalance = false,
  className = "",
}) => {
  // Safe Web3 hooks - always called unconditionally
  const { address, isConnected } = useWeb3Account();
  const { open } = useWeb3Modal();
  const { disconnect } = useWeb3Disconnect();
  const { data: balance } = useWeb3Balance(address);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: bigint | undefined) => {
    if (!bal) return "0.00";
    return (Number(bal) / 1e18).toFixed(4);
  };

  if (variant === "badge") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white ${className}`}
      >
        {isConnected ? (
          <>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">
              {address ? formatAddress(address) : "Connected"}
            </span>
            {showBalance && balance && (
              <span className="text-xs opacity-80">
                {formatBalance(balance?.value)} ETH
              </span>
            )}
            <button
              onClick={() => disconnect()}
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              <Icon name="close" size="sm" />
            </button>
          </>
        ) : (
          <>
            <Icon name="wallet" size="sm" />
            <span className="text-sm font-semibold">Connect Wallet</span>
          </>
        )}
      </motion.div>
    );
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={() => open()}
        className={`flex items-center gap-2 ${className}`}
      >
        <Icon name={isConnected ? "check-circle" : "wallet"} size="sm" />
        {isConnected ? (
          <span className="text-sm">{formatAddress(address!)}</span>
        ) : (
          <span className="text-sm">Connect</span>
        )}
      </button>
    );
  }

  return (
    <Button
      variant={isConnected ? "outline" : "primary"}
      onClick={() => open()}
      className={className}
      rightIcon={
        <Icon name={isConnected ? "check-circle" : "wallet"} size="sm" />
      }
    >
      {isConnected && address ? (
        <>
          {formatAddress(address)}
          {showBalance && balance && ` • ${formatBalance(balance.value)} ETH`}
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
};

export default WalletConnect;

