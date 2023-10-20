import React, { useMemo } from 'react'
import { Button, Form, FormItemProps, Space, Typography } from 'antd'
import { CustomDrawer, DrawerFooter, DrawerHeading } from './ClassForm.style'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BookPayloadType, ClassPayloadType, DropDownType } from 'utils/types'
import { classFormSchema } from './validation'
import FormInput from 'components/common/FormInput'
import { useCreateClass, useEditClass } from 'utils/apis/classes'
import Notification from 'components/common/Notification'

// Component Props Interface
interface ClassFormProps {
  hideDrawer: () => void
  classData?: BookPayloadType
  open: boolean
}
type ClassFormType = {
  id?: string
  name: string
  description?: string
  grade: string
}

const dummyGradeOptions: DropDownType[] = [
  {
    label: 'HSSC-I',
    value: 'HSSC_I',
  },
  {
    label: 'HSSC-II',
    value: 'HSSC_II',
  },
  {
    label: 'SSC-I',
    value: 'SSC_I',
  },
  {
    label: 'SSC-II',
    value: 'SSC_II',
  },
  {
    label: 'Graduate',
    value: 'GRADUATE',
  },
  {
    label: 'Post Graduate',
    value: 'POST_GRADUATE',
  },
  {
    label: 'VIII (8th Class)',
    value: 'VIII',
  },
  {
    label: 'VII (7th Class)',
    value: 'VII',
  },
  {
    label: 'VI (6th Class)',
    value: 'VI',
  },
  {
    label: 'V (5th Class)',
    value: 'V',
  },
  {
    label: 'Other',
    value: 'OTHER',
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

const BookForm = ({ classData, hideDrawer, open }: ClassFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    unregister,
  } = useForm({
    resolver: yupResolver(classFormSchema),
  })

  const {
    mutate: editMutate,
    isSuccess: editIsSuccess,
    isLoading: editIsLoading,
    isError: editIsError,
    error: editError,
  } = useEditClass()

  const { mutate, isSuccess, isLoading, isError, error } = useCreateClass()

  const onSubmit = (data: ClassFormType) => {
    const payload: ClassPayloadType = {
      name: data.name,
      description: data.description,
      grade: data.grade,
    }

    if (classData?.id) editMutate({ id: classData.id, ...payload })
    else mutate(payload)
  }

  const renderNotification = useMemo(() => {
    if (editIsSuccess) {
      return (
        <Notification
          type="success"
          description="Policy Updated Successfully!"
          show={true}
          closable
        />
      )
    }
    if (isSuccess) {
      return (
        <Notification
          type="success"
          description="Policy Created Successfully!"
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
            {classData ? 'Edit Class' : 'Add New Class'}
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
            Enter Class details to make valid associations with board,
            student(s) and book(s).
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
              placeholder="Enter Class Name"
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
              placeholder="Enter Class Description"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Grade"
            validateStatus={errors?.grade && 'error'}
          >
            <FormInput
              control={control}
              options={dummyGradeOptions}
              type="single-select"
              name="grade"
              placeholder="Select Grade"
              size="large"
            />
          </Form.Item>
        </form>
      </CustomDrawer>
      {renderNotification}
    </>
  )
}

export default BookForm
