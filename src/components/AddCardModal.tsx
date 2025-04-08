import { useMutation } from 'convex/react'
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
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

export const AddCardModal = () => {
  const [selectedCards, setSelectedCards] = useState<Id<'cards'>[]>([])

  const updateWishlistCards = useMutation(api.wishlists.updateWishlistCards)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-max">EDIT WISHLIST</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between p-4">
            <DialogTitle>ADD TO YOUR WISHLIST</DialogTitle>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  updateWishlistCards({ newWishlist: selectedCards })
                }
              >
                SAVE CHANGES
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <CardSelector cardState={selectedCards} cb={setSelectedCards} />
      </DialogContent>
    </Dialog>
  )
}
