import { AxiosResponse } from 'axios';
import axiosInstance from '../axiosConfig';
import { Scholarship } from '../redux/types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { initializeScholarships } from '../redux/reducers/ScholarshipsReducer';
import { useNavigate } from 'react-router-dom'; 
import queryString from 'query-string';

interface ErrorResponse {
  error: string;
  details: string[];
}

const useGetScholarships = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useAppSelector((state) => state.searchParams);

  const getScholarships = async () => {
    try {
      const response: AxiosResponse<Scholarship[] | ErrorResponse> = await axiosInstance.get(
        `api/v1/scholarships`, params
      );

      if (response.status === 200) {
        const queryParams = queryString.stringify(params.params);
        dispatch(initializeScholarships(response.data as Scholarship[]));
        navigate(`/scholarships?${queryParams}`);
      } 
    } catch (error) {
      dispatch(initializeScholarships([]))
      console.error('Error: ', error);
    }
  };

  return { getScholarships };
};

export default useGetScholarships;
