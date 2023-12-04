import { useState } from 'react';

const useGrade = () => {
  const [grades, setGrades] = useState({
    이수: '전공',
    필수: '교양',
    과목명: '',
    학점: 0,
    출석점수: 0,
    과제점수: 0,
    중간고사: 0,
    기말고사: 0,
    총점: '',
    평균: '',
    성적: '',
  });

  return [grades, setGrades];
};

export default useGrade;
