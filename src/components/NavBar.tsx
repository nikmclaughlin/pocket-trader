import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { useQuery } from 'convex/react'
import { NavLink, Outlet } from 'react-router'
import { api } from '../../convex/_generated/api'

export const NavBar = () => {
  const currentUser = useQuery(api.users.currentUser)
  const accountTarget = currentUser
    ? '/account/' + currentUser._id
    : '/account/sign-in'

  const components: { title: string; to: string; description: string }[] = [
    {
      title: 'Home',
      to: '/',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Account',
      to: accountTarget,
      description:
        'For sighted users to preview content available behind a link.',
    },
  ]

  return (
    <>
      <NavigationMenu className="z-5 w-full justify-between">
        <div className="text-xl size-10 rounded-base flex bg-main hover:bg-background transition-colors text-main-foreground border-2 border-black items-center justify-center font-heading">
          PT
        </div>
        <NavigationMenuList>
          {components.map((component) => {
            return (
              <NavigationMenuItem>
                <NavLink to={component.to}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {component.title}
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <Outlet />
    </>
  )
}
