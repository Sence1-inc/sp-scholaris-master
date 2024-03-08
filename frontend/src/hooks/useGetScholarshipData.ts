import { AxiosResponse } from "axios";
import axiosInstance from "../axiosConfig";
import { initializeScholarshipData } from "../redux/reducers/ScholarshipDataReducer";
import { useAppDispatch } from "../redux/store";
import { ScholarshipDatas } from "../redux/types";

interface ErrorResponse {
  error: string;
  details: string[];
}

const useGetScholarshipsData = () => {
  const dispatch = useAppDispatch();
  const getScholarshipData = async (id: string | undefined) => {
    console.log(id);
    try {
      const response: AxiosResponse<ScholarshipDatas | ErrorResponse> =
        await axiosInstance.get(`api/v1/scholarships/${id}`);

      if (response.status === 200) {
        dispatch(initializeScholarshipData(response.data as ScholarshipDatas));
      }

      //   const queryParams = queryString.stringify(params.params);
      // }
    } catch (error) {
      dispatch(initializeScholarshipData([]));
      console.error("Error: ", error);
    }
  };

  return { getScholarshipData };
};

export default useGetScholarshipsData;
