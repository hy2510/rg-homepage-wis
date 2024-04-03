import AuthorizationProvider from '@/authorization/client/AuthorizationContext'
import LanguagePackContextProvider from '@/localization/client/LanguagePackContext'
import { getLanguageResources } from '@/localization/server/i18next-server'
import StyleContextProvider from '@/ui/context/StyleContext'

interface ContextWrapperProps {
  children?: React.ReactNode
}
export default async function ContextWrapper({
  children,
}: ContextWrapperProps) {
  const language = 'ko' // FIXME - 쿠키나 url로 조회, 없는 경우 기본값 주입
  const languageNamespace = 'common'
  const languageData = await getLanguageResources(language, languageNamespace)

  return (
    <StyleContextProvider>
      <LanguagePackContextProvider
        language={language}
        namespace={languageNamespace}
        res={JSON.stringify(languageData)}>
        <div lang={language}>
          <AuthorizationProvider id={''}>{children}</AuthorizationProvider>
        </div>
      </LanguagePackContextProvider>
    </StyleContextProvider>
  )
}
