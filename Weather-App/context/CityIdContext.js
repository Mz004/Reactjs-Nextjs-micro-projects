//@context/CityIdContext.js
import { createContext, useState } from 'react';

// City Id Context
export const CityIdContext = createContext();

export const CityIdProvider = ({ children }) => {
  const [cityId, setCityId] = useState('');

  return (
    <CityIdContext.Provider value={{ cityId, setCityId }}>
      {children}
    </CityIdContext.Provider>
  );
};