import * as yup from 'yup'

export const bookFormSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Book name is required'),
  description: yup.string(),
  board: yup.array().required().min(1, 'Select Associated Board'),
  class: yup.string().required('Select Associated Class'),
  book: yup
    .mixed()
    .required('Upload book file')
    .test('checkFile', 'Please provide book file', value => {
      //@ts-ignore
      return !!value?.fileList?.length
    })
    .test('checkFile', 'Book needs to be in pdf format', value => {
      //@ts-ignore
      return value?.file?.type === 'application/pdf'
    }),
  previewBook: yup
    .mixed()
    .required('Upload Preview book file')
    .test('checkFile', 'Please provide preview book file', value => {
      //@ts-ignore
      return !!value?.fileList?.length
    })
    .test('checkFile', 'Preview Book needs to be in pdf format', value => {
      //@ts-ignore
      return value?.file?.type === 'application/pdf'
    }),
  price: yup
    .number()
    .typeError('Price Must be in Number')
    .required('Enter price of the book'),
})
