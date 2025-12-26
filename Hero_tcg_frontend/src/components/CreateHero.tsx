import { useState } from 'react'
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import './CreateHero.css'

const PACKAGE_ID = '0xff71d817d1d5adeb8d4d8471a9fe477db82aa6eda9d1df45f3b758bd5c5fb8d4'
const MODULE_NAME = 'hero_tcg'

interface CreateHeroProps {
  onCreateHero: (hero: {
    name: string
    level: number
    imageUrl: string
    objectId?: string
    txHash?: string
  }) => void
}

export default function CreateHero({ onCreateHero }: CreateHeroProps) {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const suiClient = useSuiClient()
  const [formData, setFormData] = useState({
    name: '',
    level: 1,
    imageUrl: ''
  })

  const [preview, setPreview] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData(prev => ({ ...prev, imageUrl: url }))
    if (url) {
      setPreview(url)
    }
  }

  const generateArt = async () => {
    if (!formData.name) {
      alert('Please enter a hero name first')
      return
    }

    setIsGenerating(true)
    
    try {
      const prompt = `A fantasy game hero character named ${formData.name}, detailed art, high quality, professional illustration, anime style`
      
      // Use Pollinations AI - free, no API key needed
      const encodedPrompt = encodeURIComponent(prompt)
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&width=400&height=400`
      
      setFormData(prev => ({ ...prev, imageUrl }))
      setPreview(imageUrl)
    } catch (error) {
      console.error('Failed to generate art:', error)
      alert('Failed to generate image.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.imageUrl) {
      alert('Please fill in all fields and generate or provide an image')
      return
    }

    setIsMinting(true)

    try {
      const tx = new Transaction()

      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_hero`,
        arguments: [
          tx.pure.string(formData.name),
          tx.pure.u8(formData.level),
          tx.pure.string(formData.imageUrl),
        ],
      })

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async (result) => {
            console.log('Transaction successful! Digest:', (result as any).digest)
            
            const txHash = (result as any).digest
            
            // Query transaction block from chain to get Object ID
            try {
              // Wait a moment for transaction to be indexed
              await new Promise(resolve => setTimeout(resolve, 2000))
              
              const txBlock = await suiClient.getTransactionBlock({
                digest: txHash,
                options: {
                  showObjectChanges: true,
                  showEffects: true
                }
              })
              
              console.log('Transaction block:', txBlock)
              
              let objectId = ''
              
              // Try to extract from objectChanges
              if (txBlock.objectChanges) {
                const created = txBlock.objectChanges.find(
                  (change: any) => change.type === 'created' && change.objectType?.includes(MODULE_NAME)
                )
                if (created) {
                  objectId = (created as any).objectId
                  console.log('Found objectId from objectChanges:', objectId)
                }
              }
              
              // Fallback: if not found, try all created objects
              if (!objectId && txBlock.objectChanges) {
                const firstCreated = txBlock.objectChanges.find((change: any) => change.type === 'created')
                if (firstCreated) {
                  objectId = (firstCreated as any).objectId
                  console.log('Found objectId from first created:', objectId)
                }
              }
              
              alert('🎉 Hero minted successfully on Sui blockchain!')
              
              console.log('=== CALLING onCreateHero ===')
              console.log('objectId:', objectId)
              console.log('txHash:', txHash)
              
              // Call local callback for UI update
              const heroData = {
                name: formData.name,
                level: formData.level,
                imageUrl: formData.imageUrl,
                objectId: objectId || '',
                txHash: txHash || ''
              }
              console.log('Complete heroData:', heroData)
              onCreateHero(heroData)

              // Reset form
              setFormData({
                name: '',
                level: 1,
                imageUrl: ''
              })
              setPreview('')
              setIsMinting(false)
            } catch (error) {
              console.error('Failed to fetch transaction block:', error)
              alert('Hero minted but failed to fetch details. Refresh page.')
              setIsMinting(false)
            }
          },
          onError: (error) => {
            console.error('Failed to mint hero:', error)
            alert('Failed to mint hero. Please try again.')
            setIsMinting(false)
          },
        }
      )
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      alert('An error occurred while minting.')
      setIsMinting(false)
    }
  }

  return (
    <div className="create-hero-container">
      <div className="liquid-card create-hero-card">
        <h2 className="create-hero-title">Summon Hero</h2>

        <form onSubmit={handleSubmit} className="create-hero-form">
          {/* Hero Name */}
          <div className="form-group">
            <label htmlFor="name">Hero Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter hero name..."
              className="glass-input"
              maxLength={50}
            />
          </div>

          {/* Image Preview */}
          <div className="form-group">
            <label htmlFor="imageUrl">Hero Image</label>
            <input
              id="imageUrl"
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL or generate..."
              className="glass-input"
            />
          </div>

          {/* Image Preview Box */}
          <div className="image-preview-wrapper">
            <div className={`image-preview ${isGenerating ? 'loading' : ''}`}>
              {preview ? (
                <>
                  <img src={preview} alt="Hero preview" />
                  {isGenerating && <div className="scan-line" />}
                </>
              ) : (
                <div className="placeholder">
                  <p>Preview</p>
                </div>
              )}
            </div>
          </div>

          {/* Generate Art Button */}
          <button
            type="button"
            onClick={generateArt}
            disabled={isGenerating || !formData.name}
            className="neon-button generate-button"
            style={{
              opacity: isGenerating || !formData.name ? 0.5 : 1,
              cursor: isGenerating || !formData.name ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating ? (
              <>
                <span className="spinner" />
                Generating...
              </>
            ) : (
              'Generate Art'
            )}
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="neon-button submit-button"
            disabled={!formData.imageUrl || isMinting}
            style={{
              opacity: (!formData.imageUrl || isMinting) ? 0.5 : 1,
              cursor: (!formData.imageUrl || isMinting) ? 'not-allowed' : 'pointer'
            }}
          >
            {isMinting ? (
              <>
                <span className="spinner" />
                Minting NFT...
              </>
            ) : (
              'Mint NFT'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
