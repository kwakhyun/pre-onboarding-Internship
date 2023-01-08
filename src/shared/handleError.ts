import { AxiosError } from "axios";

export const handleError = (error: AxiosError) => {
  if (error.response) {
    console.error(error.response.data);
  } else if (error.request) {
    console.error("응답이 없습니다. 서버가 정상 작동하는지 확인하세요.");
  } else {
    console.error("알 수 없는 오류가 발생했습니다.");
  }
};
