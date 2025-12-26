import { useState } from 'react'
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import './HeroDetailModal.css'

const PACKAGE_ID = '0xff71d817d1d5adeb8d4d8471a9fe477db82aa6eda9d1df45f3b758bd5c5fb8d4'
const MODULE_NAME = 'hero_tcg'

interface HeroDetailModalProps {
  isOpen: boolean
  hero: {
    id: string
    name: string
    level: number
    imageUrl: string
    objectId?: string
    txHash?: string
  }
  onClose: () => void
  onLevelUp: () => void
}

export default function HeroDetailModal({ isOpen, hero, onClose, onLevelUp }: HeroDetailModalProps) {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const [isLevelingUp, setIsLevelingUp] = useState(false)

  if (!isOpen) return null

  const handleLevelUp = async () => {
    setIsLevelingUp(true)

    try {
      const tx = new Transaction()

      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::level_up`,
        arguments: [
          tx.object(hero.objectId || hero.id),
        ],
      })

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log('Hero leveled up successfully!', result)
            alert('⬆️ Hero leveled up to ' + (hero.level + 1) + '!')
            onLevelUp()
            setIsLevelingUp(false)
          },
          onError: (error) => {
            console.error('Failed to level up:', error)
            alert('Failed to level up hero. Please try again.')
            setIsLevelingUp(false)
          },
        }
      )
    } catch (error) {
      console.error('Error leveling up:', error)
      alert('An error occurred while leveling up.')
      setIsLevelingUp(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <h2>{hero.name}</h2>
          <span className="level-badge">Level {hero.level}</span>
        </div>

        <div className="modal-body">
          {/* Hero Image */}
          <div className="modal-image">
            <img src={hero.imageUrl} alt={hero.name} />
          </div>

          {/* Hero Details */}
          <div className="hero-details">
            <div className="detail-row">
              <label>Object ID:</label>
              <div className="detail-value-copy">
                <code title={hero.objectId || hero.id}>
                  {hero.objectId ? hero.objectId.slice(0, 10) + '...' + hero.objectId.slice(-8) : hero.id}
                </code>
                {(hero.objectId || hero.id) && (
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard(hero.objectId || hero.id)}
                    title="Copy Object ID"
                  >
                    ⧉
                  </button>
                )}
              </div>
            </div>

            <div className="detail-row">
              <label>TX Hash:</label>
              <div className="detail-value-copy">
                <code title={hero.txHash || 'N/A'}>
                  {hero.txHash ? hero.txHash.slice(0, 10) + '...' + hero.txHash.slice(-8) : 'N/A'}
                </code>
                {hero.txHash && (
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard(hero.txHash!)}
                    title="Copy TX Hash"
                  >
                    ⧉
                  </button>
                )}
              </div>
            </div>

            <div className="detail-row">
              <label>Level:</label>
              <span className="detail-value">{hero.level}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="neon-button levelup-btn"
            onClick={handleLevelUp}
            disabled={isLevelingUp}
            style={{
              opacity: isLevelingUp ? 0.5 : 1,
              cursor: isLevelingUp ? 'not-allowed' : 'pointer'
            }}
          >
            {isLevelingUp ? (
              <>
                <span className="spinner" />
                Leveling Up...
              </>
            ) : (
              'Level Up'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
