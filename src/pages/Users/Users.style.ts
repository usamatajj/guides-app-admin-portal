import styled from 'styled-components'
import { Layout, Tag as AntTag, Typography } from 'antd'

export const AppLayout = styled(Layout.Content)`
  background: #fff;
  min-height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  padding: 35px 35px 25px;
`

export const Tag = styled(AntTag)`
  font-size: 14px;
`

export const StatusCell = styled.div`
  text-align: center;
`

export const SkeletonRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 4fr 3fr 2fr 1fr;
  column-gap: 20px;
  padding: 20px 0 5px;
  border-bottom: 1px solid #f0f0f0;
`

export const FileContent = styled.textarea`
  background: #e8eff7;
  padding: 18px 20px;
  width: 100%;
  min-height: 280px;
  max-height: 300px;
  resize: none;
  border: none;
  line-height: 1.8;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00000073;
    border-radius: 10px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

export const PaginationText = styled(Typography.Text)`
  display: block;
  padding: 20px;
  text-align: center;
  width: 100%;
`

export const EmptyBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 233px);
  max-height: calc(100vh - 233px);
`

export const ModalSubTitle = styled(Typography.Text)`
  font-size: 16px;
  line-height: 1.4;
  display: block;
  padding: 0 0 12px;
`

export const MainTitle = styled(Typography.Title)`
  &.ant-typography {
    font-size: 18px;
    margin: 0;
  }
`

export const ModalTitle = styled(Typography.Text)`
  font-size: 16px;
  line-height: 1.1;
  display: block;
  padding: 0 0 20px 0;
`

export const AudienceText = styled(Typography.Text)`
  font-size: 16px;
  line-height: 1.1;
  display: block;
  padding: 0 0 12px 15px;
`
