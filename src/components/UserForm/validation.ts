import * as yup from 'yup'

export const userFormSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('User name is required'),
  description: yup.string(),
  userType: yup.string().required('Select User Type'),
  phoneNumber: yup
    .number()
    .typeError('Numbers Only')
    .required('Enter user phone number'),
  booksPurchased: yup.array().when('userType', {
    is: 'STUDENT',
    then: schema =>
      schema
        .required('Select books purchased by the student')
        .min(1, 'Select books purchased by the student'),
    otherwise: schema => schema.nullable().notRequired(),
  }),
})
