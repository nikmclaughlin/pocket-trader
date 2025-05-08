'use client'

import { CheckIcon, ChevronsUpDown } from 'lucide-react'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  //   CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export type MultiselectOption = {
  value: string
  label: string
  icon: string | undefined
}

export const Multiselect = ({
  options,
  selected,
  selectCb,
}: {
  options: MultiselectOption[]
  selected: MultiselectOption[]
  selectCb?: (options: MultiselectOption[]) => void
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedOptions, setSelectedOptions] =
    React.useState<MultiselectOption[]>(selected)

  const handleSelect = ({
    currentValue,
    currentOption,
  }: {
    currentValue: string
    currentOption: MultiselectOption
  }) => {
    const newOptions = selectedOptions.some((o) => o.value === currentValue)
      ? selectedOptions.filter((o) => o.value !== currentValue)
      : [...selectedOptions, currentOption]
    setSelectedOptions(newOptions)
    selectCb?.(newOptions)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          role="combobox"
          aria-expanded={open}
          className="w-fit max-w-full justify-between"
        >
          <div className="w-full overflow-hidden flex">
            {selectedOptions.length > 0
              ? selectedOptions.map((option) => option.label).join(', ')
              : 'Select options (multi-select)...'}
          </div>
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 border-0" align="start">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          {/* <CommandInput placeholder="Search options..." /> */}
          <div className="flex w-full">
            <Button
              variant="noShadow"
              className="grow"
              onClick={() => {
                const noOptions: MultiselectOption[] = []
                setSelectedOptions(noOptions)
                selectCb?.(noOptions)
              }}
            >
              None
            </Button>
            <Button
              variant="noShadow"
              className="grow"
              onClick={() => {
                const allOptions = options
                setSelectedOptions(allOptions)
                selectCb?.(allOptions)
              }}
            >
              All
            </Button>
          </div>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup className="p-2 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1 ">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    handleSelect({ currentValue, currentOption: option })
                  }}
                >
                  <div
                    className="border-border pointer-events-none size-5 shrink-0 rounded-base border-2 transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
                    data-selected={selectedOptions.some(
                      (o) => o.value === option.value
                    )}
                  >
                    <CheckIcon className="size-4 text-current" />
                  </div>
                  {option.icon && <img src={option.icon} className="h-4" />}

                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
