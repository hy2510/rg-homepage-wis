'use client'

import LoginContextProvider, { useLoginAction } from '@/app/_app/LoginProvider'
import SITE_PATH from '@/app/site-path'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useApplicationType } from '@/client/context/AppContext'
import {
  useChangeCustomer,
  useClearCustomer,
  useCustomerInfo,
} from '@/client/context/CustomerContext'
import { useFetchFindCustomer } from '@/client/store/customer/info/hook'
import { Button, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import {
  Account,
  deleteAccountGetResult,
  getAccountList,
} from './_fn/account-list'

const STYLE_ID = 'page_account_list'

export default function Page() {
  const style = useStyle(STYLE_ID)

  const [redirect, setRedirect] = useState<string>('')
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    const accountList = [...getAccountList()]
    if (accountList.length > 0) {
      setAccounts(accountList)
    } else {
      setRedirect(SITE_PATH.ACCOUNT.SIGN_IN)
    }
  }, [])

  const onDeleteAccountCard = (account: Account) => {
    const accountList = deleteAccountGetResult(account)
    if (accountList.length > 0) {
      setAccounts(accountList)
    } else {
      setRedirect(SITE_PATH.ACCOUNT.SIGN_IN)
    }
  }

  const appType = useApplicationType()
  const clearCustomer = useClearCustomer()
  const onClickAddAccount = () => {
    if (appType === 'app') {
      clearCustomer()
    }
    setRedirect(SITE_PATH.ACCOUNT.SIGN_IN)
  }

  return (
    <main className={style.account_list}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>리딩게이트</div>
        <div className={style.sentence}>읽는 즐거움, 커가는 영어실력</div>
      </div>
      <div className={`${style.account_card_list} container compact`}>
        {accounts &&
          accounts.length > 0 &&
          accounts.map((account) => {
            return (
              <AccountCard
                key={`${account.loginId}#${account.customerName}#${account.studentName}`}
                account={account}
                onDeleteAccountCard={onDeleteAccountCard}
              />
            )
          })}
      </div>
      <div className={style.add_account}>
        <Link
          href={''}
          className={style.add_account_button}
          onClick={(e) => {
            e.preventDefault()
            onClickAddAccount()
          }}>
          <div className={style.plus_icon}>
            <Image
              alt=""
              src="/src/images/plus-icons/plus-circle-blue.svg"
              width={24}
              height={24}
            />
          </div>
          <div className={style.txt_label}>계정추가</div>
        </Link>
      </div>
      {redirect && <RedirectGo to={redirect} />}
    </main>
  )
}

function RedirectGo({ to }: { to: string }) {
  const router = useRouter()
  useEffect(() => {
    if (to) {
      router.replace(to)
    }
  }, [to, router])
  return <></>
}

const MoreItem = ({
  children,
  onClick,
}: {
  children?: ReactNode
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.more_item} onClick={onClick}>
      {children}
    </div>
  )
}

