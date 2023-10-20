import { Tooltip } from 'antd'
import React from 'react'

/**
 * About:
 * The MaxTagPlaceholder is used by ant-design select dropdown maxTagPlaceholder prop (Visit Storybook for further information).
 */
/**
 * Props:
 * data: It receives an array of objects that are visually omitted in a select dropdown.
 */

export type MaxTagPlaceholderProps = {
  data?: any[]
}

export default function MaxTagPlaceholder({ data }: MaxTagPlaceholderProps) {
  return data ? (
    <Tooltip
      placement="bottom"
      color="black"
      title={data?.map((item, i) => (
        <div key={i}>{item.label}</div>
      ))}
    >
      {`+${data?.length}`}
    </Tooltip>
  ) : null
}
