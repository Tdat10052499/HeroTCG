import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import './WalletConnect.css'

export default function WalletConnect() {
  const account = useCurrentAccount()
  const isConnected = !!account
  const walletAddress = account?.address

  const displayAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : 'Connect Wallet'

  return (
    <div className="wallet-connect">
      <div className="sui-connect-button">
        <ConnectButton />
      </div>
      {isConnected && (
        <div className="wallet-info">
          <span className="wallet-status">● Connected</span>
          <span className="wallet-address" title={walletAddress}>
            {displayAddress}
          </span>
        </div>
      )}
    </div>
  )
}
