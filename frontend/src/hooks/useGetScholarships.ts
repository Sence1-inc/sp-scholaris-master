import axios, { AxiosResponse } from 'axios'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../axiosConfig'
import {
  initializeScholarships,
  Scholarships,
} from '../redux/reducers/ScholarshipsReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

interface ErrorResponse {
  error: string
  details: string[]
}

const useGetScholarships = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const data = useAppSelector((state) => state.searchParams)
  const { params } = data

  const getScholarships = async (isRedirected = true) => {
    try {
      const response: AxiosResponse<Scholarships | ErrorResponse> =
        await axios.get(`${baseURL}/api/v1/scholarships`, {
          params: { ...params, ...{ page: 1, limit: 10 } },
          timeout: 100000,
        })

      if (response.status === 200) {
        console.log('response', response)
        dispatch(initializeScholarships(response.data as Scholarships))
        const queryParams = queryString.stringify(params)
        isRedirected && navigate(`/scholarships?${queryParams}`)
      }
    } catch (error) {
      if (error) {
        dispatch(initializeScholarships([]))
        console.error('Error: ', error)
      }
    }
  }

  return { getScholarships }
}

export default useGetScholarships
