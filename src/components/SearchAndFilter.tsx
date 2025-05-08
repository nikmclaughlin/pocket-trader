import { cn } from '@/lib/utils'
import { Doc } from 'convex/_generated/dataModel'
import { useEffect, useState } from 'react'
import { FilterDrawer, FilterRule } from './FilterDrawer'
import { Input } from './ui/input'

export const SearchAndFilter = (props: {
  cards: Doc<'cards'>[]
  parentSetter: (p: Doc<'cards'>[]) => void
  className?: string
}) => {
  const { cards, parentSetter, className } = props
  const [filteredCards, setFilteredCards] = useState(cards)
  const [appliedFilters, setAppliedFilters] = useState<FilterRule[]>([])

  const [searchTerm, setSearchTerm] = useState('')

  const searchByTerm = (term: string) => {
    // update input state
    setSearchTerm(term)
    // only search filtered selection
    handleFilter(appliedFilters)
    // update local card list
    setFilteredCards((f) =>
      f.filter(
        (card) =>
          card.name.includes(term) ||
          card.name.includes(term.charAt(0).toUpperCase() + term.slice(1))
      )
    )
  }

  const handleFilter = (appliedFilters: FilterRule[]) => {
    setAppliedFilters(appliedFilters)
    // update local card list
    const newCards = cards.filter((card) => {
      const result = appliedFilters.map((filter) => {
        if (filter.factor === 'id') {
          return filter.values.includes(card.id.split('-')[0])
        }
        return filter.values.includes(card[filter.factor] as string)
      })
      return result.every((r) => r === true)
    })
    setFilteredCards(newCards)
  }

  // update parent card list any time local filters change
  useEffect(() => {
    parentSetter(filteredCards)
  }, [filteredCards, parentSetter])

  return (
    <div
      className={cn('flex justify-between sm:justify-start gap-2', className)}
    >
      <div>
        <Input
          type="search"
          placeholder="Pokémon name"
          value={searchTerm}
          onChange={(e) => searchByTerm(e.target.value)}
        />
      </div>
      <div className=" flex gap-2 items-center">
        <FilterDrawer submitCb={handleFilter} />
      </div>
    </div>
  )
}
