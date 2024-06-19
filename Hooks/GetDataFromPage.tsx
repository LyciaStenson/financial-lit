'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ActivityData {
  points?: number | null;
  time?: number | null;
  totalAnsweredCorrect?: number | null;
  totalQuestions?: number | null;
  day:number | null;
}

type DataContextType = {
  value: ActivityData;
  setValue: (value: ActivityData) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<ActivityData>(() => {
    // Load initial state from local storage
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('activityData');
      return storedValue ? JSON.parse(storedValue) : {};
    }
    return {};
  });

  useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem('activityData', JSON.stringify(value));
  }, [value]);

  return (
    <DataContext.Provider value={{ value, setValue }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within an AppProvider');
  }
  return context;
};

export { DataProvider, useDataContext };
