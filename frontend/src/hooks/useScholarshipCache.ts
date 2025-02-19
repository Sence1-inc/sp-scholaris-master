import { useCallback, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { initializeScholarships } from '../redux/reducers/ScholarshipsReducer'
import axiosInstance from '../axiosConfig'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * @interface CacheEntry
 * @description Structure for cached scholarship data
 * @property {any} data - The cached scholarship data
 * @property {number} timestamp - Timestamp when the data was cached
 */
interface CacheEntry {
  data: any
  timestamp: number
}

const cache: { [key: string]: CacheEntry } = {}

/**
 * A custom hook for managing scholarship data with caching.
 *
 * This hook provides functionality to fetch scholarships while caching the results
 * for a specified duration. It also allows clearing the cache when needed.
 *
 * @returns {Object} An object containing the following functions:
 * - `getScholarships(isRedirected: boolean)`: Fetches scholarships based on current parameters,
 *   utilizing cached data if available and valid. If redirected, it navigates to the scholarships page.
 * - `clearCache()`: Clears all cached scholarship data.
 *
 * @example
 * const { getScholarships, clearCache } = useScholarshipCache();
 * // Fetch scholarships with caching
 * getScholarships();
 * // Clear the cache when needed
 * clearCache();
 */
export const useScholarshipCache = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useAppSelector((state) => state.searchParams.params)
  const isLoadingRef = useRef(false)
  const paramsRef = useRef(params)

  useEffect(() => {
    paramsRef.current = params

    // eslint-disable-next-line
  }, [params])

  const getCacheKey = (params: any) => {
    return JSON.stringify(params)
  }

  const isValidCache = (entry: CacheEntry) => {
    return Date.now() - entry.timestamp < CACHE_DURATION
  }

  const debouncedFetch = useCallback(
    debounce(async (isRedirected: boolean) => {
      if (isLoadingRef.current) return
      
      try {
        isLoadingRef.current = true
        const currentParams = paramsRef.current
        const cacheKey = getCacheKey(currentParams)
        const cachedData = cache[cacheKey]

        if (cachedData && isValidCache(cachedData)) {
          dispatch(initializeScholarships(cachedData.data))
          if (isRedirected) {
            const queryParams = queryString.stringify(currentParams)
            navigate(`/scholarships?${queryParams}`)
          }
          isLoadingRef.current = false
          return
        }

        const response = await axiosInstance.get(`/api/v1/scholarships`, {
          params: {
            ...currentParams,
            limit: 10,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          timeout: 100000,
        })

        if (response.status === 200) {
          cache[cacheKey] = {
            data: response.data,
            timestamp: Date.now(),
          }

          dispatch(initializeScholarships(response.data))
          if (isRedirected) {
            const queryParams = queryString.stringify(currentParams)
            navigate(`/scholarships?${queryParams}`)
          }
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error)
        dispatch(initializeScholarships({ scholarships: [], total_count: 0 }))
      } finally {
        isLoadingRef.current = false
      }
    }, 500),
    [dispatch, navigate]
  )

  const getScholarships = useCallback(
    (isRedirected = true) => {
      if (!isLoadingRef.current) {
        debouncedFetch(isRedirected)
      }
    },
    [debouncedFetch]
  )

  const clearCache = () => {
    Object.keys(cache).forEach((key) => delete cache[key])
  }

  return { getScholarships, clearCache }
} 