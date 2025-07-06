
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  const SessionProviderComponent = SessionProvider as any
  return (
    <SessionProviderComponent>
      {children}
    </SessionProviderComponent>
  )
}
