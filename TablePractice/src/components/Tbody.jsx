import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Tbody({ i, tbodyInfos, setTbodyInfos, tbodyInfo, seletId, setSeletId }) {
  const [complete, setComplete] = useState('전공');
  const [essential, setEssential] = useState('필수');
  const [subject, setSubject] = useState('');
  const [credit, setCredit] = useState('');
  const [attendanceScore, setAttendanceScore] = useState('');
  const [projectScore, setProjectScore] = useState('');
  const [midterm, setMidterm] = useState(0);
  const [final, setFinal] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [grade, setGrade] = useState('');

  const FirstSection = [
    { name: '이수', value: complete, optionValues: ['전공', '교양'], setValue: setComplete },
    { name: '필수', value: essential, optionValues: ['필수', '선택'], setValue: setEssential },
    { name: '과목명', value: subject, setValue: setSubject },
  ];
  const SecondSection = [
    { name: '학점', value: credit, setValue: setCredit },
    { name: '출석점수', value: attendanceScore, setValue: setAttendanceScore },
    { name: '과제점수', value: projectScore, setValue: setProjectScore },
    { name: '중간고사', value: midterm, setValue: setMidterm },
    { name: '기말고사', value: final, setValue: setFinal },
  ];
  const ThirdSection = [
    { name: '총점', value: totalScore, setValue: setTotalScore },
    { name: '평균', value: averageScore, setValue: setAverageScore },
    { name: '성적', value: grade, setValue: setGrade },
  ];
  const OnePointSection = [
    { name: '총점', value: [], setValue: setTotalScore },
    { name: '평균', value: [], setValue: setAverageScore },
    { name: '성적', value: ['P', 'NP'], setValue: setGrade },
  ];

  const inputValue = (e, value, setValue, regex) => {
    const inputValue = e.target.value;
    if (regex && !regex.test(inputValue)) {
      alert(
        '다음의 규칙을 지켜주세요 ! \n학점은 0~3까지 입력 가능합니다. \n출석점수와 과제점수는 0~20까지 입력 가능합니다. \n중간고사와 기말고사는 0~30까지 입력 가능합니다.',
      );
      setValue('');
      return;
    }
    setValue(inputValue);
  };
  const subjectInputValue = (e, value, setValue) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    for (const tbodyInfo of tbodyInfos)
      if (inputValue === tbodyInfo.subject && inputValue !== '') {
        alert('이미 등록 된 과목입니다');
        setValue('');
        return;
      }
  };
  const getgrade = (totalScore) => {
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

  useEffect(() => {
    const copyInfos = [...tbodyInfos];
    const updateData = {
      complete: complete,
      essential: essential,
      subject: subject,
      credit: +credit,
      attendanceScore: +attendanceScore,
      projectScore: +projectScore,
      midterm: +midterm,
      final: +final,
      totalScore: +totalScore,
      averageScore: +averageScore,
      grade: grade,
    };
    copyInfos[i] = updateData;
    setTbodyInfos(copyInfos);
  }, [complete, essential, subject, credit, attendanceScore, projectScore, midterm, final]);

  useEffect(() => {
    if (tbodyInfo.credit === 1) {
      setAttendanceScore(0);
      setProjectScore(0);
      setMidterm(0);
      setFinal(0);
      setTotalScore(0);
    }
    setComplete(tbodyInfo.complete);
    setEssential(tbodyInfo.essential);
    setSubject(tbodyInfo.subject);
    setCredit(tbodyInfo.credit !== 0 ? tbodyInfo.credit : '');
    setAttendanceScore(tbodyInfo.attendanceScore !== 0 ? tbodyInfo.attendanceScore : '');
    setProjectScore(tbodyInfo.projectScore !== 0 ? tbodyInfo.projectScore : '');
    setMidterm(tbodyInfo.midterm !== 0 ? tbodyInfo.midterm : '');
    setFinal(tbodyInfo.final !== 0 ? tbodyInfo.final : '');
    setTotalScore(
      +tbodyInfo.attendanceScore + +tbodyInfo.projectScore + +tbodyInfo.midterm + +tbodyInfo.final,
    );
    setAverageScore((totalScore / 4).toFixed(0));
    setGrade(tbodyInfo.totalScore !== 0 ? getgrade(totalScore) : '');
  }, [tbodyInfos]);

  return (
    <tbody>
      <tr
        className={`${
          seletId === i ? 'bg-violet-300' : 'bg-violet-100'
        } transition-all hover:bg-violet-300 cursor-pointer`}
        onClick={() => {
          setSeletId(i);
        }}
      >
        {FirstSection.map((el) => {
          return (
            <td key={el.name} className='border'>
              {el.name === '과목명' ? (
                <input
                  type='text'
                  value={el.value}
                  className='w-36 bg-violet-100'
                  onChange={(e) => {
                    subjectInputValue(e, el.value, el.setValue);
                  }}
                />
              ) : (
                <select
                  className='w-full bg-violet-100'
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue);
                  }}
                  value={el.value}
                >
                  {el.optionValues.map((optionValue) => {
                    return (
                      <option key={optionValue} value={optionValue}>
                        {optionValue}
                      </option>
                    );
                  })}
                </select>
              )}
            </td>
          );
        })}
        {SecondSection.map((el) => {
          return (
            <td key={el.name} className='border'>
              {el.name === '학점' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(''|[0-3])$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                />
              )}
              {el.name === '출석점수' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|1[0-9]|20)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.credit === 1}
                />
              )}
              {el.name === '과제점수' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|1[0-9]|20)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.credit === 1}
                />
              )}
              {el.name === '중간고사' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|[12]\d|30)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.credit === 1}
                />
              )}
              {el.name === '기말고사' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|[12]\d|30)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.credit === 1}
                />
              )}
            </td>
          );
        })}
        {tbodyInfo.credit !== 1
          ? ThirdSection.map((el) => {
              return (
                <td
                  key={el.name}
                  className={`${el.value === 'F' ? 'bg-red-300' : ''} text-center border`}
                >
                  {el.value}
                </td>
              );
            })
          : OnePointSection.map((el) => {
              return (
                <td key={el.name} className='border'>
                  {el.name === '성적' ? (
                    <select className='bg-violet-100'>
                      {el.value.map((el2, i) => {
                        return (
                          <option key={i} value={el2}>
                            {el2}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <p>{el.value}</p>
                  )}
                </td>
              );
            })}
      </tr>
    </tbody>
  );
}
Tbody.propTypes = {
  i: PropTypes.number.isRequired,
  tbodyInfo: PropTypes.object.isRequired,
  tbodyInfos: PropTypes.array.isRequired,
  setTbodyInfos: PropTypes.any.isRequired,
  seletId: PropTypes.number.isRequired,
  setSeletId: PropTypes.any.isRequired,
};
