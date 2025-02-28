import { AxiosResponse } from 'axios'
import axiosInstance from '../axiosConfig'
import { initializeUser } from '../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Profile } from '../redux/types'

interface ErrorResponse {
  error: string
  details: string[]
}

/**
 * A custom hook to fetch and manage the user profile.
 *
 * @returns An object containing the `getProfile` function to fetch the user profile.
 */
const useGetProfile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  /**
   * Fetches the user profile by ID.
   *
   * @param id - The ID of the user profile to fetch.
   * @returns A promise that resolves when the profile is fetched.
   */
  const getProfile = async (id: number | undefined) => {
    try {
      const response: AxiosResponse<Profile | ErrorResponse> =
        await axiosInstance.get(`api/v1/scholarship_provider_profiles/${id}`, {
          withCredentials: true,
        })

      if (response.status === 200) {
        dispatch(initializeUser({ ...user, profile: response.data as Profile }))
      }
    } catch (error) {
      if (error) {
        dispatch(initializeUser({ ...user, profile: undefined }))
      }
    }
  }

  return { getProfile }
}

export default useGetProfile
