import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Card } from '../components/Card'

export const Home = () => {
  const cards = useQuery(api.cards.get)
  return (
    <>
      <div className="flex gap-2">
        {cards?.map((card) => <Card key={card._id} cardData={card} />)}
      </div>
    </>
  )
}
