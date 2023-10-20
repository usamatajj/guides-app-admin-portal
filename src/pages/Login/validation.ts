import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(03[0-9]{2})([0-9]{7})$/, 'Invalid phone number'),
})
