import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { AddCardModal } from '../components/AddCardModal'
import { Card } from '../components/Card'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className=" flex flex-col p-4 ">
              <p className="text-xl font-heading">{`WELCOME ${currentUser?.name?.toUpperCase() || 'BACK!'}`}</p>
              <p className="text-md font-base text-foreground">{`FRIEND ID: ${currentUser?.friendId || '---'}`}</p>
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
          </TabsContent>
          <TabsContent value="wishlist">
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
