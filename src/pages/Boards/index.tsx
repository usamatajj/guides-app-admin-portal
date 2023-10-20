import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import NoConfigIcon from '../../assets/icons/no-config'
import BoardForm from '../../components/BoardForm'
import ViewBoard from '../../components/ViewBoard'
import Table from 'components/common/Table'
import DataNotFound from 'components/common/DataNotFound'
import { useGetBoards } from '../../utils/apis/boards'
import { SKELETON_COLUMNS, SKELETON_ROWS } from '../../utils/const'
import { checkElementInView } from '../../utils/helpers'
import { AppLayout, EmptyBoxWrapper, PaginationText } from './Boards.style'
import DeleteBoard from '../../components/DeleteBoard'
import { Button, Col, Row, Skeleton, Typography } from 'antd'
import { BoardResponseType } from 'utils/types'
import { ColumnsType } from 'antd/es/table'

const { Title } = Typography
const buttonTitle = 'Add New Board'
const Boards: React.FC = () => {
  // prettier-ignore
  const {
    // Methods
    // Drawer Methods
    openAddBoardDrawer,
    closeAddEditBoardDrawer,
    // Delete Modal Methods
    hideDeleteModal,
    // View Modal Methods,
    hideViewModal,
    drawerVisible,
    // Variables 
    deleteModalVisible,   // boolean
    board,               // board object
    viewModalVisible,     // boolean
    // React Query Returns
    isLoading,
    isRefetching,
    data,
  } = useBoardsListing()

  const columns = useMemo(() => renderColumns(), [data?.result])

  return (
    <AppLayout>
      <Row style={{ marginBottom: '20px' }} wrap={false}>
        <Col flex="auto">
          <Title level={3}>Boards Listing</Title>
        </Col>
        <Col flex="none">
          {isLoading ? (
            <Skeleton.Button active />
          ) : (
            <Button size="large" type="primary" onClick={openAddBoardDrawer}>
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
              title="Boards Not available"
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

      <BoardForm
        open={drawerVisible}
        boardData={board}
        hideDrawer={closeAddEditBoardDrawer}
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

export default Boards

const renderColumns: () => ColumnsType<any> = () => {
  return [
    {
      title: 'Board ID',
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

const useBoardsListing = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [board, setBoard] = useState<BoardResponseType | undefined>(undefined)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(12)

  const { isLoading, data, refetch, isRefetching } = useGetBoards(pageSize)

  const showDeleteModal = (board: BoardResponseType) => {
    setDeleteModalVisible(true)
    setBoard(board)
  }
  const hideDeleteModal = () => {
    setDeleteModalVisible(false)
    setBoard(undefined)
  }

  const showViewModal = (board: BoardResponseType) => {
    setBoard(board)
    setViewModalVisible(true)
  }
  const hideViewModal = useCallback(() => {
    setViewModalVisible(false)
    setBoard(undefined)
  }, [])

  const closeAddEditBoardDrawer = useCallback(() => {
    setBoard(undefined)
    setDrawerVisible(false)
  }, [])

  const openAddBoardDrawer = useCallback(() => {
    setBoard(undefined)
    setDrawerVisible(true)
  }, [])

  const openEditBoardDrawer = useCallback((board: BoardResponseType) => {
    setBoard(board)
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
    openAddBoardDrawer,
    openEditBoardDrawer,
    closeAddEditBoardDrawer,
    hideDrawer,
    showDeleteModal,
    hideDeleteModal,
    showViewModal,
    hideViewModal,
    deleteModalVisible,
    board,
    drawerVisible,
    viewModalVisible,
    pageSize,
    isLoading,
    isRefetching,
    data,
    refetch,
  }
}