const MoreButton = ({ onDeleteClick }: { onDeleteClick?: () => void }) => {
  const style = useStyle(STYLE_ID)

  const [isMenuOpen, _isMenuOpen] = useState(false)

  return (
    <div
      className={style.more_button}
      onClick={() => {
        !isMenuOpen && _isMenuOpen(true)
      }}>
      {isMenuOpen ? (
        <>
          <div className={style.more_items_container}>
            <MoreItem>
              <CheckButton text={'입장시 비밀번호 입력하기'} />
            </MoreItem>
            <MoreItem>
              <span
                style={{ color: '#b3b9c2' }}
                onClick={() => {
                  if (confirm('선택한 계정을 목록에서 삭제하시겠어요?')) {
                    onDeleteClick && onDeleteClick()
                    _isMenuOpen(false)
                  }
                }}>
                목록에서 계정 삭제
              </span>
            </MoreItem>
          </div>
          <div
            className={style.screen_block}
            onClick={() => {
              isMenuOpen ? _isMenuOpen(false) : _isMenuOpen(true)
            }}></div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

const CheckButton = ({ text }: { text?: string }) => {
  const [isChecked, _isChecked] = useState(true)

  return (
    <div
      onClick={() => {
        isChecked ? _isChecked(false) : _isChecked(true)
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
      {text}
      {isChecked ? (
        <Image
          alt=""
          src={'/src/images/check-icons/check_box_on.svg'}
          width={24}
          height={24}
        />
      ) : (
        <Image
          alt=""
          src={'/src/images/check-icons/check_box_off.svg'}
          width={24}
          height={24}
        />
      )}
    </div>
  )
}

const AccountCard = ({
  account,
  onDeleteAccountCard,
}: {
  account: Account
  onDeleteAccountCard?: (account: Account) => void
}) => {
  const style = useStyle(STYLE_ID)

  const { customerId, customerName, loginId, studentName, avatar } = account
  const appType = useApplicationType()

  const { customerId: settingCustomerId } = useCustomerInfo()
  const changeCustomer = useChangeCustomer()

  const findCustomer = useFetchFindCustomer()
  const [selectCustomer, setSelectCustomer] = useState<string | undefined>(
    undefined,
  )
  const onFindCustomer = () => {
    if (appType !== 'app') {
      setSelectCustomer(customerId)
      return
    }
    if (settingCustomerId && settingCustomerId === customerId) {
      setSelectCustomer(customerId)
    } else {
      findCustomer.fetch({
        customerId,
        callback: (data) => {
          if (data.success && data.payload) {
            changeCustomer(data.payload)
            setSelectCustomer(customerId)
          }
        },
      })
    }
  }

  return (
    <div className={style.account_card}>
      {/* 비밀번호를 치고 로그인을 해야하는 상태 표시 */}
      <div className={style.auto_login_lock}>
        <Image
          alt=""
          src="/src/images/lock-icons/lock.svg"
          width={18}
          height={18}
        />
      </div>
      {/* 오토 로그인 상태 표시 */}
      {/* <div className={style.auto_login_unlock}>
        <Image alt=""  
          src="/src/images/lock-icons/unlock.svg"
          width={18}
          height={18}
        />
      </div> */}
      <MoreButton
        onDeleteClick={() => {
          onDeleteAccountCard && onDeleteAccountCard(account)
        }}
      />
      <div
        className={style.user_avatar}
        onClick={() => {
          onFindCustomer()
        }}>
        <Image alt="" src={avatar} width={150} height={150} />
      </div>
      <div
        className={style.user_info}
        onClick={() => {
          onFindCustomer()
        }}>
        <div className={style.user_name}>{studentName}</div>
        <div className={style.user_id}>( {loginId} )</div>
      </div>
      <div className={style.user_info_more}>{customerName}</div>
      {selectCustomer && (
        <LoginContextProvider>
          <PasswordInput
            account={account}
            onDismiss={() => {
              setSelectCustomer(undefined)
            }}
          />
        </LoginContextProvider>
      )}
    </div>
  )
}

const PasswordInput = ({
  account,
  onDismiss,
}: {
  account: Account
  onDismiss?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  const { customerName, loginId, studentName } = account
  const onLogin = useLoginAction()

  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [])
  const [password, setPassword] = useState('')

  return (
    <div className={style.password_input}>
      <div className={style.password_input_modal}>
        <div className={style.user_info_on_passowrd_input}>
          <div>
            <div className={style.user_name}>{studentName}</div>
            <div className={style.user_info_more}>{customerName}</div>
          </div>
          <div className={style.user_id}>{loginId}</div>
        </div>
        <TextField
          ref={passwordInputRef}
          password
          hint={'비밀번호 입력'}
          value={password}
          onTextChange={(text) => setPassword(text)}
          onKeyDown={(e) => {
            if (password.length > 0 && e.key.toLowerCase() === 'enter') {
              onLogin({ id: loginId, password })
            }
          }}
        />
        <Button
          shadow
          color={'red'}
          onClick={() => {
            onLogin({ id: loginId, password })
          }}>
          로그인
        </Button>
        <div className={style.row_box}>
          <Link href={SITE_PATH.ACCOUNT.FORGOT_PASSWORD}>비밀번호 찾기</Link>
        </div>
      </div>
      <div className={style.screen_block} onClick={onDismiss}></div>
    </div>
  )
}
