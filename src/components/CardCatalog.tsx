import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Card } from './Card'

export const CardCatalog = () => {
  const cards = useQuery(api.cards.list)
  return (
    <>
      <p className="font-heading text-3xl">CARD CATALOG</p>
      <div className="flex gap-2 p-2">
        {cards?.map((card) => <Card key={card._id} cardData={card} />)}
      </div>
    </>
  )
}
