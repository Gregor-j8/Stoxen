import { useMutation, useQuery } from '@tanstack/react-query'
import { loginUser, registerUser, getUserInfo } from '@/service/auth'

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}

export const useUser = (token: string | null) => {
  return useQuery({
    queryKey: ['user', token],
    queryFn: () => getUserInfo(token!),
    enabled: !!token,
  })
}