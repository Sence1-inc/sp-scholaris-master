import { useState } from 'react'
import axiosInstance from '../axiosConfig'
import { initializeSubscirber } from '../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

/**
 * A custom hook to fetch and manage subscriber data.
 *
 * @returns An object containing the `getSubscriber` function to fetch subscriber data and an error message.
 */
const useGetSubscriber = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const [errorMessage, setErrorMessage] = useState<string>('')

  /**
   * Fetches subscriber data based on the user's scholarship provider ID.
   *
   * @returns A promise that resolves when the subscriber data is fetched.
   */
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
