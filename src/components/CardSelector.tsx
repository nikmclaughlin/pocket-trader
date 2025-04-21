import { ScrollArea } from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { cardIdSets, cn } from '../lib/utils'
import { PkmnCard } from './PkmnCard'
import { Button } from './ui/button'

export const CardSelector = (props: {
  cardState: Id<'cards'>[]
  cb: React.Dispatch<React.SetStateAction<Id<'cards'>[]>>
}) => {
  const { cardState, cb } = props
  const cards = useQuery(api.cards.list)
  const [currentSetFilter, setCurrentSetFilter] = useState(
    Object.values(cardIdSets)[0]
  )
  const filteredCards = cards?.filter(
    (card) =>
      cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
      currentSetFilter
  )

  const toggleCardSelection = (cardId: Id<'cards'>) => {
    if (!cardState?.includes(cardId)) {
      cb([...cardState, cardId])
    } else {
      cb(cardState.filter((selectedCardId) => selectedCardId !== cardId))
    }
  }

  return (
    <>
      <div className="h-1/8 flex justify-center gap-1">
        {Object.values(cardIdSets).map((setName) => (
          <Button
            variant={'noShadow'}
            onClick={() => setCurrentSetFilter(setName)}
            className={clsx(setName === currentSetFilter && 'bg-secondary')}
          >
            {setName}
          </Button>
        ))}
      </div>
      <ScrollArea className="h-7/8 overflow-y-scroll">
        <div className="grid grid-cols-4 justify-around gap-2 p-2">
          {filteredCards?.map((card) => {
            //   const isSelected = selectedCards?.includes(card._id)
            return (
              <div
                className={cn(
                  'hover:scale-[1.02] transition-all',
                  cardState.includes(card._id) ? 'bg-green-500/50' : 'bg-white'
                )}
                onClick={() => toggleCardSelection(card._id)}
                key={card._id}
              >
                <PkmnCard cardData={card} />
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </>
  )
}
