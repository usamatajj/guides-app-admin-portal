import { UserDataType } from './types'

const saveUserData = (data: Partial<UserDataType>) => {
  const useData: UserDataType = {
    name: '',
    apiToken: '',
    phoneNumber: '',
    ...data,
  }
  sessionStorage.setItem('userData', JSON.stringify(useData))
}

const retrieveUserData = (): UserDataType | null => {
  try {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')
    return userData
  } catch (error) {
    console.error('Error retrieving user data:', error)
    throw error
  }
  return null
}

export { saveUserData, retrieveUserData }
