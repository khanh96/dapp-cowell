import React, { useState } from 'react'

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return {
    isModalOpen,
    setIsModalOpen
  }
}
