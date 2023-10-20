import React, { ReactNode, useMemo } from 'react'
import { Control, FieldName, FieldValues, useController } from 'react-hook-form'
import {
  StyledFormItem,
  StyledInput,
  StyledPasswordInput,
  StyledTextArea,
  StyledTimePicker,
} from './FormInput.styles'
import { Button, DatePicker, Select, Upload, Radio } from 'antd'
import { DropDownType } from 'utils/types'
import { UploadOutlined } from '@ant-design/icons'
const { Option } = Select
type InputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldName<T>
  type:
    | 'password'
    | 'text'
    | 'textarea'
    | 'date'
    | 'time'
    | 'single-select'
    | 'multiple-select'
    | 'file'
    | 'radio'
  disabled?: boolean
  label?: string
  placeholder?: string
  size?: 'small' | 'middle' | 'large'
  options?: DropDownType[]
  acceptFileType?: string
  prefix?: ReactNode
  suffix?: ReactNode
}
const { Group, Button: RadioButton } = Radio

function FormInput<T extends FieldValues>({
  name,
  disabled,
  type,
  label,
  placeholder,
  control,
  size = 'middle',
  options,
  acceptFileType,
  prefix,
  suffix,
}: InputProps<T>) {
  // Controller Hook
  const {
    field,
    fieldState: { error },
  } = useController<T | any>({ name: name, control })

  // Conditional Rendering based on given type
  const renderInputField = useMemo(() => {
    switch (type) {
      case 'password':
        return (
          <StyledPasswordInput
            placeholder={placeholder}
            suffix={suffix}
            disabled={disabled}
            {...field}
            name={name}
            size={size}
          />
        )
      case 'textarea':
        return (
          <StyledTextArea
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            name={name}
            size={size}
            rows={4}
          />
        )
      case 'date':
        return (
          <DatePicker
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            name={name}
            size={size}
          />
        )
      case 'time':
        return (
          <StyledTimePicker
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            name={name}
            size={size}
          />
        )
      case 'text':
        return (
          <StyledInput
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            name={name}
            size={size}
            suffix={suffix}
            prefix={prefix}
          />
        )
      case 'single-select':
        return (
          <Select {...field} placeholder={placeholder} showArrow showSearch>
            {options?.map((item, i) => (
              <Option key={`Single-Select-idx-${i}`} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        )

      case 'multiple-select':
        return (
          <Select
            {...field}
            placeholder={placeholder}
            mode="multiple"
            showArrow
            showSearch
          >
            {options?.map((item, i) => (
              <Option
                key={`Multi-Select-idx-${i}-${item.value}`}
                value={item.value}
              >
                {item.label}
              </Option>
            ))}
          </Select>
        )
      case 'file':
        return (
          <Upload
            {...field}
            name={name}
            action="/upload.do"
            listType="picture"
            accept={acceptFileType}
            showUploadList={true}
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>{placeholder}</Button>
          </Upload>
        )
      case 'radio':
        return (
          <Group {...field} name={name} defaultValue="a" buttonStyle="solid">
            {options?.map((item, i) => (
              <RadioButton
                key={`radio-item-${i}-${item.value}`}
                value={item.value}
              >
                {item.label}
              </RadioButton>
            ))}
          </Group>
        )
      default:
        return null
    }
  }, [disabled, type, field])
  // Rendering with AntDesign Form Item
  return (
    <StyledFormItem
      labelCol={{ span: 24 }}
      label={label}
      help={error && error.message}
      validateStatus={error && 'error'}
    >
      {renderInputField}
    </StyledFormItem>
  )
}

export default FormInput
