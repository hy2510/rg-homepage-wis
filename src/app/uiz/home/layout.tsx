'use client'

import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_home'

export default function Layout({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  const pathname = usePathname()
  const connectMainRgNews = pathname.indexOf('/rg-news') != -1

  const HomeNavItem = ({
    name,
    href,
    target,
    active,
    onClick,
  }: {
    name: string
    href: string
    target?: string
    active?: boolean
    onClick?: () => void
  }) => {
    return (
      <Link href={href} target={target ? target : '_self'} onClick={onClick}>
        <div className={`${style.home_nav_item} ${active ? style.active : ''}`}>
          {name}
        </div>
      </Link>
    )
  }

  const HomeNavBar = () => {
    return (
      <div className={`${style.home_nav_bar}`}>
        <HomeNavItem
          name={'메인'}
          href={SITE_PATH.HOME.MAIN}
          active={pathname.indexOf(SITE_PATH.HOME.MAIN) !== -1}
        />
        {/* <HomeNavItem
          name={'명예의 전당'}
          href={'hall-of-fame'}
          active={connectHallOfFame}
        /> */}
        <HomeNavItem
          name={'활용수기'}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}
          active={pathname.indexOf('/customer-review') !== -1}
        />
        <HomeNavItem
          name={'RG 멤버십'}
          href={SITE_PATH.HOME.MEMBERSHIP_INTRODUCE}
          active={pathname.indexOf('/rg-membership') !== -1}
        />
        <HomeNavItem
          name={'고객센터'}
          href={
            'https://pebble-lemongrass-cd6.notion.site/RG-de08c352853549f29bbc98345bedd8a5'
          }
          active={false}
          target={'_blank'}
        />
      </div>
    )
  }

  return (
    <div className={style.home}>
      {connectMainRgNews ? <></> : <HomeNavBar />}
      {children}
    </div>
  )
}
