import React, { createContext, useState } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// Create a provider component
export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CaptainDataContext.Provider value={{captain, setCaptain, loading, setLoading, error, setError }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainDataContext;