import { cardIdSets } from '@/lib/utils'
import clsx from 'clsx'
import { useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { PkmnCard } from './PkmnCard'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export const CardCatalog = () => {
  const cards = useQuery(api.cards.list)
  const [filteredCards, setFilteredCards] = useState(cards)
  const [currentSetFilter, setCurrentSetFilter] = useState(
    Object.values(cardIdSets)[0]
  )
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setFilteredCards(
      cards?.filter(
        (card) =>
          cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
          currentSetFilter
      )
    )
  }, [cards, currentSetFilter])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm === '') {
        setFilteredCards(
          cards?.filter(
            (card) =>
              cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
              currentSetFilter
          )
        )
      } else {
        setFilteredCards((f) =>
          f?.filter(
            (card) =>
              card.name.includes(searchTerm) ||
              card.name.includes(
                searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
              )
          )
        )
      }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [cards, currentSetFilter, searchTerm])

  return (
    <div>
      <p className="font-heading text-3xl">CARD CATALOG</p>
      <div className="flex justify-between gap-2">
        <Input
          className="w-1/4"
          type="search"
          placeholder="Pokémon name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollArea className="w-7/12 whitespace-nowrap">
          {Object.values(cardIdSets).map((setName) => (
            <Button
              variant={'noShadow'}
              onClick={() => setCurrentSetFilter(setName)}
              className={clsx(
                'px-2, mx-1',
                setName === currentSetFilter && 'bg-secondary'
              )}
            >
              {setName}
            </Button>
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="w-1/12">Results: {filteredCards?.length}</div>
      </div>
      <div className="grid grid-cols-4 justify-around gap-2 p-2">
        {filteredCards?.map((card) => (
          <PkmnCard key={card._id} cardData={card} />
        ))}
      </div>
    </div>
  )
}
