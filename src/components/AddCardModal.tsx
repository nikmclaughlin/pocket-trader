import { useMutation } from 'convex/react'
import { CardListType } from 'convex/userCardLists'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { CardSelector } from './CardSelector'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export const AddCardModal = (params: {
  listType: CardListType
  currentList: Id<'cards'>[]
}) => {
  const { listType, currentList } = params
  const [selectedCards, setSelectedCards] = useState<Id<'cards'>[]>(currentList)

  const updateListCards = useMutation(api.userCardLists.updateListCards)

  const listName = listType.toString().toUpperCase()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-max">EDIT {listName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="w-5/6">
          <div className="flex justify-between p-4">
            <DialogTitle>ADD TO YOUR {listName}</DialogTitle>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  updateListCards({
                    newCards: selectedCards,
                    listType: listType,
                  })
                }
              >
                SAVE CHANGES
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="h-[80vh] w-5/6">
          <CardSelector cardState={selectedCards} cb={setSelectedCards} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
