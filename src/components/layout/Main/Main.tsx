import React, { PropsWithChildren } from 'react'
import { BodyStyle } from './Main.styles'

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return <BodyStyle>{children}</BodyStyle>
}

export default Main
