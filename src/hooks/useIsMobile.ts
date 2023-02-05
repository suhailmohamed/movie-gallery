import { useMediaQuery } from 'react-responsive'

export const useIsMobile = (): boolean =>
  useMediaQuery({
    maxWidth: 767
  })
