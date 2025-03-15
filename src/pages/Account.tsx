import { useAuthActions } from '@convex-dev/auth/react'
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Card } from '../components/Card'
import { SignInForm } from '../components/SignInForm'

export const Account = () => {
  const { signOut } = useAuthActions()

  const wishlistCards = useQuery(api.cards.getWishlistCardsForUser)
  const createWishlist = useMutation(api.wishlists.createWishlist)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Authenticated>
        <div>FRIEND ID</div>
        <div className="flex flex-col w-full max-w-6xl">
          <p>MY WISHLIST</p>

          {wishlistCards ? (
            <div className="flex gap-2 w-full p-2">
              {wishlistCards.map((card) => {
                return <Card cardData={card} />
              })}
              <button className="border-2 border-dashed border-stone-500 text-stone-800 p-2 w-full max-w-48 h-60 bg-stone-200 transition-all hover:bg-stone-50 hover:-translate-1 px-2 hover:shadow-[4px_4px_0_0_#000] hover:shadow-black">
                + ADD A CARD
              </button>
            </div>
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
      </Authenticated>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </div>
  )
}
