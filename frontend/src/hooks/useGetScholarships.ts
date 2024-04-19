import { AxiosResponse } from 'axios'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosConfig'
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
        await axiosInstance.get('api/v1/scholarships', {
          params: { ...params, ...{ limit: 10 } },
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
