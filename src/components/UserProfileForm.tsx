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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const UserProfileForm = (params: { submitCb: () => void }) => {
  const { submitCb } = params
  const userData = useQuery(api.users.getCurrentUser)
  const updateUserData = useMutation(api.users.updateUser)

  const formSchema = z
    .object({
      username: z.string().min(4, {
        message: 'Username must be at least 4 characters.',
      }),
      friendId: z
        .object({
          id: z.string(),
          isPublic: z.boolean(),
        })
        .optional(),
      isAnonymous: z.boolean(),
    })
    .partial()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userData ? userData.username : '',
      friendId: userData ? userData.friendId : { id: '', isPublic: false },
      isAnonymous: userData ? userData.isAnonymous : true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
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
          <Button
            variant={'reverse'}
            className="w-2 h-2 self-end absolute"
            onClick={() => submitCb()}
          >
            X
          </Button>
          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-3 items-center">
                  <FormLabel>Public account?</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onChange={field.onChange} />
                  </FormControl>
                </div>
                <FormDescription>
                  Activate to have your account and lists visible to other
                  traders
                </FormDescription>
              </FormItem>
            )}
          />
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
          <div className="flex gap-3 items-between">
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
              render={({ field }) => (
                <FormItem>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FormLabel>Visible?</FormLabel>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Activate to allow others to see your Friend ID on your
                          profile
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <FormControl>
                    <div className="h-10">
                      <Switch checked={field.value} onChange={field.onChange} />
                    </div>
                  </FormControl>

                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
