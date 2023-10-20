import React, { useEffect } from 'react'
import { Center } from 'shared-styles'
import { Button } from 'antd'
import { LoginCard, LoginForm } from './Login.styles'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginSchema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from 'components/common/FormInput'
import { PhoneOutlined } from '@ant-design/icons'
import { LoginFormType } from 'utils/types'
import { useLoginUser } from 'utils/apis/auth'
import { retrieveUserData, saveUserData } from 'utils/dataStorage'
function Login() {
  const navigate = useNavigate()
  const { control, handleSubmit, watch } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
  })
  const { phoneNumber } = watch()
  const { isLoading, isSuccess, mutate } = useLoginUser()

  useEffect(() => {
    if (retrieveUserData()?.apiToken)
      navigate('/dashboard/books', { replace: true })
  }, [])
  useEffect(() => {
    if (isSuccess) {
      saveUserData({ phoneNumber: phoneNumber.replace(/^./, '+92') })
      navigate('/verify-otp', { replace: true })
    }
  }, [isSuccess])
  const onSubmit = (data: LoginFormType) => {
    mutate({ mobile: data.phoneNumber.replace(/^./, '+92'), userName: '' })
  }
  return (
    <Center>
      <LoginCard title="ADMIN PORTAL LOGIN">
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Phone Number"
            name="phoneNumber"
            control={control}
            type="text"
            placeholder="Enter Phone Number"
            suffix={<PhoneOutlined />}
          />
          <Button htmlType="submit" type="primary" loading={isLoading}>
            NEXT
          </Button>
        </LoginForm>
      </LoginCard>
    </Center>
  )
}

export default Login
