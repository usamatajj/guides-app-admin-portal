import { Tag, Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
/**
 * About:
 * The MaxTagCell component display list of tags with maxLimit indicator (Visit storybook for further information).
 */
/**
 * Props:
 * data: The data prop receives an array of objects.
 * name: The name receives the name of the property that the object has in the data prop e.g name property in list of employees.
 * maxLimit: Max Limit receives a number that indicates how many tags to display.
 */

export const ColumnDataTag = styled(Tag)`
  background-color: #eceff0;
  padding: 2px;
  font-size: 1rem;
  margin: 1px 2px;
`

export type MaxTagCellProps = {
  data: any[]
  name: string
  maxLimit: number
}

export default function MaxTagCell({ data, name, maxLimit }: MaxTagCellProps) {
  return (
    <>
      {data?.slice(0, maxLimit).map((item: any, i: number) => (
        <ColumnDataTag key={i}>{item[name]}</ColumnDataTag>
      ))}
      {data?.length > maxLimit && (
        <Tooltip
          placement="bottom"
          title={data?.slice(maxLimit)?.map((item: any, i) => (
            <div key={i}>{item[name]}</div>
          ))}
        >
          <ColumnDataTag>{`+${data?.length - maxLimit}`}</ColumnDataTag>
        </Tooltip>
      )}
    </>
  )
}
