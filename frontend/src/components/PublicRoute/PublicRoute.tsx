import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch } from '../../redux/store'

interface PublicRouteProps {
  component: React.ComponentType<any>
  redirectPath?: string
  redirectIfAuthenticated?: boolean
  componentProps?: Record<string, any> 
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  redirectPath = '/',
  redirectIfAuthenticated = false,
  componentProps = {}
}) => {
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/check_token', {
          withCredentials: true,
        })
        setAuthenticated(response.data.valid)
        dispatch(initializeIsAuthenticated(response.data.valid))
        const userData = response.data.user || response.data.userData || response.data;
        if (userData && typeof userData === 'object') {
          dispatch(initializeUser(userData))
        }
      } catch (error) {
        console.error('Authentication check error:', error)
        setAuthenticated(false)
        dispatch(initializeIsAuthenticated(false))
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthentication()
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (authenticated && redirectIfAuthenticated) {
    return <Navigate to={redirectPath} replace />
  } else {
    return <Component />
  }
}

export default PublicRoute