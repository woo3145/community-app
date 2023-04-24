import { toast } from 'react-toastify';
import { isErrorResponse } from '../typeGuards';

// catch(e){} 에서 e타입으로
export const errorHandlerWithToast = (e: unknown) => {
  if (isErrorResponse(e)) {
    e.response.data.errors.forEach((error) => {
      toast.error(error.message);
    });
  } else {
    toast.error(
      '예상치 못한 에러가 발생하였습니다. 잠시 후 다시 시도해주세요.'
    );
  }
};
