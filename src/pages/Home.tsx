import { PublicUserDirectory } from '@/components/PublicUserDirectory'
import { Authenticated } from 'convex/react'
import { CardCatalog } from '../components/CardCatalog'

export const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 w-full gap-8">
      <Authenticated>
        <PublicUserDirectory className="w-dvw max-w-4xl px-4" />
      </Authenticated>
      <CardCatalog className="w-dvw px-4" />
    </div>
  )
}
