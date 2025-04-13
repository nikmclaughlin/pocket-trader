import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { NavLink, Outlet, useLocation } from 'react-router'
import { api } from '../../convex/_generated/api'

export const NavBar = () => {
  const currentUser = useQuery(api.users.currentUser)
  const location = useLocation()
  const accountTarget = currentUser
    ? '/account/' + currentUser._id
    : '/account/sign-in'

  const components: { title: string; to: string; description: string }[] = [
    {
      title: 'Home',
      to: '/',
      description: 'The homepage of PocketTrader.',
    },
    {
      title: 'Account',
      to: accountTarget,
      description: 'The current users account page.',
    },
  ]

  return (
    <>
      <NavigationMenu className="z-5 w-full">
        <div className="w-full max-w-7xl px-4 flex justify-between">
          <div className="text-xl size-10 rounded-base flex bg-main hover:bg-background transition-all hover:animate-spin text-main-foreground border-2 border-black items-center justify-center font-heading">
            PT
          </div>
          <NavigationMenuList>
            {components.map((component) => {
              const isActive = component.to === location.pathname
              return (
                <NavigationMenuItem key={component.title}>
                  <NavLink to={component.to}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive &&
                          'bg-background transition-all duration-500 easing-out'
                      )}
                    >
                      {component.title}
                    </NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <Outlet />
    </>
  )
}
