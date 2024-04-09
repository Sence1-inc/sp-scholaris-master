import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'

interface PrivateRouteProps {
  component: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/check_token', {
          withCredentials: true,
        })
        console.log(response)
        setAuthenticated(response.data.valid)
      } catch (error) {
        console.error('Error checking authentication:', error)
        setAuthenticated(false)
      }
    }

    checkAuthentication()
  }, [setAuthenticated])

  if (authenticated === null) {
    return null
  }

  return authenticated ? <Component /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
