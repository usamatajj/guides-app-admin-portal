import React, { ReactNode } from 'react'
import { Alert as AntAlert } from 'antd'

/**
 * About:
 * The alert that is used by Notification to pop up. The notification component uses react-toastify to pop up the content of the Alert component on the top right corner of the screen.
 * Note: This component is also used by storybook (named as Notification component) to display the content of the notification. The pop up feature provided by react-toastify was unable to render on the storybook ui
 */
/**
 * Props:
 * type: The type prop receives the type of notification it can be “success”, “info”, “warning” or “error”.
 * message: The message displays a short message. It receives a string.
 * description: The description displays a long message. It also receives a string.
 * icon: The icon receives an icon as a component
 * closable: The closable icon displays a close icon that hides and shows the notification.
 */

export type AlertProps = {
  type: 'success' | 'info' | 'warning' | 'error'
  message?: ReactNode
  description?: ReactNode
  closable?: boolean
  action?: ReactNode
  show?: boolean
  icon?: ReactNode
}

export default function Alert({
  message,
  description,
  action,
  type,
  icon,
  closable,
}: AlertProps) {
  return (
    <AntAlert
      type={type || 'info'}
      icon={icon}
      message={message}
      description={description}
      closable={closable}
      action={action}
      style={{ padding: '20px 20px 20px 24px' }}
      showIcon
    />
  )
}
