import { useQuery } from '@tanstack/react-query'
import { GetFutureStockSim, GetStock } from '@/service/stock'


export const useGetStock = (ticker: string) => {
  return useQuery({
    queryKey: ['stock', ticker],
    queryFn: () => GetStock(ticker),
    enabled: !!ticker,
    staleTime: 5 * 60 * 1000
  })
}

export const useFutureStockSim = (ticker: string) => {
  return useQuery({
    queryKey: ['futureStock', ticker],
    queryFn: () => GetFutureStockSim(ticker),
    enabled: !!ticker,
    staleTime: 5 * 60 * 1000
  })
}