'use client'

import { useLoginAction } from '@/app/_app/LoginProvider'
import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { ReactNode, useRef, useState } from 'react'
import { useCustomerInfo } from '@/client/context/CustomerContext'
import { Button, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_sign_in'

export default function LoginFormAcademy({
  customHeader,
}: {
  customHeader?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  const onLogin = useLoginAction()

  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const loginIdInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const customerName = useCustomerInfo().customerGroupName
  const isLoginDisabled = !loginId || !password

  return (
    <>
      <div className={style.logIn_group_member}>
        {customHeader}
        <TextField
          ref={loginIdInputRef}
          id={'user-id'}
          hint={'아이디'}
          onTextChange={(text) => setLoginId(text)}
          value={loginId}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              if (!isLoginDisabled) {
                onLogin({ id: loginId, password })
              } else if (loginId && !password) {
                passwordInputRef?.current?.focus()
              }
            }
          }}
        />
        <TextField
          ref={passwordInputRef}
          id={'user-passowrd'}
          hint={'비밀번호'}
          password
          onTextChange={(text) => setPassword(text)}
          value={password}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              if (!isLoginDisabled) {
                onLogin({ id: loginId, password })
              } else if (!loginId && password) {
                loginIdInputRef?.current?.focus()
              }
            }
          }}
        />
        <Button
          shadow={!isLoginDisabled}
          color={isLoginDisabled ? 'gray' : undefined}
          onClick={() => {
            if (!isLoginDisabled) {
              onLogin({ id: loginId, password })
            }
          }}>
          로그인
        </Button>
        <div className={style.row_box}>
          <Link href={SITE_PATH.ACCOUNT.FORGOT_PASSWORD}>비밀번호 찾기</Link>
        </div>
        <div className={style.comment}>
          {`❗️ 아이디와 비밀번호는 '${customerName}'에서 발급해 드려요.`}
        </div>
      </div>
    </>
  )
}
