import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ValueOf<T> = T[keyof T]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cardIdSets = {
  tcgpa1: 'Genetic Apex',
  tcgppa: 'Promo-A',
  tcgpa1a: 'Mythical Island',
  tcgpa2: 'Space-Time Smackdown',
  tcgpa2a: 'Triumphant Light',
  tcgpa2b: 'Shining Revelry',
}

export const cardRarities = {
  Common: 'One Diamond',
  Uncommon: 'Two Diamond',
  Rare: 'Three Diamond',
  'Rare Double': 'Four Diamond',
  'Rare Illustration': 'One Star',
  'Rare Super': 'Two Star',
  'Rare Special Illustration': 'Two Star',
  Immersive: 'Three Star',
  'Rare Shiny': 'One Shiny',
  'Rare Super Shiny': 'Two Shiny',
  'Rare Ultra': 'Crown',
  Promo: 'Promo',
}

export const hasOverflow = (
  el: HTMLDivElement | null,
  acceptableOverflowMargin?: number
) => {
  if (!el) return false
  return (
    el.scrollHeight > el.clientHeight + (acceptableOverflowMargin || 0) ||
    el.scrollWidth > el.clientWidth + (acceptableOverflowMargin || 0)
  )
}

export const sanitizeFileName = (name: string) => {
  return name.toLowerCase().replace(' ', '').replace('-', '')
}
