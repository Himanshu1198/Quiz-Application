import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutBtn from './Header/LogoutBtn'
import { useEffect, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserLogo() {
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {}, [userData])
  return (
    <Menu as='div' className='relative inline-block text-right m-1'>
      <div>
        <MenuButton className='outline-none inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:ring-blue-900 dark:text-white'>
          {userData ? userData.name.substring(0, 5) : 'User'}...
          <span className='w-5 '>&#x25BE;</span>
        </MenuButton>
      </div>

      <Transition
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='font-semibold py-1 dark:bg-gray-900 dark:hover:bg-gray-800 dark:ring-blue-900 dark:text-white '>
            <MenuItem>
              {({ focus }) => (
                <Link
                  to='/create-quiz'
                  className={classNames(
                    focus
                      ? 'bg-gray-100 text-gray-900 dark:text-blue-800 dark:bg-gray-900'
                      : 'text-gray-700 dark:text-blue-800',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Create New Quiz
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  to={`/my-quiz`}
                  className={classNames(
                    focus
                      ? 'bg-gray-100 text-gray-900 dark:text-blue-800 dark:bg-gray-900'
                      : 'text-gray-700 dark:text-blue-800',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  My Quizzes
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  to={`my-stat/${userData.$id}`}
                  className={classNames(
                    focus
                      ? 'bg-gray-100 text-gray-900 dark:text-blue-800 dark:bg-gray-900'
                      : 'text-gray-700 dark:text-blue-800',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  My Stats
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  to={`my-stat/${userData.$id}`}
                  className={classNames(
                    focus
                      ? 'bg-gray-100 text-gray-900 dark:text-blue-800 dark:bg-gray-900'
                      : 'text-gray-700 dark:text-blue-800',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <LogoutBtn />
                </Link>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
