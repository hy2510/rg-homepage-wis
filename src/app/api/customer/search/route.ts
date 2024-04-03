import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { NextRequest } from 'next/server'
import Common from '@/repository/server/common'

export async function GET(request: NextRequest) {
  const parameter = await getParameters(
    request,
    'keyword',
    'type',
    'countryCode',
  )
  const keyword = parameter.getString('keyword')
  const customerType = parameter.getString('type')
  const countryCode = parameter.getString('countryCode')

  const [payload, status, error] = await executeRequestAction(
    Common.searchCustomer({
      keyword,
      customerUse: customerType,
      countryCode,
    }),
  )
  // FIXME - 개발서버 DB 하드코딩
  if (payload.code === 9001) {
    const newState = {
      status: 201,
    }

    const newPayload: { Customers: any[] } = {
      Customers: [],
    }
    if (customerType === 'Private') {
      newPayload.Customers.push({
        Name: '개인회원(Dev)',
        CustomerId: '001104',
        HomepageUrl: 'https://dev.readinggate.com',
        DatabaseName: 'NSLA007',
        CustomerUseCode: '008005',
        DatabaseIp: '125.141.216.121',
        ReadingGateIp: '125.141.216.121',
        LogoFilename:
          'https://wcfresource.a1edu.com/newsystem/image/acalogo/100220_top.png',
        AppSvrIp: '125.141.216.109',
        AppSvrPort: 8080,
        AppSvrUrl: 'http://app.readinggate.com',
        UseStudentNoYn: 'N',
        CountryCode: 'KR',
      })
    }
    return RouteResponse.response(newPayload, newState)
  }

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
