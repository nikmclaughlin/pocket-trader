import { cardIdSets } from '@/lib/utils'
import { Doc } from '../../convex/_generated/dataModel'

export const PkmnCard = (params: { cardData: Doc<'cards'> }) => {
  const cardData = params.cardData

  const cardSet = cardData.id.split('-')[0] as keyof typeof cardIdSets

  return (
    <div className="border-2 rounded p-2 flex flex-col items-center font-base text-foreground h-min">
      <div className="flex w-full justify-center items-center p-2">
        <h2 className="text-xl font-heading text-center">{cardData.name}</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <img src={cardData.images.small} />
      </div>
      <p className="text-md">Set: {cardIdSets[cardSet]}</p>
      <p className="text-center text-sm">Card ID: {cardData.number}</p>
    </div>
  )
}
