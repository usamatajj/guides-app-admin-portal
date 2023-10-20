import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import NoConfigIcon from '../../assets/icons/no-config'
import UserForm from '../../components/UserForm'
import ViewBoard from '../../components/ViewBoard'
import Table from 'components/common/Table'
import DataNotFound from 'components/common/DataNotFound'
import { useGetBoards } from '../../utils/apis/boards'
import { SKELETON_COLUMNS, SKELETON_ROWS } from '../../utils/const'
import { checkElementInView } from '../../utils/helpers'
import { AppLayout, EmptyBoxWrapper, PaginationText } from './Users.style'
import DeleteBoard from '../../components/DeleteBoard'
import { Button, Col, Row, Skeleton, Typography } from 'antd'
import { BoardResponseType, UserResponseType } from 'utils/types'
import { ColumnsType } from 'antd/es/table'

const { Title } = Typography
const buttonTitle = 'Add New User'
const Users: React.FC = () => {
  // prettier-ignore
  const {
    // Methods
    // Drawer Methods
    openAddUserDrawer,
    closeAddEditUserDrawer,
    // Delete Modal Methods
    hideDeleteModal,
    // View Modal Methods,
    hideViewModal,
    drawerVisible,
    // Variables 
    deleteModalVisible,   // boolean
    selectedUser,               // User object
    viewModalVisible,     // boolean
    // React Query Returns
    isLoading,
    isRefetching,
    data,
  } = useUsersListing()

  const columns = useMemo(() => renderColumns(), [data?.result])

  return (
    <AppLayout>
      <Row style={{ marginBottom: '20px' }} wrap={false}>
        <Col flex="auto">
          <Title level={3}>Users Listing</Title>
        </Col>
        <Col flex="none">
          {isLoading ? (
            <Skeleton.Button active />
          ) : (
            <Button size="large" type="primary" onClick={openAddUserDrawer}>
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
              title="Users Not available"
              message={`You can add a board by clicking on "${buttonTitle}" button at top right corner`}
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

      <UserForm
        open={drawerVisible}
        userData={selectedUser}
        hideDrawer={closeAddEditUserDrawer}
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

export default Users

const renderColumns: () => ColumnsType<any> = () => {
  return [
    {
      title: 'User ID',
      dataIndex: 'boardId',
      key: 'boardId',
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

const useUsersListing = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<
    UserResponseType | undefined
  >(undefined)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(12)

  const { isLoading, data, refetch, isRefetching } = useGetBoards(pageSize)

  const showDeleteModal = (selectedUser: UserResponseType) => {
    setDeleteModalVisible(true)
    setSelectedUser(selectedUser)
  }
  const hideDeleteModal = () => {
    setDeleteModalVisible(false)
    setSelectedUser(undefined)
  }

  const showViewModal = (board: BoardResponseType) => {
    setSelectedUser(board)
    setViewModalVisible(true)
  }
  const hideViewModal = useCallback(() => {
    setViewModalVisible(false)
    setSelectedUser(undefined)
  }, [])

  const closeAddEditUserDrawer = useCallback(() => {
    setSelectedUser(undefined)
    setDrawerVisible(false)
  }, [])

  const openAddUserDrawer = useCallback(() => {
    setSelectedUser(undefined)
    setDrawerVisible(true)
  }, [])

  const openEditUserDrawer = useCallback((selectedUser: UserResponseType) => {
    setSelectedUser(selectedUser)
    setDrawerVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setSelectedUser(undefined)
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
    openAddUserDrawer,
    openEditUserDrawer,
    closeAddEditUserDrawer,
    hideDrawer,
    showDeleteModal,
    hideDeleteModal,
    showViewModal,
    hideViewModal,
    deleteModalVisible,
    selectedUser,
    drawerVisible,
    viewModalVisible,
    pageSize,
    isLoading,
    isRefetching,
    data,
    refetch,
  }
}
