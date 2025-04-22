'use client'
import { useAuthActions } from '@convex-dev/auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader } from './ui/card'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Passwords must be at least 8 characters long'),
  step: z.union([z.literal('signIn'), z.literal('signUp')]),
})

export const SignInForm = () => {
  const { signIn } = useAuthActions()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      step: 'signIn',
    },
  })
  const [step, setStep] = useState<'signUp' | 'signIn'>('signIn')

  function onSubmit(values: z.infer<typeof formSchema>) {
    void signIn('password', { ...values, flow: step, redirectTo: '/' })
  }

  return (
    <Card className="w-1/2 p-10 flex flex-col items-center">
      <CardHeader className="font-heading text-2xl w-1/2 text-center">
        <p>{step === 'signIn' ? 'Sign in' : 'Create Account'}</p>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bill@cerulean.net"
                    className="w-80"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*****"
                    type="password"
                    className="w-80"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {step === 'signIn' ? 'Sign in' : 'Create Account'}
          </Button>
          <button
            className="text-sm h-8 hover:-translate-y-0.5 px-2 underline hover:underline-offset-[3px]"
            type="button"
            onClick={() => {
              setStep(step === 'signIn' ? 'signUp' : 'signIn')
            }}
          >
            {step === 'signIn' ? 'Create account instead' : 'Sign in instead'}
          </button>
        </form>
      </Form>
    </Card>
  )
}
