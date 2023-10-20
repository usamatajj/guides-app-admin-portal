import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiCall from 'utils/apis/apiCall'
import { BookPayloadType, BookResponseType } from 'utils/types'

// Book APIs
export const useGetBooks = (pageSize: number) => {
  return useQuery<BookResponseType, Error>(['getBooks'], () =>
    apiCall('book', {
      headers: {
        'Page-Number': '0',
        'Page-Size': `${pageSize}`,
      },
    }),
  )
}

export const useGetBookByBoard = (boardId?: string) => {
  return useQuery<BookResponseType, Error>(
    ['getBookByBoard', boardId],
    () => apiCall(`book/by-board?board_id=${boardId}`),
    {
      enabled: !!boardId,
      // staleTime: Infinity,
    },
  )
}

export const useGetBookByClass = (classId?: string) => {
  return useQuery<BookResponseType, Error>(
    ['getBookByClass', classId],
    () => apiCall(`book/by-class?class_id=${classId}`),
    {
      enabled: !!classId,
      // staleTime: Infinity,
    },
  )
}

export const useGetBookByClassAndBoard = (
  classId?: string,
  boardId?: string,
) => {
  return useQuery<BookResponseType, Error>(
    ['getBookByClassAndBoard', classId, boardId],
    () =>
      apiCall(
        `book/by-class-and-board?class_id=${classId}&board_id=${boardId}`,
      ),
    {
      enabled: !!classId || !!classId,
      // staleTime: Infinity,
    },
  )
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<BookPayloadType>>(
    (data: Partial<BookPayloadType>) =>
      apiCall('book', {
        data,
        method: 'POST',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBooks'])
      },
    },
  )
}

export const useEditBook = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Partial<BookPayloadType>>(
    (data: Partial<BookPayloadType>) =>
      apiCall('book', {
        data,
        method: 'PUT',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBooks'])
      },
    },
  )
}
