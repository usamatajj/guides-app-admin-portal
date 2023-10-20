import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import NoConfigIcon from '../../assets/icons/no-config'
import BookForm from '../../components/BookForm'
import ViewBoard from '../../components/ViewBoard'
import Table from 'components/common/Table'
import DataNotFound from 'components/common/DataNotFound'
import { useGetBooks } from '../../utils/apis/books'
import { SKELETON_COLUMNS, SKELETON_ROWS } from '../../utils/const'
import { checkElementInView } from '../../utils/helpers'
import { AppLayout, EmptyBoxWrapper, PaginationText } from './Books.style'
import DeleteBoard from '../../components/DeleteBoard'
import { Button, Col, Row, Skeleton, Typography } from 'antd'
import { BookResponseType } from 'utils/types'
import { ColumnsType } from 'antd/es/table'

const { Title } = Typography
const buttonTitle = 'Add New Book'
const Books: React.FC = () => {
  // prettier-ignore
  const {
    // Methods
    // Drawer Methods
    openAddBookDrawer,
    closeAddEditBookDrawer,
    // Delete Modal Methods
    hideDeleteModal,
    // View Modal Methods,
    hideViewModal,
    drawerVisible,
    // Variables 
    deleteModalVisible,   // boolean
    book,               // book object
    viewModalVisible,     // boolean
    // React Query Returns
    isLoading,
    isRefetching,
    data,
  } = useBooksListing()

  const columns = useMemo(() => renderColumns(), [data?.result])

  return (
    <AppLayout>
      <Row style={{ marginBottom: '20px' }} wrap={false}>
        <Col flex="auto">
          <Title level={3}>Books Listing</Title>
        </Col>
        <Col flex="none">
          {isLoading ? (
            <Skeleton.Button active />
          ) : (
            <Button size="large" type="primary" onClick={openAddBookDrawer}>
              {buttonTitle}
            </Button>
          )}
        </Col>
      </Row>
      <Table
        columns={columns}
        skeletonColumn={SKELETON_COLUMNS}
        skeletonRow={SKELETON_ROWS}
        loadingData={isLoading}
        loading={isRefetching}
        dataSource={
          (data &&
            data?.result?.map((item: any) => ({ ...item, key: item.id }))) ||
          []
        }
        dataNotFound={
          <EmptyBoxWrapper>
            <DataNotFound
              icon={<NoConfigIcon />}
              title="Books Not available"
              message={`You can add a book by clicking on "${buttonTitle}" button at top right corner`}
            />
          </EmptyBoxWrapper>
        }
      />

      {data?.result?.length && (
        <PaginationText type="secondary">
          Showing results {data?.result?.length} of {data?.count}{' '}
          {data?.result?.length > data?.count &&
            '| Scroll to load more results'}
        </PaginationText>
      )}

      <BookForm
        open={drawerVisible}
        bookData={book}
        hideDrawer={closeAddEditBookDrawer}
      />
      {/* Delete Modal  */}
      <DeleteBoard
        board={undefined}
        visible={deleteModalVisible}
        handleCancel={hideDeleteModal}
      />
      {/* View Modal */}
      <ViewBoard
        visible={viewModalVisible}
        board={undefined}
        handleCancel={hideViewModal}
      />
    </AppLayout>
  )
}

export default Books

const renderColumns: () => ColumnsType<any> = () => {
  return [
    {
      title: 'Board ID',
      dataIndex: 'bookId',
      key: 'bookId',
    },
    {
      title: 'Applicable On',
      key: 'tenants',
      dataIndex: 'tenants',
    },
    {
      title: 'Data Retention',
      dataIndex: 'data_retention',
      key: 'data_retention',
      filters: [
        { text: 'Enabled', value: 'RETENTION' },
        { text: 'Disabled', value: 'ROLLOVER' },
      ],
    },
    {
      title: 'Index Rollover',
      dataIndex: 'index_rollover',
      key: 'index_rollover',
      filters: [
        { text: 'Enabled', value: 'ROLLOVER' },
        { text: 'Disabled', value: 'RETENTION' },
      ],
    },
    {
      title: 'Last Updated On',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
    },
    {
      title: 'Created On',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      width: '170px',
    },
  ]
}

const useBooksListing = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [book, setBook] = useState<BookResponseType | undefined>(undefined)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(12)

  const { isLoading, data, refetch, isRefetching } = useGetBooks(pageSize)

  const showDeleteModal = (book: BookResponseType) => {
    setDeleteModalVisible(true)
    setBook(book)
  }
  const hideDeleteModal = () => {
    setDeleteModalVisible(false)
    setBook(undefined)
  }

  const showViewModal = (book: BookResponseType) => {
    setBook(book)
    setViewModalVisible(true)
  }
  const hideViewModal = useCallback(() => {
    setViewModalVisible(false)
    setBook(undefined)
  }, [])

  const closeAddEditBookDrawer = useCallback(() => {
    setBook(undefined)
    setDrawerVisible(false)
  }, [])

  const openAddBookDrawer = useCallback(() => {
    setBook(undefined)
    setDrawerVisible(true)
  }, [])

  const openEditBookDrawer = useCallback((book: BookResponseType) => {
    setBook(book)
    setDrawerVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setDrawerVisible(false)
  }, [])

  useEffect(() => {
    const tableContent: HTMLTableRowElement | null = document.querySelector(
      '.ant-table-body table tbody tr:last-of-type',
    )
    if (tableContent) {
      const observer = checkElementInView(
        data?.result || [],
        data?.count || 0,
        setPageSize,
        pageSize,
        refetch,
      )
      observer.observe(tableContent)
      return () => {
        observer.disconnect()
      }
    }
  }, [data?.result])

  return {
    openAddBookDrawer,
    openEditBookDrawer,
    closeAddEditBookDrawer,
    hideDrawer,
    showDeleteModal,
    hideDeleteModal,
    showViewModal,
    hideViewModal,
    deleteModalVisible,
    book,
    drawerVisible,
    viewModalVisible,
    pageSize,
    isLoading,
    isRefetching,
    data,
    refetch,
  }
}
