import { AxiosResponse } from 'axios'
import axiosInstance from '../axiosConfig'
import { Scholarship } from '../redux/types'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { initializeScholarships } from '../redux/reducers/ScholarshipsReducer'
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'

interface ErrorResponse {
  error: string
  details: string[]
}

const isAccessTokenSet = (): boolean => {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    console.log(cookie)
    if (cookie.startsWith('access_token=')) {
      return true
    }
  }
  return false
}

const useGetScholarships = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useAppSelector((state) => state.searchParams)

  const getScholarships = async (isRedirected = true) => {
    console.log(isAccessTokenSet())
    const endpoint = isAccessTokenSet()
      ? 'api/v1/scholarships/provider_scholarships'
      : 'api/v1/scholarships'

    try {
      const response: AxiosResponse<Scholarship[] | ErrorResponse> =
        await axiosInstance.get(endpoint, {
          params: { ...params },
          withCredentials: isAccessTokenSet(),
        })

      if (response.status === 200) {
        dispatch(initializeScholarships(response.data as Scholarship[]))
        const queryParams = queryString.stringify(params.params)
        isRedirected && navigate(`/scholarships?${queryParams}`)
      }
    } catch (error) {
      dispatch(initializeScholarships([]))
      console.error('Error: ', error)
    }
  }

  return { getScholarships }
}

export default useGetScholarships
