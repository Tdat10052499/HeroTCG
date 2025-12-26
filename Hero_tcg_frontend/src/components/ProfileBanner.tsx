import './ProfileBanner.css'

interface ProfileBannerProps {
  profile: {
    name: string
    rank: string
    avatar: string
  }
  heroCount: number
}

export default function ProfileBanner({ profile, heroCount }: ProfileBannerProps) {
  return (
    <div className="profile-banner liquid-card">
      <div className="profile-content">
        {/* Profile Info */}
        <div className="profile-info">
          <h2 className="profile-name">{profile.name}</h2>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-details">
                <span className="stat-label">Total Heroes</span>
                <span className="stat-number">{heroCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
