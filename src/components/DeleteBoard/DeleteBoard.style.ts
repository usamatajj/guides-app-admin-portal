import { Collapse, Space, Typography } from 'antd'
import styled from 'styled-components'

export const DeleteTenantCollapse = styled(Collapse)`
  width: 100%;
`

export const DeleteTenantPanel = styled(Collapse.Panel)`
  background-color: #ffffff;
  .ant-collapse-content {
    background-color: #f9fcff;
    // overflow-y: scroll;
    // height: 40vh;
  }
  .ant-collapse-header-text {
    width: 100%;
  }
`

export const DeleteBoardSpace = styled(Space)`
  width: 100%;
`

export const TenantHeading = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 12px 0;
`

export const IndicConnectingLine = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 1px;
    bottom: 10px;
    width: 10px;
    border: 1px solid #bbc6d3;
    border-top: none;
    border-right: none;
  }
`

export const IndicItem = styled(Space)`
  padding: 0 0 0 20px;
`
