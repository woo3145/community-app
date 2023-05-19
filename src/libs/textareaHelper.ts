// 개행문자가 3개이상 쓰인경우 2개로 바꿔줌 (중간에 공백도 검사)
export const mergeNewlines = (str: string): string => {
  return str.replace(/(\s*\n\s*){3,}/g, '\n\n');
};
