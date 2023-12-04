export const 출석정규식 = /^(?:[0-9]|1[0-9]|20)$/;
export const 중간기말정규식 = /^(?:[0-9]|1[0-9]|20|30)$/;
export const 총점정규식 = /^(?:[0-9]|[1-9][0-9]|100)$/;

export const 출석정규식체크 = (phoneNumber) => {
  const 출석정규식 = /^(?:[0-9]|1[0-9]|20)$/;
  return 출석정규식.test(phoneNumber);
};
