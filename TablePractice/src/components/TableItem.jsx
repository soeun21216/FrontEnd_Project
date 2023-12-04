import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Thead from './Thead';
import Tbody from './Tbody';
export default function TableItem({ title }) {
  const [seletId, setSeletId] = useState(0);
  const [tbodyInfos, setTbodyInfos] = useState([
    {
      complete: '전공',
      essential: '필수',
      subject: '',
      credit: '',
      attendanceScore: 0,
      projectScore: 0,
      midterm: 0,
      final: 0,
      totalScore: 0,
      averageScore: 0,
      grade: '',
    },
  ]);
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, '']);

  const getGrade = (totalScore) => {
    if (totalScore >= 95) return 'A+';
    if (totalScore >= 90) return 'A';
    if (totalScore >= 85) return 'B+';
    if (totalScore >= 80) return 'B0';
    if (totalScore >= 75) return 'C+';
    if (totalScore >= 70) return 'C0+';
    if (totalScore >= 65) return 'D+';
    if (totalScore >= 60) return 'D0';
    if (totalScore < 60) return 'F';
  };

  const resultCalc = (tbodyInfos) => {
    const copyResult = [];
    let sumOfCredit = 0;
    let sumOfAttendanceScore = 0;
    let sumOfProjectScore = 0;
    let sumOfMidterm = 0;
    let sumOfFinal = 0;
    let sumOfTotalScore = 0;
    let cnt = tbodyInfos.length;
    for (const tbodyInfo of tbodyInfos) {
      if (tbodyInfo.credit === 1) {
        cnt = cnt - 1;

        tbodyInfo.attendanceScore = 0;
        continue;
      } else {
        sumOfCredit = sumOfCredit + +tbodyInfo.credit;
        sumOfAttendanceScore = sumOfAttendanceScore + +tbodyInfo.attendanceScore;
        sumOfProjectScore = sumOfProjectScore + +tbodyInfo.projectScore;
        sumOfMidterm = sumOfMidterm + +tbodyInfo.midterm;
        sumOfFinal = sumOfFinal + +tbodyInfo.final;
        sumOfTotalScore = sumOfTotalScore + +tbodyInfo.totalScore;
      }
    }
    if (sumOfTotalScore === '') {
      sumOfTotalScore = 0;
    }
    copyResult.push(sumOfCredit);
    copyResult.push(sumOfAttendanceScore);
    copyResult.push(sumOfProjectScore);
    copyResult.push(sumOfMidterm);
    copyResult.push(sumOfFinal);
    copyResult.push(+sumOfTotalScore);
    copyResult.push(+(sumOfTotalScore / cnt).toFixed(1));
    copyResult.push(sumOfTotalScore === 0 ? '' : getGrade(+sumOfTotalScore / cnt));

    return copyResult;
  };

  const 저장 = () => {
    const copyResult = resultCalc(tbodyInfos);

    setResult(copyResult);
    const copyTbodyInfos = [...tbodyInfos];
    copyTbodyInfos.sort((a, b) => {
      if (a.complete === b.complete) {
        if (a.essential === b.essential) {
          return a.subject.localeCompare(b.subject);
        }
        return a.essential.localeCompare(b.essential);
      }
      return a.complete.localeCompare(b.complete);
    });
    setTbodyInfos(copyTbodyInfos);
  };

  const 추가 = () => {
    const copyTbodys = [...tbodyInfos];
    const tbody = {
      complete: '전공',
      essential: '필수',
      subject: '',
      credit: '',
      attendanceScore: 0,
      projectScore: 0,
      midterm: 0,
      final: 0,
      totalScore: 0,
      averageScore: 0,
      grade: '',
    };
    copyTbodys.push(tbody);
    setTbodyInfos(copyTbodys);
  };

  const 삭제 = () => {
    const copyResult = resultCalc(tbodyInfos);
    setResult(copyResult);
    if (tbodyInfos.length > 1) {
      const copyResult = resultCalc(tbodyInfos);
      setResult(copyResult);
      setTbodyInfos((prevTbodyInfos) => {
        const copyTbodys = [...prevTbodyInfos];
        copyTbodys.splice(seletId, 1);
        return copyTbodys;
      });
    } else {
      alert('하나 이상의 과목이 필요합니다.');
    }
  };

  useEffect(() => {
    const copyResult = resultCalc(tbodyInfos);
    setResult(copyResult);
  }, [tbodyInfos]);
  return (
    <div key={title} className='flex flex-col gap-4'>
      <div className='flex w-full justify-between'>
        <h1 className='text-2xl ml-3 font-bold'>{title}</h1>
        <div className='flex gap-4'>
          <button
            className='bg-violet-600 text-white w-12 p-2 rounded-md hover:scale-110 transition-all hover:bg-violet-700'
            onClick={추가}
          >
            추가
          </button>
          <button
            className='bg-violet-600 text-white w-12 p-2 rounded-md hover:scale-110 transition-all hover:bg-violet-700'
            onClick={저장}
          >
            저장
          </button>
          <button
            className='bg-red-600 text-white w-12 p-2 rounded-md hover:scale-110 transition-all hover:bg-red-700'
            onClick={삭제}
          >
            삭제
          </button>
        </div>
      </div>
      <table className='w-full'>
        <Thead />
        {tbodyInfos.map((tbodyInfo, i) => {
          return (
            tbodyInfo && (
              <Tbody
                key={i}
                i={i}
                tbodyInfos={tbodyInfos}
                setTbodyInfos={setTbodyInfos}
                tbodyInfo={tbodyInfo}
                seletId={seletId}
                setSeletId={setSeletId}
              />
            )
          );
        })}
        <tbody className='bg-violet-300'>
          <tr className='text-center'>
            <td colSpan={3} className='border'>
              합계
            </td>
            {result.map((el, i) => {
              return (
                <td className='border text-center' key={i}>
                  {isNaN(el) ? '' : el}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
TableItem.propTypes = {
  title: PropTypes.string.isRequired,
};
