import { cardIdSets, cardRarities, sanitizeFileName } from '@/lib/utils'
import { Doc } from '../../convex/_generated/dataModel'

export const PkmnCard = (params: { cardData: Doc<'cards'> }) => {
  const cardData = params.cardData

  const cardSet = cardData.id.split('-')[0] as keyof typeof cardIdSets
  const setIcon = `/set_logos/${sanitizeFileName(cardIdSets[cardSet])}.png`
  const rarityIcon =
    cardData.rarity === 'Promo'
      ? undefined
      : `/rarities/${sanitizeFileName(cardRarities[cardData.rarity])}.png`

  return (
    <div className="border-2 rounded p-2 flex flex-col items-center font-base text-foreground h-min">
      <div className="flex w-full justify-center items-center">
        <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-heading text-center">
          {cardData.name}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center py-2">
        {/* <img src={cardData.images.small} /> */}
        <img
          src="/card-back.webp"
          className="rounded sm:rounded-lg xl:rounded-2xl"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <img src={setIcon} className="h-4 sm:h-6" />
        <p className="text-center text-xs md:text-sm">
          Card ID: {cardData.number}
        </p>
        <img src={rarityIcon} className="h-3" />
      </div>
    </div>
  )
}
