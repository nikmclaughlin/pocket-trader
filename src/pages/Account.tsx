import { Authenticated, Unauthenticated, useQuery } from 'convex/react'
import { useParams } from 'react-router'
import { api } from '../../convex/_generated/api'
import { SignInForm } from '../components/SignInForm'
import { CurrentAccount } from './CurrentAccount'

export const Account = () => {
  const { accountId } = useParams()

  const currentUser = useQuery(api.users.currentUser)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Authenticated>
        {accountId === currentUser?._id ? (
          <CurrentAccount />
        ) : (
          <p>SOMEBODY ELSE'S ACCOUNT</p>
        )}
      </Authenticated>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </div>
  )
}
