import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { cn } from '../lib/utils'
import { PkmnCard } from './PkmnCard'
import { SearchAndFilter } from './SearchAndFilter'
import { ScrollBar } from './ui/scroll-area'

export const CardSelector = (props: {
  cardState: Id<'cards'>[]
  cb: React.Dispatch<React.SetStateAction<Id<'cards'>[]>>
}) => {
  const { cardState, cb } = props
  const cards = useQuery(api.cards.list)
  const [filteredCards, setFilteredCards] = useState(cards)

  const toggleCardSelection = (cardId: Id<'cards'>) => {
    if (!cardState?.includes(cardId)) {
      cb([...cardState, cardId])
    } else {
      cb(cardState.filter((selectedCardId) => selectedCardId !== cardId))
    }
  }

  const handleSearchChange = (newCards: Doc<'cards'>[]) => {
    setFilteredCards(newCards)
  }

  return (
    <>
      {cards ? (
        <>
          <SearchAndFilter
            cards={cards}
            parentSetter={handleSearchChange}
            className="w-full"
          />
          <ScrollArea className="h-15/16 overflow-y-scroll">
            <ScrollBar orientation="vertical" />
            <div className="max-w-[90vw] grid grid-cols-5 justify-around gap-2 p-2">
              {filteredCards?.map((card) => {
                return (
                  <div
                    className={cn(
                      'hover:scale-[1.02] transition-all',
                      cardState.includes(card._id)
                        ? 'bg-green-500/50'
                        : 'bg-white'
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
      ) : (
        <div>LOADING</div>
      )}
    </>
  )
}
