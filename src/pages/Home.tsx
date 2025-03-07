import { useQuery } from 'convex/react'
import { NavLink } from 'react-router'
import { api } from '../../convex/_generated/api'
import { Card } from '../components/Card'

export const Home = () => {
  const cards = useQuery(api.cards.get)
  return (
    <>
      <nav className="flex p-4">
        <NavLink to="/account" className="border p-2 bg-stone-400 text-xl">
          Account
        </NavLink>
      </nav>
      <div className="flex gap-2">
        {cards?.map((card) => <Card cardData={card} />)}
      </div>
    </>
  )
}
