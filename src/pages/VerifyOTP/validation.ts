import * as yup from 'yup'

export const otpVerificationSchema = yup.object().shape({
  otp: yup.string().required('Enter OTP').length(4, 'Enter correct otp'),
})
