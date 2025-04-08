import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { AddCardModal } from '../components/AddCardModal'
import { Card } from '../components/Card'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { FriendIdForm } from '../components/FriendIdForm'

export const CurrentAccount = () => {
  const wishlistCards = useQuery(api.cards.getWishlistCardsForUser)
  const createWishlist = useMutation(api.wishlists.createWishlist)
  const currentUser = useQuery(api.users.currentUser)

  const { signOut } = useAuthActions()

  const [isEditingProfile, setIsEditingProfile] = useState(false)

  return (
    <>
      <div className="flex flex-col w-full max-w-6xl">
        {/* <FriendIdForm /> */}
        <div className="self-end flex flex-col items-end p-4 border-4 border-double rounded transition-all">
          <p className="text-xl text-right">{`WELCOME ${currentUser?.name?.toUpperCase() || 'BACK!'}`}</p>
          <p className="text-md text-right text-stone-700">{`FRIEND ID: ${currentUser?.friendId || '---'}`}</p>
          {/* TODO: Edit Profile */}
          {isEditingProfile && <FriendIdForm />}
          <div className="flex gap-2 p-2">
            {isEditingProfile ? (
              <Button onClick={() => setIsEditingProfile(false)}>
                Save Changes
              </Button>
            ) : (
              <Button
                variant="reverse"
                onClick={() => setIsEditingProfile(true)}
              >
                Edit Profile
              </Button>
            )}

            <Button variant="reverse" onClick={() => void signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
        <p className="font-heading text-2xl">MY WISHLIST</p>

        {wishlistCards ? (
          <>
            <AddCardModal />
            <div className="flex gap-2 w-full p-2">
              {wishlistCards.map((card) => {
                return <Card cardData={card} key={card._id} />
              })}
            </div>
          </>
        ) : (
          <Button onClick={() => createWishlist()}>Create Wishlist</Button>
        )}
      </div>
    </>
  )
}
