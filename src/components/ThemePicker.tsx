import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ThemeType } from '@/context/ThemeProviderContext'
import { useTheme } from '@/lib/hooks/useTheme'
import {
  //   BoltIcon,
  //   CrownIcon,
  DropletIcon,
  //   EclipseIcon,
  //   EyeIcon,
  FlameIcon,
  LeafIcon,
  //   HandIcon,
  //   SparkleIcon,
  ZapIcon,
} from 'lucide-react'

const themeIconMap = {
  fire: <FlameIcon />,
  water: <DropletIcon />,
  lightning: <ZapIcon />,
  grass: <LeafIcon />,
  //   psychic: <EyeIcon />,
  //   fighting: <HandIcon />,
  //   darkness: <EclipseIcon />,
  //   metal: <BoltIcon />,
  //   dragon: <CrownIcon />,
  //   colorless: <SparkleIcon />,
}

export const ThemePicker = () => {
  const { theme, setTheme } = useTheme()

  const themeItemOptions = Object.entries(themeIconMap)

  return (
    <Select onValueChange={(v: ThemeType) => setTheme(v)}>
      <SelectTrigger className="w-18 border-none">
        <SelectValue placeholder={<>{themeIconMap[theme]}</>} />
      </SelectTrigger>
      <SelectContent>
        {themeItemOptions.map(([themeKey, themeIcon]) => (
          <SelectItem key={themeKey} value={themeKey}>
            {themeIcon}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
