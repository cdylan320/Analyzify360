# Web3 Integration Setup Guide

## Required Dependencies

Install the following packages for Web3 functionality:

```bash
npm install wagmi viem @tanstack/react-query @web3modal/wagmi @web3modal/ethereum
```

## Environment Variables

Create a `.env.local` file in the `frontend` directory with:

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-walletconnect-project-id
```

To get a WalletConnect Project ID:
1. Go to https://cloud.walletconnect.com/
2. Create a new project
3. Copy the Project ID

## Features Implemented

1. ✅ Interactive 3D Landing Page with rotating logo
2. ✅ 3D Navigation Menu with Web3 unlockable features
3. ✅ Wallet Connect Component
4. ✅ Web3 Provider Setup

## Components Available

- `WalletConnect` - Connect wallet button/badge
- `Interactive3DLogo` - 3D logo that responds to cursor
- `Navigation3D` - 3D navigation menu with unlockable sections
- `Web3Provider` - Web3 context provider

## Usage

Wrap your app with Web3Provider in `layout.tsx`:

```tsx
import { Web3Provider } from "@/components/providers/Web3Provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Web3Provider>
          {/* Your app */}
        </Web3Provider>
      </body>
    </html>
  );
}
```

