import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { useAppDispatch } from '../../redux/store'

interface PrivateRouteProps {
  component: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/check_token', {
          withCredentials: true,
        })
        setAuthenticated(response.data.valid)
        dispatch(initializeIsAuthenticated(response.data.valid))
      } catch (error) {
        console.error('Error checking authentication:', error)
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

  return authenticated ? <Component /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
