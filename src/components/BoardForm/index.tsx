import React, { useMemo } from 'react'
import { Button, Form, FormItemProps, Space, Typography } from 'antd'
import { CustomDrawer, DrawerFooter, DrawerHeading } from './BoardForm.style'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BoardPayloadType } from 'utils/types'
import { boardFormSchema } from './validation'
import FormInput from 'components/common/FormInput'
import { useCreateBoard, useEditBoard } from 'utils/apis/boards'
import Notification from 'components/common/Notification'
// Component Props Interface
interface BoardFormProps {
  hideDrawer: () => void
  boardData?: BoardPayloadType
  open: boolean
}
type BoardFormType = {
  id?: string
  name: string
  description?: string
  boardImg: any
  region?: string
}

// Declarations
const { Paragraph } = Typography
const commonProps: FormItemProps = {
  labelCol: { span: 7, offset: 0 },
  wrapperCol: { span: 15, offset: 0 },
  labelAlign: 'right',
  colon: false,
}

const BoardForm = ({ boardData, hideDrawer, open }: BoardFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    unregister,
  } = useForm({
    resolver: yupResolver(boardFormSchema),
  })

  const {
    mutate: editMutate,
    isSuccess: editIsSuccess,
    isLoading: editIsLoading,
    isError: iseditError,
    error: editError,
  } = useEditBoard()
  const { mutate, isSuccess, isLoading, isError, error } = useCreateBoard()

  const onSubmit = (data: BoardFormType) => {
    const payload = {
      name: data.name,
      description: data.description,
      boardImage: data?.boardImg,
      region: data.region,
    }
    if (boardData?.id) editMutate({ id: boardData.id, ...payload })
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
    if (iseditError) {
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
    iseditError,
    editError?.message,
    error?.message,
  ])

  return (
    <>
      <CustomDrawer
        title={
          <DrawerHeading>
            {boardData ? 'Edit Board' : 'Add New Board'}
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
            Enter Board details associated with multiple class(es) or book(s).
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
              placeholder="Enter Board Name"
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
              placeholder="Enter Board Description"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Region"
            validateStatus={errors?.region && 'error'}
          >
            <FormInput
              control={control}
              type="text"
              name="region"
              placeholder="Enter Board Region"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Board Image"
            validateStatus={errors?.boardImg && 'error'}
          >
            <FormInput
              control={control}
              type="file"
              name="boardImg"
              placeholder="Upload Board Image"
              size="large"
              acceptFileType="image/jpeg', 'image/png', 'image/svg+xml"
            />
          </Form.Item>
        </form>
      </CustomDrawer>
      {renderNotification}
    </>
  )
}

export default BoardForm
