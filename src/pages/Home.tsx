import { PublicUserDirectory } from '@/components/PublicUserDirectory'
import { CardCatalog } from '../components/CardCatalog'

export const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 w-full gap-8">
      <PublicUserDirectory />
      <CardCatalog />
    </div>
  )
}
