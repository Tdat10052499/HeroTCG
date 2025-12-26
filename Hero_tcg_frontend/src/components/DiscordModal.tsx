import { useState } from 'react'
import './DiscordModal.css'

interface DiscordModalProps {
  isOpen: boolean
  onClose: () => void
  discordHandle: string
  discordUserId?: string
}

export default function DiscordModal({ isOpen, onClose, discordHandle, discordUserId = '1234567890' }: DiscordModalProps) {
  const [copied, setCopied] = useState<string | null>(null)

  if (!isOpen) return null

  // Generate QR code URL using Discord profile/invite
  // Since we don't have a server invite, we'll use a Discord profile-like URL
  const discordProfileUrl = `https://discordapp.com/users/${discordUserId}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(discordProfileUrl)}`

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(discordHandle)
    setCopied('username')
    setTimeout(() => setCopied(null), 2000)
  }

  // Discord user ID copy removed per requirements

  const handleOpenDiscord = () => {
    // Try to open Discord app
    window.open(`discord://users/${discordUserId}`, '_blank')
  }

  return (
    <div className="discord-modal-backdrop" onClick={handleBackdropClick}>
      <div className="discord-modal-content">
        <button className="discord-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="discord-modal-header">
          <h3>Discord Profile</h3>
          <p>Connect on Discord</p>
        </div>

        <div className="discord-modal-body">
          <div className="qr-code-container">
            <img src={qrCodeUrl} alt="Discord QR Code" className="qr-code-image" />
          </div>
          
          <div className="discord-modal-info">
            <div className="info-item">
              <label>Username</label>
              <div className="info-value">{discordHandle}</div>
              <button
                className="copy-button"
                onClick={handleCopyUsername}
                title="Copy Username"
              >
                {copied === 'username' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        <div className="discord-modal-footer">
          <button className="discord-modal-button secondary" onClick={handleOpenDiscord}>
            Open Discord
          </button>
          <button className="discord-modal-button primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
