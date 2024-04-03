import Gfooter from '@/ui/common/global-footer/global-footer'
import Gheader from './_header/Gheader'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width,viewport-fit=cover"/>
      <Gheader />
      {children}
      <Gfooter />
    </>
  )
}
