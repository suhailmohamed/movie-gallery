import { FC, ReactElement, useState } from 'react'
import ericHoffman from '../../assets/eric_hoffman.png'
import { IconProps } from '../icons/IconProps'

interface NavigationLinks {
  icon?: (args: IconProps) => ReactElement
  name: string
  href: string
  current: boolean
}

export interface SidebarProps {
  navigationLink: {
    links: NavigationLinks[]
  }[]
}

export const Sidebar: FC<SidebarProps> = ({
  navigationLink
}: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#1F2A3C]">
      <div className="flex flex-shrink-0 flex-col items-center pt-[42px] pb-5 border-b border-[#394B61] space-y-[11px]">
        <img
          className="w-[91px] h-[91px]"
          src={ericHoffman}
          alt="Your Company"
        />
        <p className="text-[#D4D7DD] text-[20px] leading-[27px] font-semibold">Eric Hoffman</p>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
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
  )
}
