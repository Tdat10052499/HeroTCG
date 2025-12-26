import { useCurrentAccount, useWalletKit } from '@mysten/dapp-kit'

export function useWallet() {
  const account = useCurrentAccount()
  const { currentWallet, wallets } = useWalletKit()

  return {
    currentAccount: account,
    accounts: wallets,
    isConnecting: false,
    disconnect: async () => {
      // Handle disconnect if needed
    },
    status: account ? 'connected' : 'disconnected',
    isConnected: !!account,
    walletAddress: account?.address,
    currentWallet
  }
}

