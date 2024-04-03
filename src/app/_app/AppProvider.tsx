'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import AppContextProvider, {
  ApplicationType,
} from '@/client/context/AppContext'
import CustomerContextProvider from '@/client/context/CustomerContext'
import { useStudentInfo } from '@/client/store/student/info/selector'
import SITE_PATH, { isValidatePath } from '../site-path'
import ClientTo from './ClientTo'
import LoginForward from './LoginForward'

export default function AppProvider({
  children,
  applicationType,
  customerJson,
  isLogin,
}: {
  applicationType: string
  customerJson?: string
  isLogin?: boolean
  children?: ReactNode
}) {
  const path = usePathname()
  const loginStatus = useStudentInfo().login
  const isLoginForwardValidatePath = isValidatePath(path)

  let appType: ApplicationType = 'app'
  if (applicationType === 'private') {
    appType = 'private'
  } else if (applicationType === 'school') {
    appType = 'school'
  } else if (applicationType === 'academy') {
    appType = 'academy'
  }

  return (
    <AppContextProvider applicationType={appType}>
      <CustomerContextProvider customerJson={customerJson}>
        {children}
        {isLogin && loginStatus === 'unknown' && isLoginForwardValidatePath && (
          <LoginForward to={path} />
        )}
        {appType === 'app' && !isLogin && (
          <ClientTo to={SITE_PATH.ACCOUNT.MAIN} isReplace={true} />
        )}
      </CustomerContextProvider>
    </AppContextProvider>
  )
}
