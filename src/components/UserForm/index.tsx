import React, { useMemo } from 'react'
import { Button, Form, FormItemProps, Space, Typography } from 'antd'
import { CustomDrawer, DrawerFooter, DrawerHeading } from './UserForm.style'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserPayloadType, DropDownType } from 'utils/types'
import { userFormSchema } from './validation'
import FormInput from 'components/common/FormInput'
import { useCreateUser, useEditUser } from 'utils/apis/auth'
import Notification from 'components/common/Notification'

// Component Props Interface
interface UserFormProps {
  hideDrawer: () => void
  userData?: UserPayloadType
  open: boolean
}
type UserFormType = {
  id?: string
  name: string
  description?: string
  userType: string
  phoneNumber: number
  booksPurchased?: any[]
}

const userTypeOptions: DropDownType[] = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'Student',
    value: 'STUDENT',
  },
]

const dummyBooksOptions: DropDownType[] = [
  {
    label: 'Warren Bertha Ward',
    value: '824ca521-c96a-5a3c-82a9-9e11b3be86e0',
  },
  {
    label: 'Andrew Bradley Ingram',
    value: '6148393b-d4fb-56c3-94a7-c6bbd2fc242a',
  },
  {
    label: 'Mattie Wesley Rhodes',
    value: 'cb2dbdad-7b38-553e-adb7-c212cf6db16c',
  },
  {
    label: 'Brent Shawn Lane',
    value: 'd49f387c-a97f-5bc0-b928-538af1b27395',
  },
  {
    label: 'Luella Jimmy Bishop',
    value: 'd29eb75d-68c4-5cfa-95be-67c713d5fd2b',
  },
]
// Declarations
const { Paragraph } = Typography
const commonProps: FormItemProps = {
  labelCol: { span: 7, offset: 0 },
  wrapperCol: { span: 15, offset: 0 },
  labelAlign: 'right',
  colon: false,
}

const UserForm = ({ userData, hideDrawer, open }: UserFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    unregister,
    watch,
  } = useForm({
    resolver: yupResolver(userFormSchema),
  })

  const { userType } = watch()

  console.log('🚀 ~ file: index.tsx:73 ~ UserForm ~ errors:', errors)

  const {
    mutate: editMutate,
    isSuccess: editIsSuccess,
    isLoading: editIsLoading,
    isError: editIsError,
    error: editError,
  } = useEditUser()

  const { mutate, isSuccess, isLoading, isError, error } = useCreateUser()

  const onSubmit = (data: UserFormType) => {
    const payload: UserPayloadType = {
      name: data.name,
      description: data.description,
      userType: data.userType,
      phoneNumber: data.phoneNumber,
      booksPurchased: data.booksPurchased,
    }

    if (userData?.id) editMutate({ id: userData.id, ...payload })
    else mutate(payload)
  }

  const renderNotification = useMemo(() => {
    if (editIsSuccess) {
      return (
        <Notification
          type="success"
          description="User Updated Successfully!"
          show={true}
          closable
        />
      )
    }
    if (isSuccess) {
      return (
        <Notification
          type="success"
          description="User Created Successfully!"
          show={true}
          closable
        />
      )
    }
    if (isError) {
      return (
        <Notification
          type="error"
          description={error?.message}
          show={true}
          closable
        />
      )
    }
    if (editIsError) {
      return (
        <Notification
          type="error"
          description={editError?.message}
          show={true}
          closable
        />
      )
    }
    return null
  }, [
    isSuccess,
    editIsSuccess,
    isError,
    editIsError,
    editError?.message,
    error?.message,
  ])

  return (
    <>
      <CustomDrawer
        title={
          <DrawerHeading>
            {userData ? 'Edit User' : 'Add New User'}
          </DrawerHeading>
        }
        placement="right"
        closable={false}
        onClose={() => {
          unregister()
          hideDrawer()
        }}
        open={open}
        width={522}
        destroyOnClose={true}
        key="right"
        footer={
          <DrawerFooter align="center">
            <Space>
              <Button
                size="large"
                onClick={hideDrawer}
                disabled={isLoading || editIsLoading}
              >
                Cancel
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={handleSubmit(onSubmit)}
                loading={isLoading || editIsLoading}
              >
                Submit
              </Button>
            </Space>
          </DrawerFooter>
        }
      >
        <form>
          <Paragraph>
            Enter User details for better record keeping related to entities
            like Books, Boards and Classes
          </Paragraph>
          <Form.Item
            {...commonProps}
            label="Name"
            validateStatus={errors?.name && 'error'}
          >
            <FormInput
              control={control}
              type="text"
              name="name"
              placeholder="Enter User Name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Description"
            validateStatus={errors?.description && 'error'}
          >
            <FormInput
              control={control}
              type="textarea"
              name="description"
              placeholder="Enter User Description"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Phone no."
            validateStatus={errors?.phoneNumber && 'error'}
          >
            <FormInput
              control={control}
              type="text"
              name="phoneNumber"
              placeholder="  e.g 3338928281, etc."
              size="large"
              prefix="+92"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="User Type"
            validateStatus={errors?.userType && 'error'}
          >
            <FormInput
              control={control}
              type="radio"
              options={userTypeOptions}
              name="userType"
              placeholder="Enter User Type"
              size="large"
            />
          </Form.Item>
          {userType === 'STUDENT' && (
            <Form.Item
              {...commonProps}
              label="Books Purchased"
              validateStatus={errors?.booksPurchased && 'error'}
            >
              <FormInput
                control={control}
                options={dummyBooksOptions}
                type="multiple-select"
                name="booksPurchased"
                placeholder="Select Books"
                size="large"
              />
            </Form.Item>
          )}
        </form>
      </CustomDrawer>
      {renderNotification}
    </>
  )
}

export default UserForm
