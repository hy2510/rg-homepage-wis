'use client'

import LoginContextProvider from '@/app/_app/LoginProvider'
import { useApplicationType } from '@/client/context/AppContext'
import LoginForm from './LoginForm'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormIntegrated from './LoginFormIntegrated'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'

export default function Login() {
  const appType = useApplicationType()

  return (
    <LoginContextProvider>
      <LoginForm>
        {appType === 'private' && <LoginFormPrivate />}
        {appType === 'school' && <LoginFormSchool />}
        {appType === 'academy' && <LoginFormAcademy />}
        {appType === 'app' && <LoginFormIntegrated />}
      </LoginForm>
    </LoginContextProvider>
  )
}
