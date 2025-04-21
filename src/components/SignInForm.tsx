import { useAuthActions } from '@convex-dev/auth/react'
import { useState } from 'react'

export const SignInForm = () => {
  const { signIn } = useAuthActions()
  const [step, setStep] = useState<'signUp' | 'signIn'>('signIn')

  return (
    <form
      className="border-2 p-4 flex flex-col w-md items-center gap-2 shadow-[4px_4px_0_0_#000]"
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        void signIn('password', formData)
      }}
    >
      <h2 className="text-2xl">Sign in</h2>
      <input
        className="flex h-10 w-full border-2 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        name="email"
        placeholder="Email"
        type="text"
      />
      <input
        className="flex h-10 w-full border-2 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        name="password"
        placeholder="Password"
        type="password"
      />
      <input name="flow" type="hidden" value={step} />
      <button
        className="bg-stone-400 border text-sm h-8 transition-all hover:bg-stone-300 hover:-translate-0.5 px-2 hover:shadow-[4px_4px_0_0_#000] hover:shadow-black"
        type="submit"
      >
        {step === 'signIn' ? 'Sign in' : 'Sign up'}
      </button>
      <button
        className="text-sm h-8 hover:-translate-y-0.5 px-2 underline hover:underline-offset-[3px]"
        type="button"
        onClick={() => {
          setStep(step === 'signIn' ? 'signUp' : 'signIn')
        }}
      >
        {step === 'signIn' ? 'Sign up instead' : 'Sign in instead'}
      </button>
    </form>
  )
}
