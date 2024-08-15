import { useState } from 'react'
import axiosInstance from '../axiosConfig'
import { initializeSubscirber } from '../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

const useGetSubscriber = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const getSubscriber = async () => {
    if (user.scholarship_provider.id) {
      try {
        const subs = await axiosInstance.get(
          `api/v1/subscribers/${user.scholarship_provider.id}`
        )

        if (subs.data) {
          dispatch(initializeSubscirber(subs.data))
        }
      } catch (error: any) {
        setErrorMessage(error.response.data.message)
      }
    }
  }

  return { getSubscriber, errorMessage }
}

export default useGetSubscriber
