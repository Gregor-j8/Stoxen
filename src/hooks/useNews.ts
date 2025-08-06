import { GetNews } from '@/service/News'
import { useQuery } from '@tanstack/react-query'

export const useGetNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => GetNews(),
    staleTime: 5 * 60 * 1000
  })
}