import React, { ReactNode, useEffect, useMemo, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StyledCloseIcon } from './Notification.styles'
import {
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import Alert from '../Alert'

/**
 * About:
 * The Notification component pop up the Alert Component on the screen on the top right corner (View storybook for further information).
 */

/**
 * Props:
 * types: It receives string ('success' | 'info' | 'warning' | 'error') and renders the type of notification accordingly
 * title: It receives a component that renders onto the alert component
 * description: It also receives component that is of much detail and renders it onto the alert component
 * closable: It is a boolean that determines whether the component can have a close action or not
 * show: It receives a boolean that pop up the component onto the screen
 */

const toastProperties = {
  hideProgressBar: true,
  closeOnClick: false,
  autoClose: 4000,
  style: { margin: 0, padding: 0 },
}

export interface NotificationProps {
  type: 'success' | 'info' | 'warning' | 'error'
  title?: ReactNode
  description?: ReactNode
  closable?: boolean
  action?: ReactNode
  show?: boolean
}

export default function Notification({
  title,
  description,
  closable,
  action,
  type,
  show,
}: NotificationProps) {
  const renderIcons = useMemo(() => {
    switch (type) {
      case 'error':
        return <CloseCircleOutlined />
      case 'info':
        return <InfoCircleOutlined />
      case 'success':
        return <CheckCircleOutlined />
      case 'warning':
        return <WarningOutlined />
      default:
        return <InfoCircleOutlined />
    }
  }, [type])
  const popUpDisplayed = useRef(false)

  const CloseIcon = ({ closeToast }: any) => (
    <StyledCloseIcon onClick={closeToast} />
  )

  useEffect(() => {
    // The following check is used to avoid double renders in dev mode which is due to react strict mode
    if (show && popUpDisplayed.current === false) {
      toast(
        <Alert
          type={type || 'info'}
          icon={renderIcons}
          message={title}
          description={description}
          action={action}
          closable={closable}
        />,
        toastProperties,
      )
    }
    return () => {
      popUpDisplayed.current = true
    }
  }, [title, show, action, closable, description, type, renderIcons])

  return (
    <ToastContainer
      bodyStyle={{ padding: 0, margin: 0 }}
      closeButton={CloseIcon}
    />
  )
}
