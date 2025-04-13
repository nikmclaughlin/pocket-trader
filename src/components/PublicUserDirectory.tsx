import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

// import { PkmnCard } from '@/components/PkmnCard'
import { Button } from '@/components/ui/button'
import {
  Card,
  //   CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { NavLink } from 'react-router'

export const PublicUserDirectory = () => {
  const userList = useQuery(api.users.getPublicUsers)
  //   const wishlists = useQuery(api.userCardLists.getListsOfTypeForUsers, {
  //     listType: 'wishlist',
  //     users: userList?.map((user) => user._id) || [],
  //   })

  return (
    <div className="flex flex-col w-full max-w-4xl">
      <p className="font-heading text-3xl">PUBLIC USER DIRECTORY</p>
      {userList && (
        <div className="grid grid-cols-4 gap-2">
          {userList.map((user) => {
            //   const userWishlist = wishlists?.filter(
            //     (list) => list.userId === user._id
            //   )[0]
            return (
              <Card key={user._id} className="w-full max-w-60">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-center">
                    {user.username}
                  </CardTitle>
                </CardHeader>
                {/* <CardContent>
                  {userWishlist?.cards.map((card) => {
                  return <PkmnCard cardData={card} key={card._id} />
                  })}
                </CardContent> */}
                <CardFooter className="flex-col gap-2">
                  <Button asChild>
                    <NavLink to={`/account/${user._id}`}>View Profile</NavLink>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
