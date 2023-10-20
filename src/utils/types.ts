export type BoardItem = {
  id: string
  title: string
  icon: any
}

export type ClassItem = {
  id: string
  name: string
  title: string
  description: string
}

export type BookItem = {
  id: string
  name: string
  title: string
  description: string
  price: string
  selected?: boolean
}

export type RootStackParamList = {
  Login: undefined
  OTP: undefined
  Dashboard: undefined
  SelectBoard: undefined
  SelectClass: undefined
  SelectBook: undefined
  PreviewBook: undefined
  NoInternet: undefined
}

// API RESPONSE TYPES
export type UserResponseType = any
export type BoardResponseType = any
export type ClassResponseType = any
export type BookResponseType = any
export type LoginResponseType = any
export type VerificationResponseType = {
  status: number
  message: 'approved' | 'pending'
  token: string
}

// API PAYLOAD TYPES
export type BoardPayloadType = {
  id?: string
  name: string
  description: string
  boardImage: string
  region: string
}
export type ClassPayloadType = {
  name: string
  id?: string
  description?: string
  grade:
    | 'HSSC_I'
    | 'HSSC_II'
    | 'SSC_I'
    | 'SSC_II'
    | 'GRADUATE'
    | 'POST_GRADUATE'
    | 'VIII'
    | 'VII'
    | 'VI'
    | 'V'
    | 'OTHER'
    | string
}

export type UserPayloadType = {
  id?: string
  name: string
  description?: string
  userType: 'ADMIN' | 'STUDENT' | string
  phoneNumber: string | number
  // If userType === "STUDENT"
  booksPurchased?: string[]
}

export type BookPayloadType = {
  id?: string
  bookName: string
  boardId: string[]
  classId: string
  pdfPath: string
  previewPath: string
  author: string
  status: string
  image: string
  quantityAvailable: string
}

export type LoginPayloadType = { mobile: string; userName: string }
export type VerificationPayloadType = {
  mobile: string
  code: string
}

// USER DATA TYPE
export type UserDataType = {
  phoneNumber: string
  name: string
  apiToken: string
}

// Form Types
export type LoginFormType = {
  phoneNumber: string
}
export type UserVerificationFormType = {
  otp: string
}

// REUSABLE TYPES
export type DropDownType = {
  label: string
  value: string
}
