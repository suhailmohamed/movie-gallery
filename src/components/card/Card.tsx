import { FC } from 'react'
import { IconPlay } from '../icons/IconPlay'
import { IconPlus } from '../icons/IconPlus'

export interface CardProps {
  title: string
  poster: string
  onClick: () => unknown
}

export const Card: FC<CardProps> = ({
  title,
  poster,
  onClick
}: CardProps) => {
  return (
    <div 
      className="group w-full bg-[#394B61] flex flex-col p-2.5 pb-4 space-y-3 rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="h-[188px] overflow-hidden rounded-md">
        <img 
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-500 cursor-pointer" 
          src={poster}
          alt={title}
        />
      </div>
      
      <p className="text-[#D4D7DD] text-[15px] leading-5 font-semibold">
        {title}
      </p>

      <ul className="flex items-center gap-4">
        <li><IconPlay className="w-5 h-5 text-[#D4D7DD]" /></li>
        <li><IconPlus className="w-5 h-5 text-[#D4D7DD]" /></li>
      </ul>
    </div>
  )
}
