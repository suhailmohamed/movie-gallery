import { Dialog, Transition } from '@headlessui/react'
import { ComponentProps, FC, Fragment } from 'react'
import { IconClose } from '../icons/IconClose'
import { NavigationMenuList } from './NavigationMenuList'
import { UserDetail } from './UserDetail'

export interface SidebarProps {
  openSidebar: boolean
  closeSidebar: () => unknown
  userDetails:  ComponentProps<typeof UserDetail>
  navigationLink: ComponentProps<typeof NavigationMenuList>['navigationLink']
}

export const Sidebar: FC<SidebarProps> = ({
  openSidebar = false,
  closeSidebar,
  userDetails,
  navigationLink
}: SidebarProps) => {
  return (
    <>
      {/* Mobile View Starts Here */}
      <Transition.Root show={openSidebar} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={closeSidebar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#1F2A3C]">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-2 -right-12">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={closeSidebar}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <IconClose className="h-4 w-4 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                <UserDetail 
                  avatar={userDetails.avatar}
                  name={userDetails.name}
                />

                <NavigationMenuList navigationLink={navigationLink} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Mobile View Ends Here */}

      <div className="hidden lg:flex min-h-0 flex-1 flex-col bg-[#1F2A3C]">
        <UserDetail 
          avatar={userDetails.avatar}
          name={userDetails.name}
        />

        <NavigationMenuList navigationLink={navigationLink}/>
      </div>
    </>
  )
}
