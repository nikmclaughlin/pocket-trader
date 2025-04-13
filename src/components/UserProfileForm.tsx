import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Switch } from './ui/switch'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const UserProfileForm = (params: { submitCb: () => void }) => {
  const { submitCb } = params
  const userData = useQuery(api.users.getCurrentUser)
  const updateUserData = useMutation(api.users.updateUser)

  const formSchema = z
    .object({
      username: z.string().min(4, {
        message: 'Username must be at least 4 characters.',
      }),
      friendId: z.object({ id: z.string(), isPublic: z.boolean() }).optional(),
      isAnonymous: z.boolean(),
    })
    .partial()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userData?.name || '',
      friendId: userData?.friendId || { id: '', isPublic: false },
      isAnonymous: userData?.isAnonymous || true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    updateUserData({ user: values })
    submitCb()
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name on PocketTrader
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="friendId.id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Friend ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Your PTCGP Friend ID</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="friendId.isPublic"
            render={({ field }) => {
              console.log({ field })
              return (
                <FormItem>
                  <FormLabel>Public?</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Activate to allow others to see your Friend ID on your
                    profile
                  </FormDescription>
                </FormItem>
              )
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
