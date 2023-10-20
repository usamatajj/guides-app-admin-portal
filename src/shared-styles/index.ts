import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'
import { Divider, Tag, Typography, Input } from 'antd'

export const ColumnDataTag = styled(Tag)`
  background-color: #eceff0;
  padding: 2px;
  font-size: 1rem;
`
export const StyledCloseIcon = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  padding-top: 5px;
  padding-right: 5px;
`

export const SelectDataTag = styled(Tag)`
  background-color: #f5f5f5;
  border: 1px solid #f0f0f0;
  padding: 1px;
  font-size: 0.9rem;
`

export const FormRowDivider = styled(Divider)`
  margin: 5px 0;
  border-top: 1px dotted rgba(0, 0, 0, 0.06);
`

// Modal
export const ModalContent = styled.div`
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

export const StyledTextArea = styled(Input.TextArea)`
  resize: none;
`

type GridTitleProps = {
  remSize?: string
}

type ShadowGridItemProps = {
  widthPercent?: string
}

export const GridCenter = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
`

export const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`

export const GridTitle = styled.h2<GridTitleProps>`
  font-size: ${props => props && props.remSize}rem;
  text-align: center;
  font-weight: bold;
`

export const ShadowGridItem = styled.div<ShadowGridItemProps>`
  width: ${(props: any) => props.widthPercent}px;
  padding: 10px;
  border: 1px solid rgba(107, 102, 102, 0.5);
  border-radius: 15px;
  box-shadow: -0px 0px\8px #d9d9d9, 0px -0px 8px #e7e7e7;
`
