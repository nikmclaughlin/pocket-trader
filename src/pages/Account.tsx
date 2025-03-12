import { useAuthActions } from '@convex-dev/auth/react'
import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInForm } from '../components/SignInForm'

export const Account = () => {
  const { signOut } = useAuthActions()

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Authenticated>
        <div>MY WISHLIST</div>
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
