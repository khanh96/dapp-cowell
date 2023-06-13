import React, { useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const initialAppContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => null
}

export const AppContext = React.createContext<AppContextInterface>(initialAppContext)

export const AppContextProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
