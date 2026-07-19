import { useQuery } from '@tanstack/react-query'

import { fetchMiners } from '../queries'

import type { Period } from '#/types'

export const useMiners = (period: Period) => {
  return useQuery({
    queryKey: ['Miners', period],
    queryFn: () => fetchMiners(period),
  })
}
