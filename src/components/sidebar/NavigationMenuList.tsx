import { FC, ReactElement } from 'react'
import { IconProps } from '../icons/IconProps'

interface NavigationLinks {
    icon?: (args: IconProps) => ReactElement
    name: string
    href: string
    current: boolean
}

export interface NavigationMenuListProps {
    navigationLink: {
        links: NavigationLinks[]
    }[]
}

export const NavigationMenuList: FC<NavigationMenuListProps> = ({
    navigationLink
}: NavigationMenuListProps) => (
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
)
