import React, { useEffect, useState } from 'react'
import { Center } from 'shared-styles'
import { Button } from 'antd'
import { OTPInputBox, VerifyOTPCard, VerifyOTPForm } from './VerifyOTP.styles'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { otpVerificationSchema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserDataType, UserVerificationFormType } from 'utils/types'
import { useVerifyUser } from 'utils/apis/auth'
import { retrieveUserData, saveUserData } from 'utils/dataStorage'
import OTPInput from 'react-otp-input'
function VerifyOTP() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserDataType | null>(null)

  const getUserData = () => {
    const data = retrieveUserData()
    if (data?.apiToken) navigate('/dashboard/books', { replace: true })
    if (data?.phoneNumber) {
      setUserData(data)
    } else {
      navigate('/login', { replace: true })
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const { control, handleSubmit, watch } = useForm<UserVerificationFormType>({
    resolver: yupResolver(otpVerificationSchema),
  })
  console.log(watch())
  const { isSuccess, isLoading, data, mutate } = useVerifyUser()

  const onSubmit = (data: UserVerificationFormType) => {
    mutate({ code: data.otp, mobile: userData?.phoneNumber })
  }

  useEffect(() => {
    if (isSuccess) {
      const token = typeof data?.token === 'string' ? data.token : ''
      saveUserData({ apiToken: token })
      navigate('/dashboard/books', { replace: true })
    }
  }, [isSuccess])

  return (
    <Center>
      <VerifyOTPCard title="OTP VERIFICATION">
        <VerifyOTPForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <OTPInput
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={props => <OTPInputBox {...props} />}
                {...field}
              />
            )}
          />

          <Button htmlType="submit" type="primary" loading={isLoading}>
            LOGIN
          </Button>
        </VerifyOTPForm>
      </VerifyOTPCard>
    </Center>
  )
}

export default VerifyOTP
