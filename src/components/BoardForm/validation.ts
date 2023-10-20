import * as yup from 'yup'

export const boardFormSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Board name is required'),
  description: yup.string(),
  region: yup.string(),
  boardImg: yup
    .mixed()
    .required('Upload board file')
    .test('checkFile', 'Please provide board image', value => {
      //@ts-ignore
      return !!value?.fileList?.length
    })
    .test(
      'checkFile',
      'Board image needs to be in png, jpg or svg format',
      value => {
        return ['image/jpeg', 'image/png', 'image/svg+xml'].includes(
          //@ts-ignore
          value?.file?.type,
        )
      },
    ),
})
