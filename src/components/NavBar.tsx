import clsx from 'clsx'
import { NavLink, Outlet } from 'react-router'

export const NavBar = () => {
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
          to="/account"
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
