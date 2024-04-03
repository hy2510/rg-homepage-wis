'use client'

import { ReactNode } from 'react'
import useAccountInfoLoading from '../uiz/library/_mode/useAccountInfoLoading'

export default function AccountInfoLoading({
  children,
}: {
  children?: ReactNode
}) {
  const isLoading = useAccountInfoLoading()
  if (isLoading) {
    return <div>Loading Account Info</div>
  }
  return <>{children}</>
}
