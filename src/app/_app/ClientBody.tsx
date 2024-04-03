'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

export default function ClientBody({ children }: { children?: ReactNode }) {
  const [overflow, setOverflow] = useState('auto')

  return (
    <ClientBodyContext.Provider value={{ overflow, setOverflow }}>
      <body style={{ overflow }}>{children}</body>
    </ClientBodyContext.Provider>
  )
}

const ClientBodyContext = createContext<{
  overflow: string
  setOverflow?: (overflow: string) => void
}>({
  overflow: 'auto',
})

export function useSetOverflow() {
  const context = useContext(ClientBodyContext)
  return context.setOverflow
}
