import React, { useMemo } from 'react'
import { Button, Form, FormItemProps, Space, Typography } from 'antd'
import { CustomDrawer, DrawerFooter, DrawerHeading } from './BookForm.style'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BookPayloadType, DropDownType } from 'utils/types'
import { bookFormSchema } from './validation'
import FormInput from 'components/common/FormInput'
import { useCreateBook, useEditBook } from 'utils/apis/books'
import Notification from 'components/common/Notification'
// Component Props Interface
interface BookFormProps {
  hideDrawer: () => void
  bookData?: BookPayloadType
  open: boolean
}
type BookFormType = {
  id?: string
  description?: string
  board?: any[]
  name: string
  class: string
  book: any
  previewBook: any
}

const dummyClassOptions: DropDownType[] = [
  {
    label: 'Howard Amanda Flores',
    value: '82b5c673-250f-57bb-a5c6-e1d7043ba90d',
  },
  {
    label: 'Bettie Emily Butler',
    value: '29a630b3-cfd8-53e7-865c-938caa952aee',
  },
  {
    label: 'Mildred Vincent Stephens',
    value: '86784de6-d0a5-5d58-981a-0ad8e342d6e3',
  },
  {
    label: 'Joshua Andre Barber',
    value: '7fcb0d16-96b1-5e57-8b8c-5b99fa608c76',
  },
  {
    label: 'Franklin Sarah Wallace',
    value: 'e7be6d8b-faf0-54ff-b1be-aaf5e1dad24b',
  },
]

const dummyBoardOptions: DropDownType[] = [
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

const BookForm = ({ bookData, hideDrawer, open }: BookFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    unregister,
  } = useForm({
    resolver: yupResolver(bookFormSchema),
  })

  const {
    mutate: editMutate,
    isSuccess: editIsSuccess,
    isLoading: editIsLoading,
    isError: editIsError,
    error: editError,
  } = useEditBook()
  const { mutate, isSuccess, isLoading, isError, error } = useCreateBook()

  const onSubmit = (data: BookFormType) => {
    const payload = {
      bookName: data.book,
      boardId: data.board,
      classId: data.class,
      pdfPath: data.book?.file,
      previewPath: data.previewBook?.file,
      author: '',
      status: '',
      image: '',
      quantityAvailable: '',
    }
    if (bookData?.id) editMutate({ id: bookData.id, ...payload })
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
            {bookData ? 'Edit Book' : 'Add New Book'}
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
            Enter Book details to register a book associated with board(s) and
            class.
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
              placeholder="Enter Book Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            {...commonProps}
            label="Price"
            validateStatus={errors?.price && 'error'}
          >
            <FormInput
              control={control}
              type="text"
              name="price"
              placeholder="e.g 200, 500, etc."
              size="large"
              prefix="Rs."
              suffix="PKR"
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
              placeholder="Enter Book Description"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Class"
            validateStatus={errors?.class && 'error'}
          >
            <FormInput
              control={control}
              options={dummyClassOptions}
              type="single-select"
              name="class"
              placeholder="Select Class"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Board"
            validateStatus={errors?.board && 'error'}
          >
            <FormInput
              control={control}
              options={dummyBoardOptions}
              type="multiple-select"
              name="board"
              placeholder="Select Board"
              size="large"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Book File"
            validateStatus={errors?.book && 'error'}
          >
            <FormInput
              control={control}
              type="file"
              name="book"
              placeholder="Upload Book"
              size="large"
              acceptFileType="application/pdf,application/vnd.ms-excel"
            />
          </Form.Item>
          <Form.Item
            {...commonProps}
            label="Preview Book File"
            validateStatus={errors?.book && 'error'}
          >
            <FormInput
              control={control}
              type="file"
              name="previewBook"
              placeholder="Upload Preview Book File"
              size="large"
              acceptFileType="application/pdf,application/vnd.ms-excel"
            />
          </Form.Item>
        </form>
      </CustomDrawer>
      {renderNotification}
    </>
  )
}

export default BookForm
