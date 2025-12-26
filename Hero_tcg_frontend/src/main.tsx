import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mysten/dapp-kit/dist/index.css'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={{
          testnet: {
            url: 'https://fullnode.testnet.sui.io:443',
          },
          mainnet: {
            url: 'https://fullnode.mainnet.sui.io:443',
          },
        }}
        defaultNetwork="testnet"
      >
        <WalletProvider>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>,
)
