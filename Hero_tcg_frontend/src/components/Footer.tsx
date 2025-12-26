import './Footer.css'

interface SmartContractInfo {
  name: string
  packageId: string
  description: string
}

const contractInfo: SmartContractInfo[] = [
  {
    name: 'Hero TCG Smart Contract',
    packageId: '0xff71d817d1d5adeb8d4d8471a9fe477db82aa6eda9d1df45f3b758bd5c5fb8d4',
    description: 'Main smart contract for Hero trading card game on Sui blockchain'
  }
]

export default function Footer() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-header">
          <h3>Smart Contract Information</h3>
          <p>Published Package IDs from Smart Contract</p>
        </div>

        <div className="contracts-grid">
          {contractInfo.map((contract) => (
            <div key={contract.name} className="contract-card">
              <div className="contract-header">
                <h4>{contract.name}</h4>
              </div>
              <p className="contract-description">{contract.description}</p>
              
              <div className="package-id-section">
                <label>Package ID:</label>
                <div className="package-id-box">
                  <span className="package-id-text">{contract.packageId}</span>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(contract.packageId)}
                    title="Copy Package ID"
                  >
                    ⧉
                  </button>
                </div>
              </div>

              <div className="contract-details">
                <div className="detail-item">
                  <span className="detail-label">Network:</span>
                  <span className="detail-value">Sui Testnet</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value" style={{ color: '#00ff00' }}>● Published</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="footer-socials">
          <a 
            href="https://github.com/Tdat10052499/Hero_tcg_frontend" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
            title="Visit GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.015 12.015 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a 
            href="https://t.me/TE1CHI" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
            title="Visit Telegram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.332-2.97-.924c-.645-.213-.658-.645.136-.953l11.585-4.468c.537-.194 1.006.131.832.941z" />
            </svg>
          </a>
          <a 
            href="https://discord.com/users/1234567890" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
            title="Visit Discord"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.607 1.252a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.252.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.352.699.764 1.365 1.226 1.994a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-3.03.076.076 0 0 0 .032-.055c.5-4.786-.838-8.95-3.549-12.676a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.96-2.157 2.157-2.157 1.196 0 2.157.964 2.157 2.157 0 1.19-.96 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.96-2.157 2.157-2.157 1.196 0 2.157.964 2.157 2.157 0 1.19-.96 2.156-2.157 2.156z" />
            </svg>
          </a>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Hero TCG. Built on Sui blockchain.</p>
          <p>Cre by: Teichi D</p>
        </div>
      </div>
    </footer>
  )
}
