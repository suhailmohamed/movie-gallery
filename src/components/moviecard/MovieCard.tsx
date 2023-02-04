import { FC, ReactElement } from 'react'
import { IconPlay } from '../icons/IconPlay'
import { IconPlus } from '../icons/IconPlus'
import { IconProps } from '../icons/IconProps'

interface NavigationLinks {
  icon?: (args: IconProps) => ReactElement
  name: string
  href: string
  current: boolean
}

export interface MovieCardProps {
  name: string
  poster: string
}

export const MovieCard: FC<MovieCardProps> = ({
  name,
  poster
}: MovieCardProps) => {
  return (
    <div className="group w-full bg-[#394B61] flex flex-col p-2.5 pb-4 space-y-3 rounded-xl cursor-pointer">
      <div className="h-[188px] overflow-hidden rounded-md">
        <img 
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-500 cursor-pointer" 
          src={poster}
          alt={name}
        />
      </div>
      
      <p className="text-[#D4D7DD] text-[15px] leading-5 font-semibold">
        {name}
      </p>

      <ul className="flex items-center gap-4">
        <li><IconPlay className="w-5 h-5 text-[#D4D7DD]" /></li>
        <li><IconPlus className="w-5 h-5 text-[#D4D7DD]" /></li>
      </ul>
    </div>
  )
}
