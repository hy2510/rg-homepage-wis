import './globals.scss'
import AppLoader from './_app/AppLoader'

//FIXME : 다국어 적용 시 동적 lang 적용 방법 리서치
const lang = 'ko'

export const metadata = {
  title: 'Reading Gate',
  description: '온라인 영어독서관',
}

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <html lang={lang}>
      <link rel="manifest" href="/manifest.json" />
      <body>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          rel="stylesheet"
        />
        <AppLoader>{children}</AppLoader>
        {/* <SiteMapLinkMenu /> */}
      </body>
    </html>
  )
}
