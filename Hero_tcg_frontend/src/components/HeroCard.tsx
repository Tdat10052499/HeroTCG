import { useState } from 'react'
import './HeroCard.css'
import HeroDetailModal from './HeroDetailModal'

interface HeroCardProps {
  hero: {
    id: string
    name: string
    level: number
    imageUrl: string
    objectId?: string
    txHash?: string
  }
  onLevelUp: () => void
}

export default function HeroCard({ hero, onLevelUp }: HeroCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="hero-card liquid-card" onClick={() => setShowModal(true)}>
        {/* Card Header */}
        <div className="card-header">
          <h3 className="card-title">{hero.name}</h3>
        </div>

        {/* Hero Image */}
        <div className="hero-image-container">
          <img
            src={hero.imageUrl}
            alt={hero.name}
            className="hero-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/400/400?random=fallback'
            }}
          />
          <div className="image-overlay" />
        </div>

        {/* Hero Stats */}
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{hero.level}</span>
          </div>
        </div>

        <div className="card-click-hint">Click to view details</div>
      </div>

      <HeroDetailModal 
        isOpen={showModal}
        hero={hero}
        onClose={() => setShowModal(false)}
        onLevelUp={onLevelUp}
      />
    </>
  )
}
