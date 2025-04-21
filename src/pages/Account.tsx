import { OtherPlayerAccount } from '@/components/OtherPlayerAccount'
import { Authenticated, Unauthenticated, useQuery } from 'convex/react'
import { useParams } from 'react-router'
import { api } from '../../convex/_generated/api'
import { SignInForm } from '../components/SignInForm'
import { CurrentAccount } from './CurrentAccount'

export const Account = () => {
  const { accountId } = useParams()

  const currentUser = useQuery(api.users.currentUser)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 w-full">
      <Authenticated>
        {accountId === currentUser?._id ? (
          <CurrentAccount />
        ) : (
          <OtherPlayerAccount />
        )}
      </Authenticated>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </div>
  )
}
