import React, { useState } from 'react'

interface ModalContextInterface {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const initialModalContext = {
  isModalOpen: false,
  setIsModalOpen: () => null
}

export const ModalContext = React.createContext<ModalContextInterface>(initialModalContext)

export const ModalContextProvider = ({
  children,
  defaultValue = initialModalContext
}: {
  children: React.ReactNode
  defaultValue?: ModalContextInterface
}) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValue.isModalOpen)

  return (
    <ModalContext.Provider
      value={{
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
