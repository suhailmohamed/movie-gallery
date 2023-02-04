import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, ReactElement, useState } from 'react'
import ericHoffman from '../../assets/eric_hoffman.png'
import { IconClose } from '../icons/IconClose'
import { IconProps } from '../icons/IconProps'

interface NavigationLinks {
  icon?: (args: IconProps) => ReactElement
  name: string
  href: string
  current: boolean
}

export interface SidebarProps {
  openSidebar: boolean
  closeSidebar: () => unknown
  navigationLink: {
    links: NavigationLinks[]
  }[]
}

export const Sidebar: FC<SidebarProps> = ({
  openSidebar = false,
  closeSidebar,
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

                <div className="flex flex-shrink-0 flex-col items-center pt-[42px] pb-5 border-b border-[#394B61] space-y-[11px]">
                  <img
                    className="w-[91px] h-[91px]"
                    src={ericHoffman}
                    alt="Your Company"
                  />
                  <p className="text-[#D4D7DD] text-[20px] leading-[27px] font-semibold">Eric Hoffman</p>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto hide-scrollbar">
                  <nav className="flex-1 space-y-1">
                    {navigationLink.map((each, index) => {
                      return (
                        <ul 
                          key={index.toString()}
                          className="pl-[3.25rem] pt-[13px] pb-[12px] text-[15px] leading-[37px] font-semibold border-b border-[#394B61] last:border-b-0"
                        >
                          {each.links.map((link, index) => {
                            return (
                              <li key={index.toString()}>
                                <a 
                                  href={link.href}
                                  className={`relative group flex items-center gap-[14px] transition-colors
                                    ${link.current ? ' text-[#00E0FF] after:content-[""] after:absolute after:right-0 after:w-1 after:h-full after:bg-[#00E0FF]' : ' text-[#D4D7DD] hover:text-[#D4D7DD]/80'}
                                  `}
                                >
                                  {link.icon && (
                                    <link.icon
                                      className={`${link.current ? 'text-[#00E0FF]' : 'text-[#D4D7DD] group-hover:text-[#D4D7DD]/80'} flex-shrink-0 h-4 w-4 transition-colors`}
                                      aria-hidden="true"
                                    />
                                  )}

                                  {link.name}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      )
                    })}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Mobile View Ends Here */}

      <div className="hidden lg:flex min-h-0 flex-1 flex-col bg-[#1F2A3C]">
        <div className="flex flex-shrink-0 flex-col items-center pt-[42px] pb-5 border-b border-[#394B61] space-y-[11px]">
          <img
            className="w-[91px] h-[91px]"
            src={ericHoffman}
            alt="Your Company"
          />
          <p className="text-[#D4D7DD] text-[20px] leading-[27px] font-semibold">Eric Hoffman</p>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto hide-scrollbar">
          <nav className="flex-1 space-y-1">
            {navigationLink.map((each, index) => {
              return (
                <ul 
                  key={index.toString()}
                  className="pl-[3.25rem] pt-[13px] pb-[12px] text-[15px] leading-[37px] font-semibold border-b border-[#394B61] last:border-b-0"
                >
                  {each.links.map((link, index) => {
                    return (
                      <li key={index.toString()}>
                        <a 
                          href={link.href}
                          className={`relative group flex items-center gap-[14px] transition-colors
                            ${link.current ? ' text-[#00E0FF] after:content-[""] after:absolute after:right-0 after:w-1 after:h-full after:bg-[#00E0FF]' : ' text-[#D4D7DD] hover:text-[#D4D7DD]/80'}
                          `}
                        >
                          {link.icon && (
                            <link.icon
                              className={`${link.current ? 'text-[#00E0FF]' : 'text-[#D4D7DD] group-hover:text-[#D4D7DD]/80'} flex-shrink-0 h-4 w-4 transition-colors`}
                              aria-hidden="true"
                            />
                          )}

                          {link.name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
