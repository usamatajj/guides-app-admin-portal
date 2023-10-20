import { Input, Typography, Collapse, Space } from 'antd'
import styled from 'styled-components'
const { Panel } = Collapse

export const ViewPolicyContainer = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.2fr 1fr;
  grid-row-gap: 20px;
`

export const SearchInput = styled(Input.Search)`
  .ant-btn {
    border-color: #d9d9d9;
  }
`
export const SearchResultsInfo = styled(Typography)`
  font-size: 0.9rem;
`

export const TenantPanel = styled(Panel)`
  background-color: #ffffff;
  .ant-collapse-content {
    background-color: #f9fcff;
  }
`

export const IndicesHeading = styled(Typography)`
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
