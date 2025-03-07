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
    <div className="border-2 rounded p-2 max-w-sm">
      <h2 className="text-2xl font-bold text-center">{cardData.name}</h2>
      <p className="text-center text-sm text-stone-600">
        Card ID: {cardData.cardNo}
      </p>
      <div className="flex justify-between">
        <p>Illus: {cardData.artist}</p>
        <p>Set: {cardData.set}</p>
      </div>
      {/* <div className="border rounded p-2 bg-stone-200">
        <p className="text-xl ">{cardData.description}</p>
      </div> */}
      <div className="border rounded p-2 bg-stone-200 h-22">
        <p className="italic">{cardData.flavor}</p>
      </div>
      <div className="flex justify-end">
        <p>Rarity: {cardData.rarity}</p>
      </div>
    </div>
  )
}
