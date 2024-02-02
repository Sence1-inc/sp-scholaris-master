import { AxiosResponse } from 'axios';
import axiosInstance from '../axiosConfig';
import { Scholarship } from '../redux/types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { initializeScholarships } from '../redux/reducers/ScholarshipsReducer';
import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
  error: string;
  details: string[];
}

const useGetScholarships = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useAppSelector((state) => state.searchParams);

  const getScholarships = async (isRedirected: boolean) => {
    try {
      const response: AxiosResponse<Scholarship[] | ErrorResponse> = await axiosInstance.get(
        `api/v1/scholarships`, params // Pass parameters properly
      );

      if (response.status === 200) {
        dispatch(initializeScholarships(response.data as Scholarship[]));
        isRedirected && navigate('/search-result');
      } 
    } catch (error) {
      dispatch(initializeScholarships([]))
      console.error('Error: ', error);
    }
  };

  return { getScholarships };
};

export default useGetScholarships;
