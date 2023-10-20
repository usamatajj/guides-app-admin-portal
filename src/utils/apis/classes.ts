import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiCall from 'utils/apis/apiCall'
import { ClassPayloadType, ClassResponseType } from 'utils/types'

// Classes APIs
export const useGetClasses = (pageSize: number) => {
  return useQuery<ClassResponseType, Error>(['getClasses'], () =>
    apiCall('class', {
      headers: {
        'Page-Number': '0',
        'Page-Size': `${pageSize}`,
      },
    }),
  )
}

export const useCreateClass = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<ClassPayloadType>>(
    (data: Partial<ClassPayloadType>) =>
      apiCall('class', {
        data,
        method: 'POST',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getClasses'])
      },
    },
  )
}

export const useEditClass = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<ClassPayloadType>>(
    (data: Partial<ClassPayloadType>) =>
      apiCall('book', {
        data,
        method: 'PUT',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getClasses'])
      },
    },
  )
}
