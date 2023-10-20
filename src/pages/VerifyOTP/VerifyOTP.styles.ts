import styled from 'styled-components'
import { Card } from 'antd'

export const VerifyOTPCard = styled(Card)`
  .ant-card-head-title {
    font-size: 2rem;
    text-align: center;
  }
  border-radius: 15px;
  box-shadow: 36px 36px 74px #bebebe, -36px -36px 74px #ffffff;
  width: 20vw;
`

export const VerifyOTPForm = styled.form`
  display: grid;
  row-gap: 1rem;
`

export const OTPInputBox = styled.input`
  min-width: 55px;
  height: 50px;
  font-size: 20px;
  border-radius: 8px;
  margin: 0 10px;
`
