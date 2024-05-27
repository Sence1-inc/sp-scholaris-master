import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
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

  const formatDate = (date: string | number | Date | null) => {
    const initialDate = new Date(date as string)
    dayjs.extend(utc)
    return dayjs(initialDate).utc().format()
  }

  const getScholarships = async (isRedirected = true) => {
    try {
      let start_date = ''
      let due_date = ''
      if (params.start_date) {
        start_date = formatDate(params.start_date)
      }

      if (params.due_date) {
        due_date = formatDate(params.due_date)
      }

      const response: AxiosResponse<Scholarships | ErrorResponse> =
        await axios.get(`${baseURL}/api/v1/scholarships`, {
          params: {
            ...params,
            limit: 10,
            ...(start_date && { start_date }),
            ...(due_date && { due_date }),
          },
          timeout: 100000,
        })

      if (response.status === 200) {
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
