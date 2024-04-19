import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosConfig'
import { initializeScholarshipData } from '../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch } from '../redux/store'
import { ScholarshipData } from '../redux/types'

interface ErrorResponse {
  error: string
  details: string[]
}

const useGetScholarshipsData = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const getScholarshipData = async (id: string | undefined) => {
    try {
      const response: AxiosResponse<ScholarshipData | ErrorResponse> =
        await axiosInstance.get(`api/v1/scholarships/${id}`, {
          withCredentials: true,
        })

      if (response.status === 200) {
        dispatch(initializeScholarshipData(response.data as ScholarshipData))
      }
    } catch (error: any) {
      if (error) {
        dispatch(initializeScholarshipData({}))
        navigate('/404')
      }
    }
  }

  return { getScholarshipData }
}

export default useGetScholarshipsData
