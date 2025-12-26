import { useState, useEffect } from 'react'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import './App.css'
import ProfileBanner from './components/ProfileBanner'
import CreateHero from './components/CreateHero'
import HeroCard from './components/HeroCard'
import WalletConnect from './components/WalletConnect'
import Creator from './components/Creator'
import Footer from './components/Footer'

const PACKAGE_ID = '0xff71d817d1d5adeb8d4d8471a9fe477db82aa6eda9d1df45f3b758bd5c5fb8d4'
const MODULE_NAME = 'hero_tcg'

interface Hero {
  id: string
  name: string
  level: number
  imageUrl: string
  objectId?: string
  txHash?: string
}

function App() {
  const account = useCurrentAccount()
  const isConnected = !!account
  const walletAddress = account?.address
  const suiClient = useSuiClient()

  const [heroes, setHeroes] = useState<Hero[]>([])
  const [isLoadingHeroes, setIsLoadingHeroes] = useState(false)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [txHashMap, setTxHashMap] = useState<Record<string, string>>({})
  const [userProfile, setUserProfile] = useState({
    name: 'Hero Collector',
    rank: 'Novice',
    avatar: 'https://images.unsplash.com/photo-1535713566543-41ca4dd65dfd?w=400&h=400&fit=crop'
  })

  // Fetch heroes from blockchain when wallet connects
  useEffect(() => {
    if (isConnected && walletAddress) {
      fetchHeroesFromBlockchain()
    } else {
      setHeroes([])
    }
  }, [isConnected, walletAddress, suiClient])

  const fetchHeroesFromBlockchain = async () => {
    if (!walletAddress) return
    
    setIsLoadingHeroes(true)
    try {
      // Query all owned objects of type Hero from the smart contract
      const response = await suiClient.getOwnedObjects({
        owner: walletAddress,
        filter: {
          StructType: `${PACKAGE_ID}::${MODULE_NAME}::Hero`
        },
        options: {
          showContent: true
        }
      })

      console.log('Fetched objects from blockchain:', response)

      // Parse hero objects from blockchain
      const fetchedHeroes: Hero[] = []
      
      if (response.data) {
        for (const obj of response.data) {
          try {
            const content = (obj.data?.content as any)
            
            if (content && content.fields) {
              const fields = content.fields
              const objectId = obj.data?.objectId || ''
              
              const hero: Hero = {
                id: objectId,
                objectId: objectId,
                name: fields.name || 'Unknown Hero',
                level: fields.level || 1,
                imageUrl: fields.image_url || 'https://picsum.photos/400/400?random=default',
                txHash: txHashMap[objectId] || ''
              }
              
              if (hero.objectId) {
                fetchedHeroes.push(hero)
                console.log('Parsed hero:', hero)
              }
            }
          } catch (error) {
            console.error('Error parsing hero object:', error, obj)
          }
        }
      }

      setHeroes(prevHeroes => {
        // Merge with existing heroes to preserve txHash data
        const heroMap = new Map<string, Hero>()
        
        // Add fetched heroes first
        fetchedHeroes.forEach(hero => {
          heroMap.set(hero.objectId, hero)
        })
        
        // Merge with existing heroes - preserve txHash from memory
        prevHeroes.forEach(prevHero => {
          if (heroMap.has(prevHero.objectId)) {
            const fetchedHero = heroMap.get(prevHero.objectId)!
            // Merge: keep blockchain data but preserve txHash
            heroMap.set(prevHero.objectId, {
              ...fetchedHero,
              txHash: prevHero.txHash || fetchedHero.txHash || txHashMap[prevHero.objectId] || ''
            })
          }
        })
        
        return Array.from(heroMap.values())
      })
      console.log('Total heroes loaded:', fetchedHeroes.length)
    } catch (error) {
      console.error('Failed to fetch heroes from blockchain:', error)
    } finally {
      setIsLoadingHeroes(false)
    }
  }

  // Update profile name when wallet connects
  useEffect(() => {
    if (isConnected && walletAddress) {
      setUserProfile(prev => ({
        ...prev,
        name: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      }))
    } else {
      setUserProfile(prev => ({
        ...prev,
        name: 'Hero Collector'
      }))
    }
  }, [isConnected, walletAddress])

  const handleCreateHero = (heroData: Omit<Hero, 'id'>) => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    console.log('=== handleCreateHero called ===')
    console.log('heroData received:', heroData)

    // Add new hero with objectId from blockchain
    const newHero: Hero = {
      ...heroData,
      id: heroData.objectId || Date.now().toString()
    }
    
    console.log('newHero created:', newHero)
    
    // Save TX hash in map for later reference
    if (heroData.objectId && heroData.txHash) {
      console.log('Saving txHash for objectId:', heroData.objectId, '-> txHash:', heroData.txHash)
      setTxHashMap(prev => {
        const updated = {
          ...prev,
          [heroData.objectId]: heroData.txHash
        }
        console.log('Updated txHashMap:', updated)
        return updated
      })
    } else {
      console.log('⚠️ Not saving txHash - objectId or txHash missing')
      console.log('objectId:', heroData.objectId, 'txHash:', heroData.txHash)
    }
    
    setHeroes([...heroes, newHero])
  }

  const handleLevelUp = (heroId: string) => {
    setHeroes(heroes.map(hero =>
      (hero.id === heroId || hero.objectId === heroId) ? { ...hero, level: hero.level + 1 } : hero
    ))
  }

  // Carousel controls
  const heroesPerPage = 2
  const maxScrollIndex = Math.max(0, heroes.length - heroesPerPage)
  
  const handlePrevious = () => {
    setScrollIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setScrollIndex(prev => Math.min(maxScrollIndex, prev + 1))
  }

  const visibleHeroes = heroes.slice(scrollIndex, scrollIndex + heroesPerPage)

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span>HERO TCG</span>
        </div>
        <div className="navbar-wallet">
          <WalletConnect />
        </div>
      </nav>

      {/* Connection Warning */}
      {!isConnected && (
        <div className="connection-warning">
          <span>⚠️ Please connect your Sui wallet to start creating heroes</span>
        </div>
      )}

      {/* Creator Landing Page */}
      <Creator profile={userProfile} walletAddress={walletAddress} />

      {/* Profile Banner */}
      {isConnected && (
        <ProfileBanner profile={userProfile} heroCount={heroes.length} />
      )}

      {isConnected ? (
        <div className="main-content">
          {/* Left Panel - Create Hero */}
          <div className="left-panel">
            <CreateHero onCreateHero={handleCreateHero} />
          </div>

          {/* Right Panel - Heroes Grid */}
          <div className="right-panel">
            <div className="content-section">
              <div className="heroes-header">
                <h2>Your Army</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="heroes-count">Total: {heroes.length}</div>
                  {isLoadingHeroes && <span style={{ color: 'var(--primary)' }}>Loading from blockchain...</span>}
                  <button
                    onClick={() => fetchHeroesFromBlockchain()}
                    disabled={isLoadingHeroes}
                    style={{
                      padding: '0.5rem 1rem',
                      background: isLoadingHeroes 
                        ? 'rgba(0, 212, 255, 0.1)' 
                        : 'rgba(0, 212, 255, 0.15)',
                      border: '1.5px solid var(--primary)',
                      color: 'var(--primary)',
                      borderRadius: '6px',
                      cursor: isLoadingHeroes ? 'not-allowed' : 'pointer',
                      opacity: isLoadingHeroes ? 0.6 : 1,
                      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: isLoadingHeroes 
                        ? '0 0 15px rgba(0, 212, 255, 0.2)'
                        : '0 0 10px rgba(0, 212, 255, 0.15)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoadingHeroes) {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 25px rgba(0, 212, 255, 0.4)'
                        ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(0, 212, 255, 0.25)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.15)'
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(0, 212, 255, 0.15)'
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      animation: isLoadingHeroes ? 'spin 1s linear infinite' : 'none'
                    }}>
                      ⟲
                    </span>
                    {isLoadingHeroes ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
              </div>

              {/* Carousel Container */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Left Arrow */}
                <button
                  onClick={handlePrevious}
                  disabled={scrollIndex === 0}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(0, 212, 255, 0.2)',
                    border: '1px solid rgba(0, 212, 255, 0.5)',
                    color: 'var(--primary)',
                    borderRadius: '50%',
                    cursor: scrollIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: scrollIndex === 0 ? 0.3 : 1,
                    fontSize: '1.5rem',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  title="Previous heroes"
                >
                  ←
                </button>

                {/* Heroes Grid */}
                <div className="heroes-grid" style={{ flex: 1 }}>
                  {visibleHeroes.map(hero => (
                    <HeroCard
                      key={hero.id}
                      hero={hero}
                      onLevelUp={() => handleLevelUp(hero.id)}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  disabled={scrollIndex >= maxScrollIndex}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(0, 212, 255, 0.2)',
                    border: '1px solid rgba(0, 212, 255, 0.5)',
                    color: 'var(--primary)',
                    borderRadius: '50%',
                    cursor: scrollIndex >= maxScrollIndex ? 'not-allowed' : 'pointer',
                    opacity: scrollIndex >= maxScrollIndex ? 0.3 : 1,
                    fontSize: '1.5rem',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  title="Next heroes"
                >
                  →
                </button>
              </div>

              {/* Pagination Indicator */}
              {heroes.length > heroesPerPage && (
                <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {scrollIndex + 1} - {Math.min(scrollIndex + heroesPerPage, heroes.length)} of {heroes.length}
                </div>
              )}

              {heroes.length === 0 && (
                <div className="liquid-card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    No heroes yet. Create your first hero to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="liquid-card empty-card">
            <h2>Welcome to Hero TCG</h2>
            <p>Connect your Sui wallet to start your hero collection journey</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

