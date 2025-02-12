import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { initializeScholarshipData } from '../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch } from '../redux/store'
import { ScholarshipData } from '../redux/types'

interface ErrorResponse {
  error: string
  details: string[]
}

/**
 * A custom hook to fetch and manage scholarship data.
 *
 * @returns An object containing the `getScholarshipData` function to fetch scholarship data by ID.
 */
const useGetScholarshipsData = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  /**
   * Fetches scholarship data by ID.
   *
   * @param id - The ID of the scholarship to fetch.
   * @returns A promise that resolves when the scholarship data is fetched.
   */
  const getScholarshipData = async (id: string | undefined) => {
    try {
      const response: AxiosResponse<ScholarshipData | ErrorResponse> =
        await axios.get(`api/v1/scholarships/${id}`, {
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
