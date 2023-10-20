import { Input, Form, TimePicker, Upload } from 'antd'
import styled from 'styled-components'

export const StyledInput = styled(Input)``

export const StyledPasswordInput = styled(Input.Password)``

export const StyledTimePicker = styled(TimePicker)`
  width: 100%;
`

export const StyledTextArea = styled(Input.TextArea)`
  resize: none;
`

export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-explain-error {
    font-size: 0.9em;
    padding-top: 3px;
    padding-left: 3px;
  }
`

export const StyledUpload = styled(Upload)`
  .ant-upload-list-picture .ant-upload-list-item-error,
  .ant-upload-list-picture-card .ant-upload-list-item-error {
    border-color: #0057b7;
  }
  .ant-upload-list-item-error,
  .ant-upload-list-item-error .ant-upload-text-icon > .anticon,
  .ant-upload-list-item-error .ant-upload-list-item-name {
    border-color: #0057b7 !important;
  }
`
