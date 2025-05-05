import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { NavLink } from 'react-router'
import { api } from '../../convex/_generated/api'

export const PublicUserDirectory = (props: { className: string }) => {
  const { className } = props
  const userList = useQuery(api.users.getPublicUsers)

  return (
    <div className={cn(className, 'flex flex-col')}>
      <p className="font-heading text-3xl">PUBLIC USER DIRECTORY</p>
      {userList && (
        <div className="grid sm:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
          {userList.map((user) => {
            return (
              <Card key={user._id} className="">
                <CardHeader>
                  <CardTitle className="font-heading text-xl md:text-2xl text-center">
                    {user.username}
                  </CardTitle>
                </CardHeader>
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
