import { Doc } from '../../convex/_generated/dataModel'

export const Card = (params: { cardData: Doc<'cards'> }) => {
  const cardData = params.cardData

  return (
    <div className="border-2 rounded p-2 max-w-80 flex flex-col items-center font-base text-foreground">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-heading">{cardData.name}</h2>
        <p className="text-center text-sm">Card ID: {cardData.cardNo}</p>
      </div>
      <img
        className="w-80 h-80"
        src={cardData.image.length ? cardData.image : null}
      />
      <div className="flex w-full justify-between text-sm">
        <p>Illus: {cardData.artist}</p>
        <p>Set: {cardData.set}</p>
      </div>
      {/* <div className="border rounded p-2 bg-stone-200">
        <p className="text-xl ">{cardData.description}</p>
      </div> */}
      <div className="border rounded p-2 bg-secondary-background h-32">
        <p className="italic">{cardData.flavor}</p>
      </div>
      <div className="flex w-full justify-end">
        <p className="text-sm">Rarity: {cardData.rarity}</p>
      </div>
    </div>
  )
}
