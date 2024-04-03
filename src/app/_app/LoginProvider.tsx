'use client'

import React, { useContext, useState } from 'react'
import { useCustomerInfo } from '@/client/context/CustomerContext'
import { useFetchSignin } from '@/client/store/account/signin/hook'
import SITE_PATH from '../site-path'
import { setTempolaryAccount } from '../uiz/account/account-list/_fn/account-list'
import LoginForward from './LoginForward'

type LoginContextProps = {
  action: {
    login: (params: {
      id: string
      password: string
      deviceType?: string
      redirectPath?: string
      onError?: (error: unknown) => void
    }) => void
  }
}

const LoginContext = React.createContext<LoginContextProps | undefined>(
  undefined,
)

export default function LoginContextProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const { customerId } = useCustomerInfo()

  const [redirect, setRedirect] = useState('')
  const { fetch: signinFetch } = useFetchSignin()
  const loginAction = ({
    id,
    password,
    deviceType = 'TEST_DEVICE',
    redirectPath,
    onError,
  }: {
    id: string
    password: string
    deviceType?: string
    redirectPath?: string
    onError?: (error: unknown) => void
  }) => {
    if (redirect) {
      return
    }
    if (!id) {
      return
    }
    if (!password) {
      return
    }
    signinFetch({
      id,
      password,
      deviceType,
      callback: (data) => {
        if (data.success) {
          setTempolaryAccount({
            customerId: customerId,
            loginId: id,
          })
          setRedirect(redirectPath ? redirectPath : SITE_PATH.HOME.MAIN)
        } else {
          onError && onError(data.error)
        }
      },
    })
  }
  return (
    <LoginContext.Provider
      value={{
        action: {
          login: loginAction,
        },
      }}>
      {children}
      {redirect && <LoginForward to={redirect} />}
    </LoginContext.Provider>
  )
}

export function useLoginAction() {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.action.login
}
