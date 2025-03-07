import { useQuery } from 'convex/react'
import { NavLink } from 'react-router'
import { api } from '../../convex/_generated/api'
import { Card } from '../components/Card'

export const Home = () => {
  const cards = useQuery(api.cards.get)
  return (
    <>
      <nav>
        <NavLink to="/account">Account</NavLink>
      </nav>
      <div>{cards?.map((card) => <Card cardData={card} />)}</div>
    </>
  )
}
