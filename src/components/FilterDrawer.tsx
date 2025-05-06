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
import { cardIdSets } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Multiselect } from './ui/multiselect'

const setList = Object.values(cardIdSets)

const setOptions = setList.map((setName) => {
  return {
    value: setName,
    label: setName,
  }
})

export const FilterDrawer = () => {
  const [currentSetFilter, setCurrentSetFilter] = useState(setOptions)

  const handleSetSelect = (selections: typeof setOptions) => {
    setCurrentSetFilter(selections)
  }

  useEffect(() => {
    // console.log(currentSetFilter)
  }, [currentSetFilter])

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Adjust Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Adjust Filters</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 text-sm">
          <h4 className="text-lg leading-none font-heading">Release Set</h4>
          <Multiselect options={setOptions} selectCb={handleSetSelect} />
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="neutral">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
