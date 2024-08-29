import axios, { AxiosResponse } from 'axios'
import queryString from 'query-string'
import { useState } from 'react'
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
  const [areScholarshipsLoading, setAreScholarshipsLoading] =
    useState<boolean>(false)
  const { params } = data

  const getScholarships = async (isRedirected = true) => {
    try {
      setAreScholarshipsLoading(true)
      const response: AxiosResponse<Scholarships | ErrorResponse> =
        await axios.get(`${baseURL}/api/v1/scholarships`, {
          params: {
            ...params,
            limit: 10,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          timeout: 100000,
        })
      setAreScholarshipsLoading(false)
      if (response.status === 200) {
        dispatch(initializeScholarships(response.data as Scholarships))
        const queryParams = queryString.stringify(params)
        isRedirected && navigate(`/scholarships?${queryParams}`)
      }
    } catch (error) {
      setAreScholarshipsLoading(false)
      if (error) {
        dispatch(initializeScholarships([]))
        console.error('Error: ', error)
      }
    }
  }

  return { getScholarships, areScholarshipsLoading }
}

export default useGetScholarships
