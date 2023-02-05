import { useMediaQuery } from 'react-responsive'

export const useIsTablet = (): boolean =>
  useMediaQuery({
    maxWidth: 1279
  })
