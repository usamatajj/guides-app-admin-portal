import { Tooltip } from 'antd'
import React, { ReactNode } from 'react'
import { StyledToolTip } from './WhiteTooltip.style'

export type WhiteTooltipProps = {
  children: ReactNode | ReactNode[]
  title: ReactNode | ReactNode[]
  placement:
    | 'bottomRight'
    | 'bottom'
    | 'bottomLeft'
    | 'right'
    | 'rightTop'
    | 'leftBottom'
    | 'left'
    | 'leftTop'
    | 'top'
    | 'topLeft'
}

const WhiteTooltip: React.FC<WhiteTooltipProps> = ({
  children,
  title,
  placement,
}) => {
  return (
    <StyledToolTip>
      <Tooltip
        placement={placement}
        color="white"
        title={title}
        getPopupContainer={triggerNode => triggerNode}
      >
        {children}
      </Tooltip>
    </StyledToolTip>
  )
}

export default WhiteTooltip
