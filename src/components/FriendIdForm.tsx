import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'

export const FriendIdForm = () => {
  const updateFriendId = useMutation(api.users.updateFriendId)
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="friend-id">FRIEND ID</Label>
      <Input id="friend-id" />
      <div className="flex items-center space-x-2">
        {/* TODO: This should be a controlled form so I can style & respond based on input state */}
        <Switch id="public-friend" />
        <Label htmlFor="public-friend">Public?</Label>
      </div>
      <button
        className="bg-stone-400 border text-sm h-8 transition-all hover:bg-stone-300 hover:-translate-0.5 px-2 hover:shadow-[4px_4px_0_0_#000] hover:shadow-black disabled:pointer-events-none disabled:opacity-50"
        disabled={true}
        onClick={(event) => {
          event.preventDefault()
          //   TODO
          updateFriendId({ isPublic: true, newId: '1234' })
        }}
      >
        Save
      </button>
    </div>
  )
}
