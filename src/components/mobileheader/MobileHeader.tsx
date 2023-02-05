import type { FC } from 'react'
import { IconBar } from '../icons/IconBar'
import { IconDayMode } from '../icons/IconDayMode'
import { IconDotsVertical } from '../icons/IconDotsVertical'

export interface MobileHeaderProps {
  openSidebar: () => unknown
  onClickDayModeIcon: () => unknown
  onClickDotsVerticalIcon: () => unknown
}

export const MobileHeader: FC<MobileHeaderProps> = ({
  openSidebar,
  onClickDayModeIcon,
  onClickDotsVerticalIcon
}: MobileHeaderProps) => {

  return (
    <header className="sticky top-0 bg-[#273244] h-14 flex items-center justify-between px-4 z-40 lg:hidden">
      <button
        type='button'
        className="focus:outline-none"
        onClick={openSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <IconBar className="w-6 h-6 text-[#D4D7DD]" />
      </button>

      <div className="flex items-center gap-[25px] ml-auto">
        <button 
          type='button' 
          className="focus:outline-none"
          onClick={onClickDayModeIcon}
        >
          <span className="sr-only">Icon Day mode</span>
          <IconDayMode className="w-6 h-6 text-[#D4D7DD]" />
        </button>

        <button 
          type='button' 
          className="focus:outline-none"
          onClick={onClickDotsVerticalIcon}
        >
          <span className="sr-only">Icon Dots vertical</span>
          <IconDotsVertical className="w-6 h-6 text-[#D4D7DD]" />
        </button>
      </div>
    </header>
  )
}
