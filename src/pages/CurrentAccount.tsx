import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { AddCardModal } from '../components/AddCardModal'
import { Card } from '../components/Card'

// import { FriendIdForm } from '../components/FriendIdForm'

export const CurrentAccount = () => {
  const wishlistCards = useQuery(api.cards.getWishlistCardsForUser)
  const createWishlist = useMutation(api.wishlists.createWishlist)
  const currentUser = useQuery(api.users.currentUser)

  const { signOut } = useAuthActions()

  return (
    <>
      <div className="flex flex-col w-full max-w-6xl">
        {/* TODO: <FriendIdForm /> */}
        <div className=" absolute self-end flex flex-col items-end p-4 border-4 border-double rounded">
          <p className="text-xl text-right">{`WELCOME ${currentUser?.name?.toUpperCase() || 'BACK!'}`}</p>
          {/* TODO: Edit Profile */}
          <button
            className="bg-stone-400 border text-sm h-8 transition-all hover:bg-stone-300 hover:-translate-0.5 px-2 hover:shadow-[4px_4px_0_0_#000] hover:shadow-black"
            onClick={() => void signOut()}
          >
            Sign Out
          </button>
        </div>
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
    </>
  )
}
