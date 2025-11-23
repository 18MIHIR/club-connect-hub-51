import { createContext, useContext, useState, ReactNode } from 'react';

export type CollegeType = 'LNCT Main' | 'LNCT & S' | 'LNCTE';

interface CollegeContextType {
  selectedCollege: CollegeType;
  setSelectedCollege: (college: CollegeType) => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCollege, setSelectedCollege] = useState<CollegeType>('LNCT Main');

  return (
    <CollegeContext.Provider value={{ selectedCollege, setSelectedCollege }}>
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useCollege must be used within CollegeProvider');
  }
  return context;
};
