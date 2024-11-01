import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [overallProgress, setOverallProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ overallProgress, setOverallProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
