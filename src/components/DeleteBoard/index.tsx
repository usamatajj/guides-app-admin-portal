import React, { Fragment } from 'react'
import { Button, Modal, Row, Tooltip, Typography } from 'antd'
import { MainTitle, ModalContent } from '../../shared-styles'
import { DeleteBoardSpace } from './DeleteBoard.style'

interface DeleteBoardProps {
  visible: boolean
  handleCancel: () => void
  board?: any
}

const DeleteBoard: React.FC<DeleteBoardProps> = ({
  handleCancel,
  visible,
  board,
}) => {
  // const deleteBoard = () => {
  //   const policyObject: any = {
  //     id: policy?.id,
  //     policyId: policy?.policyId,
  //   }
  //   mutate(policyObject)
  // }

  // useEffect(() => {
  //   if (isSuccess) handleCancel()
  // }, [isSuccess])

  // const renderNotification = useMemo(() => {
  //   if (isSuccess) {
  //     return (
  //       <Notification
  //         type="success"
  //         description="Board Deleted Successfully!"
  //         show={true}
  //         closable
  //       />
  //     )
  //   }
  //   if (isError) {
  //     return (
  //       <Notification
  //         type="error"
  //         description={error?.message}
  //         show={true}
  //         closable
  //       />
  //     )
  //   }
  //   return null
  // }, [isSuccess, isError, error?.message])

  return (
    <>
      <Modal
        open={visible}
        destroyOnClose={true}
        title={<MainTitle level={4}>Delete Board</MainTitle>}
        onCancel={handleCancel}
        footer={[
          <Button
            key={'cancel-01'}
            size="large"
            onClick={handleCancel}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>,
          <Tooltip
            key={'delete-01'}
            title={
              board?.tenants &&
              board.tenants?.length > 0 &&
              'Cannot Delete Board with indices'
            }
            placement="bottom"
          >
            <Button
              aria-label="delete_button"
              danger
              type="primary"
              size="large"
              onClick={() => {
                console.log('deleted')
              }}
              loading={false}
            >
              Delete
            </Button>
          </Tooltip>,
        ]}
      >
        <ModalContent>
          <DeleteBoardSpace direction="vertical" size={'large'}>
            <Row>
              <Typography.Paragraph>
                This will delete the The policy <b role="heading">asdasd</b>{' '}
                will no longer be applicable on any tenant or indices this
                action is irreversible. Do you want to proceed?
              </Typography.Paragraph>
            </Row>
          </DeleteBoardSpace>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteBoard
