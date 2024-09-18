//@context/UnitContext.js
import { createContext, useState } from 'react';

// Unit Context
export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState('metric');

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};