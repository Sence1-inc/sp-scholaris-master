import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance, { initialUserState } from '../../axiosConfig'
import { ADMIN_ROLE_ID } from '../../constants/constants'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'

interface AdminPrivateProps {
  component: any
}

const AdminPrivate: React.FC<AdminPrivateProps> = ({
  component: Component,
}) => {
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const user = useAppSelector((state) => state.persistedReducer.user)

  useEffect(() => {
    const logout = async () => {
      await axiosInstance.post('/api/v1/logout', {
        email: user.email_address,
      })
    }

    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/check_token', {
          withCredentials: true,
        })
        setAuthenticated(response.data.valid)

        if (!response.data.valid) {
          await logout()
          dispatch(initializeUser(initialUserState))
        }

        dispatch(initializeIsAuthenticated(response.data.valid))
        dispatch(initializeUser(response.data.user))
      } catch (error) {
        setAuthenticated(false)
        dispatch(initializeIsAuthenticated(false))
      }
    }

    checkAuthentication()

    // eslint-disable-next-line
  }, [setAuthenticated])

  if (authenticated === null) {
    return null
  }

  return authenticated && user.role.id === ADMIN_ROLE_ID ? (
    <Component />
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default AdminPrivate
