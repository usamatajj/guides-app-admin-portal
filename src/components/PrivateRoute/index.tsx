import { AppLayout } from 'App'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import SideBar from 'components/layout/SideBar'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { retrieveUserData } from 'utils/dataStorage'

const PrivateRoute = () => {
  const auth = !!retrieveUserData()?.apiToken // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? (
    <>
      <Header />
      <AppLayout>
        <SideBar />
        <Main>
          <Outlet />
        </Main>
      </AppLayout>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
}
export default PrivateRoute
