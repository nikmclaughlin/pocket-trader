export type CardData = {
  artist: string
  cardNo: string
  category: string
  description: string
  flavor: string
  image: string
  name: string
  rarity: string
  set: string
}

export const Card = (params: { cardData: CardData }) => {
  const cardData = params.cardData

  return (
    <div>
      <h2>{cardData.name}</h2>
      <p>{cardData.description}</p>
      <p>{cardData.flavor}</p>
      <p>{cardData.rarity}</p>
      <p>{cardData.set}</p>
    </div>
  )
}
