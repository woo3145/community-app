import { isServerError } from '../typeGuards';

export const fetchApi = async <T>(
  url: string,
  option?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, option);
    const data = await res.json();
    // res의 응답이 200번대가 아니면 data에는 에러 객체를 담고있음 {message: string, statusCode: numbear}
    if (!res.ok) {
      throw data;
    }
    return data;
  } catch (e) {
    // fetchApi의 에러 형태는 {message: string, statusCode: number}로 통일
    if (isServerError(e)) {
      console.log('API Custom Error', e);
      throw e;
    } else {
      console.log('Fetching Error', e);
      throw {
        message: 'Fetching Error',
        statusCode: 500,
      };
    }
  }
};
