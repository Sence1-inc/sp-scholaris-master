import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'

interface PrivateRouteProps {
  component: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const user = useAppSelector((state) => state.persistedReducer.user)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/check_token', {
          params: { email: user.email_address },
          withCredentials: true,
        })
        setAuthenticated(response.data.valid)
        dispatch(initializeIsAuthenticated(response.data.valid))
      } catch (error) {
        if (error) {
          setAuthenticated(false)
          dispatch(initializeIsAuthenticated(false))
        }
      }
    }

    checkAuthentication()

    // eslint-disable-next-line
  }, [setAuthenticated])

  if (authenticated === null) {
    return null
  }

  return authenticated ? <Component /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
