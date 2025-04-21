import { cardIdSets } from '@/lib/utils'
import clsx from 'clsx'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { PkmnCard } from './PkmnCard'
import { Button } from './ui/button'

export const CardCatalog = () => {
  const cards = useQuery(api.cards.list)
  const [currentSetFilter, setCurrentSetFilter] = useState(
    Object.values(cardIdSets)[0]
  )
  const filteredCards = cards?.filter(
    (card) =>
      cardIdSets[card.id.split('-')[0] as keyof typeof cardIdSets] ===
      currentSetFilter
  )
  return (
    <div>
      <p className="font-heading text-3xl">CARD CATALOG</p>
      <div className="flex justify-center gap-1">
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
      <div className="grid grid-cols-4 justify-around gap-2 p-2">
        {filteredCards?.map((card) => (
          <PkmnCard key={card._id} cardData={card} />
        ))}
      </div>
    </div>
  )
}
