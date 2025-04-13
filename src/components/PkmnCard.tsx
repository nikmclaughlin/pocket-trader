import { Doc } from '../../convex/_generated/dataModel'

export const PkmnCard = (params: { cardData: Doc<'cards'> }) => {
  const cardData = params.cardData

  return (
    <div className="border-2 rounded p-2 max-w-80 flex flex-col items-center font-base text-foreground h-min">
      <div className="flex w-full justify-center items-center p-2">
        <h2 className="text-2xl font-heading text-center">{cardData.name}</h2>
      </div>
      <p className="text-md">Set: {cardData.set}</p>
      <p className="text-center text-sm">Card ID: {cardData.cardNo}</p>
    </div>
  )
}
