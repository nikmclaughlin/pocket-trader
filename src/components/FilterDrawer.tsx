import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  cardIdSets,
  cardRarities,
  sanitizeFileName,
  ValueOf,
} from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from 'convex/schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/form'
import { Multiselect } from './ui/multiselect'

export type FilterRule = {
  factor: keyof Card
  values: string[]
}

const setOptions = Object.keys(cardIdSets).map((setId) => {
  const setName = cardIdSets[setId as keyof typeof cardIdSets]
  const setIcon = setName
    ? `/set_logos/${sanitizeFileName(setName)}.png`
    : undefined
  return {
    value: setName,
    label: setName,
    icon: setIcon,
  }
})

const rarityOptions = Object.keys(cardRarities).map((rarity) => {
  const rarityIcon =
    rarity === 'Promo'
      ? undefined
      : `/rarities/${sanitizeFileName(cardRarities[rarity as keyof typeof cardRarities])}.png`
  return {
    value: rarity,
    label: rarity,
    icon: rarityIcon,
  }
})

const getSetIdByName = (setName: ValueOf<typeof cardIdSets>) => {
  const keys = Object.keys(cardIdSets)
  const setIdKey = keys.find(
    (key) => cardIdSets[key as keyof typeof cardIdSets] === setName
  )
  return setIdKey
}

export const FilterDrawer = (props: {
  submitCb: (filters: FilterRule[]) => void
}) => {
  const { submitCb } = props
  const [currentSetFilter, setCurrentSetFilter] = useState(setOptions)
  const [currentRarityFilter, setCurrentRarityFilter] = useState(rarityOptions)

  const handleSetSelect = (selections: typeof setOptions) => {
    setCurrentSetFilter(selections)
  }

  const handleRaritySelect = (selections: typeof rarityOptions) => {
    setCurrentRarityFilter(selections)
  }

  const multiselectOptionSchema = z.object({
    value: z.string(),
    label: z.string(),
    icon: z.union([z.string(), z.undefined()]),
  })

  const formSchema = z
    .object({
      set: multiselectOptionSchema,
      rarity: multiselectOptionSchema,
    })
    .partial()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = () => {
    const setIds: string[] = []
    currentSetFilter.map((set) => {
      const setId = getSetIdByName(set.value)
      if (setId) setIds.push(setId)
    })
    const rarityValues = currentRarityFilter.map((r) => r.value)

    submitCb([
      { factor: 'id', values: setIds },
      { factor: 'rarity', values: rarityValues },
    ])
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Adjust Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Adjust Filters</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <div className="overflow-y-auto px-4 text-sm flex flex-col gap-2">
              <h4 className="text-lg leading-none font-heading">Release Set</h4>
              <Multiselect
                options={setOptions}
                selected={currentSetFilter || []}
                selectCb={handleSetSelect}
              />
            </div>
            <div className="overflow-y-auto px-4 text-sm flex flex-col gap-2">
              <h4 className="text-lg leading-none font-heading">Rarity</h4>
              <Multiselect
                options={rarityOptions}
                selected={currentRarityFilter || []}
                selectCb={handleRaritySelect}
              />
            </div>
          </form>
        </Form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleSubmit}>Submit</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="neutral">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
