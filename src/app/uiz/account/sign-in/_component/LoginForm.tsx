'use client'

import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_sign_in'

export default function LoginForm({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>리딩게이트</div>
        <div className={style.sentence}>읽는 즐거움, 커가는 영어실력</div>
      </div>
      <div className={style.log_in_box}>{children}</div>
    </main>
  )
}
