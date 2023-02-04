import type React from 'react'
import { IconProps } from './IconProps'

export const IconPlaylist = ({
  className = ''
}: IconProps): React.ReactElement => {
  return (
    <svg className={className} viewBox="0 0 17 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.8421 3.46667H0V5.2H9.8421V3.46667Z" fill="currentColor" />
        <path d="M9.8421 0H0V1.73333H9.8421V0Z" fill="currentColor" />
        <path d="M6.26316 6.93333H0V8.66667H6.26316V6.93333Z" fill="currentColor" />
        <path d="M11.6316 6.06667V13L17 9.53333L11.6316 6.06667Z" fill="currentColor" />
    </svg>
  )
}
