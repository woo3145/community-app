import { isServerError } from '../typeGuards';

export const fetchApi = async <T>(
  url: string,
  option?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, option);

    const data = await res.json();

    if (!res.ok) {
      throw { statusCode: res.status, errors: data.errors };
    }

    return data;
  } catch (e) {
    if (isServerError(e)) {
      console.log('API Custom Error', e);
    } else {
      console.log('Fetching Error', e);
    }
    throw e;
  }
};
