import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useQuery } from 'convex/react'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { cardIdSets, cn } from '../lib/utils'
import { PkmnCard } from './PkmnCard'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollBar } from './ui/scroll-area'

export const CardSelector = (props: {
  cardState: Id<'cards'>[]
  cb: React.Dispatch<React.SetStateAction<Id<'cards'>[]>>
}) => {
  const { cardState, cb } = props
  const cards = useQuery(api.cards.list)
  const [filteredCards, setFilteredCards] = useState(cards)
  const [currentSetFilter, setCurrentSetFilter] = useState(
    Object.values(cardIdSets)[0]
  )
  const [searchTerm, setSearchTerm] = useState('')

  const applySetFilter = useCallback(() => {
    setFilteredCards(
      cards?.filter(
        (card) =>
          cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
          currentSetFilter
      )
    )
  }, [cards, currentSetFilter])

  useEffect(() => {
    applySetFilter()
  }, [applySetFilter, cards, currentSetFilter])

  useEffect(() => {
    const handler = setTimeout(() => {
      applySetFilter()
      setFilteredCards((f) =>
        f?.filter(
          (card) =>
            card.name.includes(searchTerm) ||
            card.name.includes(
              searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
            )
        )
      )
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [applySetFilter, searchTerm])

  const toggleCardSelection = (cardId: Id<'cards'>) => {
    if (!cardState?.includes(cardId)) {
      cb([...cardState, cardId])
    } else {
      cb(cardState.filter((selectedCardId) => selectedCardId !== cardId))
    }
  }

  return (
    <>
      <div className="flex justify-between gap-2">
        <Input
          className="w-1/4"
          type="search"
          placeholder="Pokémon name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollArea className="w-7/12 whitespace-nowrap overflow-scroll">
          <ScrollBar orientation="horizontal" />
          {Object.values(cardIdSets).map((setName) => (
            <Button
              variant={'noShadow'}
              onClick={() => setCurrentSetFilter(setName)}
              className={cn(
                'px-2, mx-1',
                setName === currentSetFilter && 'bg-secondary'
              )}
            >
              {setName}
            </Button>
          ))}
        </ScrollArea>
        <div className="w-1/12">Results: {filteredCards?.length}</div>
      </div>
      <ScrollArea className="h-15/16 overflow-y-scroll">
        <ScrollBar orientation="vertical" />
        <div className="max-w-[90vw] grid grid-cols-5 justify-around gap-2 p-2">
          {filteredCards?.map((card) => {
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
