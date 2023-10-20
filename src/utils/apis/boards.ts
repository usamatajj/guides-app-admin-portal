import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiCall from 'utils/apis/apiCall'
import { BoardPayloadType, BoardResponseType } from 'utils/types'

// Board APIs
export const useGetBoards = (pageSize: number) => {
  return useQuery<BoardResponseType, Error>(['getBoards'], () =>
    apiCall('board', {
      headers: {
        'Page-Number': '0',
        'Page-Size': `${pageSize}`,
      },
    }),
  )
}

export const useCreateBoard = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<BoardPayloadType>>(
    (data: Partial<BoardPayloadType>) =>
      apiCall('board', {
        data,
        method: 'POST',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBoards'])
      },
    },
  )
}

export const useEditBoard = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<BoardPayloadType>>(
    (data: Partial<BoardPayloadType>) =>
      apiCall('board', {
        data,
        method: 'PUT',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBoards'])
      },
    },
  )
}
