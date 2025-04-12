import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { cn } from '../lib/utils'
import { Card } from './Card'

export const CardSelector = (props: {
  cardState: Id<'cards'>[]
  cb: React.Dispatch<React.SetStateAction<Id<'cards'>[]>>
}) => {
  const cards = useQuery(api.cards.list)
  const { cardState, cb } = props

  const toggleCardSelection = (cardId: Id<'cards'>) => {
    if (!cardState?.includes(cardId)) {
      cb([...cardState, cardId])
    } else {
      cb(cardState.filter((selectedCardId) => selectedCardId !== cardId))
    }
  }

  console.log({ cardState })

  return (
    <>
      <div className="grid grid-cols-4 justify-around gap-2 p-2">
        {cards?.map((card) => {
          //   const isSelected = selectedCards?.includes(card._id)
          return (
            <div
              className={cn(
                'hover:scale-105 transition-all',
                cardState.includes(card._id) ? 'bg-green-500/50' : 'bg-white'
              )}
              onClick={() => toggleCardSelection(card._id)}
              key={card._id}
            >
              <Card cardData={card} />
            </div>
          )
        })}
      </div>
    </>
  )
}
