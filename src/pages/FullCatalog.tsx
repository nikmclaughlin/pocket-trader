import { CardCatalog } from '@/components/CardCatalog'

export const FullCatalog = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 w-full gap-8">
      <CardCatalog className="w-dvw max-w-7xl px-4 bg-background" />
    </div>
  )
}
