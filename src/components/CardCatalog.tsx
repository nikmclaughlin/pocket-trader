import { Doc } from 'convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { PkmnCard } from './PkmnCard'
import { SearchAndFilter } from './SearchAndFilter'

export const CardCatalog = () => {
  const fullCardList = useQuery(api.cards.list)
  const [filteredCards, setFilteredCards] = useState(fullCardList)
  const handleSearchChange = (newCards: Doc<'cards'>[]) => {
    setFilteredCards(newCards)
  }

  useEffect(() => {
    setFilteredCards(fullCardList)
  }, [fullCardList])

  return (
    <div>
      <p className="font-heading text-3xl">CARD CATALOG</p>
      {fullCardList ? (
        <>
          <SearchAndFilter
            cards={fullCardList}
            parentSetter={handleSearchChange}
          />
          <div className="grid grid-cols-4 justify-around gap-2 p-2">
            {filteredCards?.map((card) => (
              <PkmnCard key={card._id} cardData={card} />
            ))}
          </div>
        </>
      ) : (
        <p className="animate-bounce">LOADING</p>
      )}
    </div>
  )
}
