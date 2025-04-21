import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
