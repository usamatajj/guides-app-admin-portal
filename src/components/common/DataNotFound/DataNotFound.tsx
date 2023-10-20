import { Empty, Typography } from 'antd'
import React, { ReactNode } from 'react'
import { Para } from './DataNotFound.style'

/**
 * About:
 * The DataNotFound component displays the data not found message in case empty record returned by the server
 */

/**
 * Props:
 * message: The message prop receives string to display on the screen.
 * title: The title displays the title
 * icon: The icon prop receives any icon component to render on teh screen
 */

export type DataNotFoundProps = {
  icon?: ReactNode
  message?: string
  title?: string
}

export default function DataNotFound({
  icon = Empty.PRESENTED_IMAGE_DEFAULT,
  message = 'Data not found',
  title = 'Error 404',
}: DataNotFoundProps) {
  return (
    <Empty
      image={icon}
      description={
        <>
          <Typography.Title level={4}>{title}</Typography.Title>
          <Para>{message}</Para>
        </>
      }
    />
  )
}
