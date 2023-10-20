import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiCall from 'utils/apis/apiCall'
import {
  LoginPayloadType,
  LoginResponseType,
  UserPayloadType,
  UserResponseType,
  VerificationPayloadType,
  VerificationResponseType,
} from 'utils/types'

// Auth APIs
export const useLoginUser = () => {
  return useMutation<LoginResponseType, Error, Partial<LoginPayloadType>>(
    (data: Partial<LoginPayloadType>) =>
      apiCall('user/login', {
        data,
        method: 'POST',
      }),
  )
}

export const useGetUsers = (pageSize: number) => {
  return useQuery<UserResponseType, Error>(['getUsers'], () =>
    apiCall('user', {
      headers: {
        'Page-Number': '0',
        'Page-Size': `${pageSize}`,
      },
    }),
  )
}

export const useVerifyUser = () => {
  return useMutation<
    VerificationResponseType,
    Error,
    Partial<VerificationPayloadType>
  >((data: Partial<VerificationPayloadType>) =>
    apiCall('user/verify-verification-code', {
      data,
      method: 'POST',
    }),
  )
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<UserPayloadType>>(
    (data: Partial<UserPayloadType>) =>
      apiCall('user', {
        data,
        method: 'POST',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getUsers'])
      },
    },
  )
}

export const useEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<UserPayloadType>>(
    (data: Partial<UserPayloadType>) =>
      apiCall('user', {
        data,
        method: 'PUT',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getUsers'])
      },
    },
  )
}
