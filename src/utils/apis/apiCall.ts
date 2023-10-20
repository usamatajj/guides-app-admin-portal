import { API_URL } from 'utils/const'
import { retrieveUserData } from 'utils/dataStorage'
import { UserDataType } from 'utils/types'

export default async function apiCall(
  endpoint: string,
  {
    data,
    headers: customHeaders,
    ...customConfig
  }: Partial<RequestInit> & { data?: unknown } = {},
) {
  const userData: UserDataType | null = retrieveUserData()
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : '',
      Authorization: userData?.apiToken || '',
      ...customHeaders,
    },
    ...customConfig,
  }

  return fetch(`${API_URL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}
