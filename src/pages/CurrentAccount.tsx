import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { AddCardModal } from '../components/AddCardModal'
import { PkmnCard } from '../components/PkmnCard'

import { Button } from '@/components/ui/button'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useState } from 'react'
import { UserProfileForm } from '../components/UserProfileForm'

// TODO: Split account tabs into separate component files

export const CurrentAccount = () => {
  const wishlistCards = useQuery(api.cards.getListCardsForUser, {
    listType: 'wishlist',
  })
  const collectionCards = useQuery(api.cards.getListCardsForUser, {
    listType: 'collection',
  })
  const createCardList = useMutation(api.userCardLists.createUserCardlist)
  const currentUser = useQuery(api.users.getCurrentUser)

  const { signOut } = useAuthActions()

  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const userProfileFormSubmit = () => {
    setIsEditingProfile(false)
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-6xl">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="collection">Collection</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className=" flex flex-col p-4 ">
              <p className="text-xl font-heading">{`WELCOME ${currentUser?.username?.toUpperCase() || 'BACK!'}`}</p>
              <p className="text-md font-base text-foreground">{`FRIEND ID: ${currentUser?.friendId?.id || '---'}`}</p>
              {/* TODO: Edit Profile */}
              <div className="flex flex-col items-start gap-2 p-2">
                {isEditingProfile ? (
                  <UserProfileForm submitCb={userProfileFormSubmit} />
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
                <AddCardModal
                  listType="wishlist"
                  currentList={wishlistCards.map((c) => c._id)}
                />
                <div className="grid grid-cols-4 justify-around gap-2 p-2">
                  {wishlistCards.map((card) => {
                    return <PkmnCard cardData={card} key={card._id} />
                  })}
                </div>
              </>
            ) : (
              <Button onClick={() => createCardList({ listType: 'wishlist' })}>
                Create Wishlist
              </Button>
            )}
          </TabsContent>
          <TabsContent value="collection">
            <p className="font-heading text-2xl">MY COLLECTION</p>
            {collectionCards ? (
              <>
                <AddCardModal
                  listType="collection"
                  currentList={collectionCards.map((c) => c._id)}
                />
                <div className="grid grid-cols-4 justify-around gap-2 p-2">
                  {collectionCards.map((card) => {
                    return <PkmnCard cardData={card} key={card._id} />
                  })}
                </div>
              </>
            ) : (
              <Button
                onClick={() => createCardList({ listType: 'collection' })}
              >
                Create Collection
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
