import { useQuery } from '@tanstack/react-query'
import { GetStock } from '@/service/stock'


export const useGetStock = (ticker: string) => {
  return useQuery({
    queryKey: ['stock', ticker],
    queryFn: () => GetStock(ticker),
    enabled: !!ticker,
    staleTime: 5 * 60 * 1000
  })
}
