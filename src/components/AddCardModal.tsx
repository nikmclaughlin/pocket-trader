import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { CardSelector } from './CardSelector'
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
        <button className="border-2 border-dashed border-stone-500 text-stone-800 p-2 w-full max-w-48 h-60 bg-stone-200 transition-all hover:bg-stone-50 hover:-translate-1 px-2 hover:shadow-[4px_4px_0_0_#000] hover:shadow-black">
          + ADD A CARD
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between p-4">
            <DialogTitle>ADD TO YOUR WISHLIST</DialogTitle>
            <DialogClose
              className="bg-stone-400 border text-sm h-8 transition-all -translate-0.5 px-2 shadow-[4px_4px_0_0_#000] shadow-black hover:bg-stone-300 hover:translate-0 hover:shadow-none"
              onClick={() =>
                updateWishlistCards({ newWishlist: selectedCards })
              }
            >
              SAVE CHANGES
            </DialogClose>
          </div>
        </DialogHeader>
        <CardSelector cardState={selectedCards} cb={setSelectedCards} />
      </DialogContent>
    </Dialog>
  )
}
