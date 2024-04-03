import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { setTokenWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest, NextResponse } from 'next/server'
import Account from '@/repository/server/account'

export async function POST(request: NextRequest) {
  const customer = getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }
  const parameter = await getBodyParameters(
    request,
    'id',
    'password',
    'deviceType',
  )
  const id = parameter.getString('id')
  const password = parameter.getString('password')
  const deviceType = parameter.getString('deviceType')

  const [payload, status, error] = await executeRequestAction(
    Account.signin(customer, { id, password, deviceType }),
  )
  if (status.status >= 200 && status.status < 300) {
    let nextResponse = setTokenWithCookie(
      NextResponse.json({ success: true }, { status: 200 }),
      {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        tag: 'tag',
      },
    )
    return nextResponse
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.commonError()
}
