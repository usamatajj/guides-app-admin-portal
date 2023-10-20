import { Button, Col, Collapse, Modal, Row, Space } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { MainTitle, ModalContent } from '../../shared-styles'

import {
  IndicConnectingLine,
  IndicItem,
  IndicesHeading,
  SearchInput,
  SearchResultsInfo,
  TenantPanel,
} from './ViewBoard.style'

interface ViewPolicyProps {
  board?: any
  visible: boolean
  handleCancel: () => void
}

const ViewPolicy: React.FC<ViewPolicyProps> = ({
  board,
  visible,
  handleCancel,
}) => {
  const { searchResults, searchText, searchTenant, closeModal } = useViewPolicy(
    handleCancel,
    board,
  )
  // useMemo
  const renderSearchTenantsInfo = useMemo(() => {
    if (searchText === '') {
      return <></>
    } else {
      return (
        <Row>
          <Col>
            <SearchResultsInfo aria-label="search_result_info">
              Showing {searchResults?.length} result:
            </SearchResultsInfo>
          </Col>
        </Row>
      )
    }
  }, [searchText, searchResults])

  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      title={<MainTitle level={4}>Policy Tenants & Indices Details</MainTitle>}
      footer={
        <Button role={'button'} type="primary" onClick={closeModal}>
          Close
        </Button>
      }
      onCancel={closeModal}
      cancelText="Close"
    >
      <ModalContent>
        <Space
          direction="vertical"
          style={{ width: '100%' }}
          size={searchResults?.length ? 'large' : 'small'}
        >
          <Row>
            <Col>
              <SearchInput
                role="searchbox"
                aria-label="search_tenant"
                placeholder="Search"
                onChange={searchTenant}
                value={searchText}
              />
            </Col>
          </Row>
          <Row>
            <Space direction="vertical" style={{ width: '100%' }}>
              {renderSearchTenantsInfo}
              {[
                ...(searchText ? searchResults || [] : board?.tenants || []),
              ]?.map((tenant, index) => (
                <Collapse expandIconPosition="end" key={index}>
                  <TenantPanel
                    key={tenant?.id}
                    header={tenant?.tenantName}
                    aria-label={tenant.tenantName}
                  >
                    <IndicesHeading>{`Indices (${tenant?.indices?.length})`}</IndicesHeading>

                    {tenant?.indices?.map((item: any, i: number) => (
                      <IndicConnectingLine key={i}>
                        <IndicItem aria-label="indice-name">
                          {item?.indexName}
                        </IndicItem>
                      </IndicConnectingLine>
                    )) || 'No Indices'}
                  </TenantPanel>
                </Collapse>
              ))}
            </Space>
          </Row>
        </Space>
      </ModalContent>
    </Modal>
  )
}

export default ViewPolicy

const useViewPolicy = (handleCancel: () => void, board?: any) => {
  const [searchResults, setSearchResults] = useState<any[] | undefined>([])
  const [searchText, setSearchText] = useState('')

  // useCallbacks
  const searchTenant = useCallback(
    (e: any) => {
      setSearchText(e.target.value)
      if (e.target.value)
        setSearchResults(
          board?.tenants.filter((item: any) =>
            item?.tenantName
              ?.toLowerCase()
              .includes(e.target.value.toLowerCase()),
          ),
        )
    },
    [board],
  )
  const closeModal = useCallback(() => {
    setSearchText('')
    handleCancel()
  }, [handleCancel])

  return { searchText, searchResults, searchTenant, closeModal }
}
