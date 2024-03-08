import { AxiosResponse } from 'axios'
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
  const getScholarshipData = async (id: string | undefined) => {
    console.log(id)
    try {
      const response: AxiosResponse<ScholarshipData | ErrorResponse> =
        await axiosInstance.get(`api/v1/scholarships/${id}`)

      if (response.status === 200) {
        dispatch(initializeScholarshipData(response.data as ScholarshipData))
      }
    } catch (error) {
      dispatch(initializeScholarshipData([]))
      console.error('Error: ', error)
    }
  }

  return { getScholarshipData }
}

export default useGetScholarshipsData
