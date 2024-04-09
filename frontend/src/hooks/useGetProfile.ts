import { AxiosResponse } from 'axios'
import axiosInstance from '../axiosConfig'
import { initializeProfile } from '../redux/reducers/ProfileReducer'
import { useAppDispatch } from '../redux/store'
import { Profile } from '../redux/types'

interface ErrorResponse {
  error: string
  details: string[]
}

const useGetProfile = () => {
  const dispatch = useAppDispatch()
  const getProfile = async (id: number | undefined) => {
    try {
      const response: AxiosResponse<Profile | ErrorResponse> =
        await axiosInstance.get(`api/v1/scholarship_provider_profiles/${id}`)

      if (response.status === 200) {
        console.log('provider data', response.data)
        dispatch(initializeProfile(response.data as Profile))
      }
    } catch (error) {
      dispatch(initializeProfile({}))
      console.error('Error: ', error)
    }
  }

  return { getProfile }
}

export default useGetProfile
