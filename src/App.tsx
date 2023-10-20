import React from 'react'
import './App.css'
import 'antd/dist/antd.less'
import { Layout } from 'antd'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Boards from 'pages/Boards'
import Classes from 'pages/Classes'
import Users from 'pages/Users'
import Books from 'pages/Books'
import Login from 'pages/Login'
import VerifyOTP from 'pages/VerifyOTP'
import PrivateRoute from 'components/PrivateRoute'

export const AppLayout = styled(Layout)`
  background: #fff;
  min-height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow: hidden;
  .content {
    padding: 35px 35px 25px;
  }
`

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="boards" element={<Boards />} />
          <Route path="classes" element={<Classes />} />
          <Route path="users" element={<Users />} />
          <Route path="books" element={<Books />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
