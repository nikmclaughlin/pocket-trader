import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { AddCardModal } from '../components/AddCardModal'
import { Card } from '../components/Card'

// import { FriendIdForm } from '../components/FriendIdForm'

export const CurrentAccount = () => {
  const wishlistCards = useQuery(api.cards.getWishlistCardsForUser)
  const createWishlist = useMutation(api.wishlists.createWishlist)
  const { signOut } = useAuthActions()

  return (
    <>
      {/* <FriendIdForm /> */}
      <div className="flex flex-col w-full max-w-6xl">
        <p>MY WISHLIST</p>

        {wishlistCards ? (
          <>
            <AddCardModal />
            <div className="flex gap-2 w-full p-2">
              {wishlistCards.map((card) => {
                return <Card cardData={card} />
              })}
            </div>
          </>
        ) : (
          <button
            className="bg-stone-400 border text-sm h-8 transition-all -translate-0.5 px-2 shadow-[4px_4px_0_0_#000] shadow-black hover:bg-stone-300 hover:translate-0 hover:shadow-none"
            onClick={() => createWishlist()}
          >
            Create Wishlist
          </button>
        )}
      </div>

      <button
        className="bg-stone-400 border text-sm h-8 transition-all hover:bg-stone-300 hover:-translate-0.5 px-2 hover:shadow-[4px_4px_0_0_#000] hover:shadow-black"
        onClick={() => void signOut()}
      >
        Sign Out
      </button>
    </>
  )
}
