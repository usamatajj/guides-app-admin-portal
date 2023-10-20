import * as yup from 'yup'

export const classFormSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Class name is required'),
  description: yup.string(),
  board: yup.array().required().min(1, 'Select Associated Board'),
  grade: yup.string().required('Select Grade e.g SSC-I, SSC-II, HSSC-II, etc.'),
})
