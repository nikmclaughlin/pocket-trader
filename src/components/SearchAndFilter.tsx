import { cardIdSets, cn } from '@/lib/utils'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Doc } from 'convex/_generated/dataModel'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollBar } from './ui/scroll-area'

export const SearchAndFilter = (props: {
  cards: Doc<'cards'>[]
  parentSetter: (p: Doc<'cards'>[]) => void
  className?: string
}) => {
  const { cards, parentSetter, className } = props
  const [filteredCards, setFilteredCards] = useState(cards)
  const [currentSetFilter, setCurrentSetFilter] = useState(
    Object.values(cardIdSets)[0]
  )
  const [searchTerm, setSearchTerm] = useState('')

  // apply initial filter selection
  useEffect(() => {
    setFilteredCards(
      cards.filter(
        (card) =>
          cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
          Object.values(cardIdSets)[0]
      )
    )
  }, [cards])

  const filterCardsBySet = (setName: string) => {
    // update input state
    setCurrentSetFilter(setName)
    // update local card list
    setFilteredCards(
      cards.filter(
        (card) =>
          cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
          setName
      )
    )
  }

  const searchByTerm = (term: string) => {
    // update input state
    setSearchTerm(term)
    // only search the selected set
    filterCardsBySet(currentSetFilter)
    // update local card list
    setFilteredCards((f) =>
      f.filter(
        (card) =>
          card.name.includes(term) ||
          card.name.includes(term.charAt(0).toUpperCase() + term.slice(1))
      )
    )
  }

  // update parent card list any time local filters change
  useEffect(() => {
    parentSetter(filteredCards)
  }, [filteredCards, parentSetter])

  return (
    <div className={cn('flex justify-between gap-2', className)}>
      <div className="w-1/4">
        <Input
          type="search"
          placeholder="Pokémon name"
          value={searchTerm}
          onChange={(e) => searchByTerm(e.target.value)}
        />
      </div>
      <div className="w-7/12">
        <ScrollArea className="whitespace-nowrap overflow-scroll scrollbar-hidden ">
          <div className="flex gap-2 w-max items-center">
            {Object.values(cardIdSets).map((setName) => (
              <Button
                variant={'noShadow'}
                key={setName}
                onClick={() => filterCardsBySet(setName)}
                className={cn(
                  'px-2',
                  setName === currentSetFilter && 'bg-secondary'
                )}
              >
                {setName}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="w-1/12">
        {/* <div>RESULTS: {filteredCards.length}</div> */}
      </div>
    </div>
  )
}
