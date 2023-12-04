import { createContext, useContext, useState } from 'react';

const GradeContext = createContext();

export const useGradeContext = () => {
  return useContext(GradeContext);
};

export const GradeProvider = ({ children }) => {
  const [grade, setGrade] = useState({ 총점: 0 });

  return <GradeContext.Provider value={{ grade, setGrade }}>{children}</GradeContext.Provider>;
};
