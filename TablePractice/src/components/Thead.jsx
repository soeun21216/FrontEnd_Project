export default function Thead() {
  const FirstSection = [{ name: '이수' }, { name: '필수' }, { name: '과목명' }];
  const SecondSection = [
    { name: '학점' },
    { name: '출석점수' },
    { name: '과제점수' },
    { name: '중간고사' },
    { name: '기말고사' },
  ];
  const ThirdSection = [{ name: '총점' }, { name: '평균' }, { name: '성적' }];
  return (
    <thead className='bg-violet-300'>
      <tr className=''>
        {FirstSection.map((el) => {
          return (
            <th key={el.name} className='border'>
              <p className='min-w-fit'>{el.name}</p>
            </th>
          );
        })}
        {SecondSection.map((el) => {
          return (
            <th key={el.name} className='border'>
              {el.name}
            </th>
          );
        })}
        {ThirdSection.map((el) => {
          return (
            <th key={el.name} className='border'>
              {el.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
