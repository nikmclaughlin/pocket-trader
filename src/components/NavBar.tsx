import clsx from 'clsx'
import { useQuery } from 'convex/react'
import { NavLink, Outlet } from 'react-router'
import { api } from '../../convex/_generated/api'

export const NavBar = () => {
  const currentUser = useQuery(api.users.currentUser)

  const accountTarget = currentUser ? '/account/' + currentUser._id : '/account'

  return (
    <>
      <nav className="flex p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              'border p-2 text-xl',
              isActive ? 'bg-stone-300' : 'bg-stone-400'
            )
          }
        >
          Home
        </NavLink>
        <NavLink
          to={accountTarget}
          className={({ isActive }) =>
            clsx(
              'border p-2 text-xl',
              isActive ? 'bg-stone-300' : 'bg-stone-400'
            )
          }
        >
          Account
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}
