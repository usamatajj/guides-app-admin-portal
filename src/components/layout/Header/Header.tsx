import React from 'react'
import Logo from 'assets/images/logo.svg'
import { HeaderLayout, HeaderLogo } from './Header.style'

export default function Header() {
  return (
    <HeaderLayout>
      <HeaderLogo src={Logo} shape="square" />
    </HeaderLayout>
  )
}
