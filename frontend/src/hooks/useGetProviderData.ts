import { AxiosResponse } from 'axios'
import axiosInstance from '../axiosConfig'
import { initializeProvider } from '../redux/reducers/ProviderDataReducer'
import { useAppDispatch } from '../redux/store'
import { ProviderData } from '../redux/types'

interface ErrorResponse {
  error: string
  details: string[]
}

const useProviderData = () => {
  const dispatch = useAppDispatch()
  const getProviderData = async (id: string | undefined) => {
    try {
      const response: AxiosResponse<ProviderData | ErrorResponse> =
        await axiosInstance.get(`api/v1/scholarship_provider_profiles/${id}`)

      if (response.status === 200) {
        dispatch(initializeProvider(response.data as ProviderData))
      }
    } catch (error) {
      dispatch(initializeProvider({}))
      console.error('Error: ', error)
    }
  }

  return { getProviderData }
}

export default useProviderData