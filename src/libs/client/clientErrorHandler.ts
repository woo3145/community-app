import { toast } from 'react-toastify';
import { isError, isServerError } from '../typeGuards';

// catch(e){} 에서 e타입으로
export const errorHandlerWithToast = (e: unknown) => {
  // 서버에서 발생시킨 에러
  if (isServerError(e)) {
    e.errors.forEach((error) => {
      toast.error(error.message);
    });
    // 클라이언트에서 발생시킨 에러
  } else if (isError(e)) {
    toast.error(e.message);
    //그외
  } else {
    toast.error(
      '예상치 못한 에러가 발생하였습니다. 잠시 후 다시 시도해주세요.'
    );
  }
};
