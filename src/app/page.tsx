import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { redirect } from 'next/navigation'

export default function Page() {
  const authToken = getAuthorizationWithCookie().getAccessToken()
  if (authToken) {
    redirect('/uiz/home/main')
  } else {
    redirect('/uiz/account/account-list')
  }
}
