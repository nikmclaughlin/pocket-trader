import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from 'convex/react'
import { useParams } from 'react-router'
import { api } from '../../convex/_generated/api'
import { PkmnCard } from './PkmnCard'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Id } from 'convex/_generated/dataModel'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export const OtherPlayerAccount = () => {
  const routerParams = useParams()
  const targetId = routerParams.accountId as Id<'users'>
  const targetUser = useQuery(api.users.getUserById, { userId: targetId })
  const collectionCards = useQuery(api.cards.getListCardsForUser, {
    listType: 'collection',
    user: targetId,
  })
  const wishlistCards = useQuery(api.cards.getListCardsForUser, {
    listType: 'wishlist',
    user: targetId,
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{targetUser?.username} PROFILE</CardTitle>
        </CardHeader>
        <CardContent>
          {targetUser?.friendId?.isPublic && (
            <p>FRIEND ID: {targetUser.friendId.id}</p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="collection">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="collection">
          <p className="font-heading text-2xl">COLLECTION</p>
          {collectionCards ? (
            <>
              <div className="grid grid-cols-4 justify-around gap-2 p-2">
                {collectionCards.map((card) => {
                  return <PkmnCard cardData={card} key={card._id} />
                })}
              </div>
            </>
          ) : (
            <Alert>
              <AlertTitle>No Collection Found</AlertTitle>
              <AlertDescription>
                This user hasn't created a collection or it's empty.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        <TabsContent value="wishlist">
          <p className="font-heading text-2xl">WISHLIST</p>
          {wishlistCards ? (
            <>
              <div className="grid grid-cols-4 justify-around gap-2 p-2">
                {wishlistCards.map((card) => {
                  return <PkmnCard cardData={card} key={card._id} />
                })}
              </div>
            </>
          ) : (
            <Alert>
              <AlertTitle>No Wishlist Found</AlertTitle>
              <AlertDescription>
                This user hasn't created a wishlist or it's empty.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
