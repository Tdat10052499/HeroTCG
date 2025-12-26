// QR Code Modal component
import './QRCodeModal.css'

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  telegramHandle: string
}

export default function QRCodeModal({ isOpen, onClose, telegramHandle }: QRCodeModalProps) {
  if (!isOpen) return null

  // Generate QR code URL using a free QR code API
  const telegramUrl = `https://t.me/${telegramHandle}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(telegramUrl)}`

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="qr-modal-backdrop" onClick={handleBackdropClick}>
      <div className="qr-modal-content">
        <button className="qr-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="qr-modal-header">
          <h3>Telegram QR Code</h3>
          <p>Scan to connect on Telegram</p>
        </div>

        <div className="qr-modal-body">
          <div className="qr-code-container">
            <img src={qrCodeUrl} alt="Telegram QR Code" className="qr-code-image" />
          </div>
          
          <div className="qr-modal-info">
            <p>Telegram: <strong>@{telegramHandle}</strong></p>
            <button
              className="copy-telegram-btn"
              onClick={() => {
                navigator.clipboard.writeText(`@${telegramHandle}`)
              }}
            >
              Copy Telegram Handle
            </button>
          </div>
        </div>

        <div className="qr-modal-footer">
          <button className="qr-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
