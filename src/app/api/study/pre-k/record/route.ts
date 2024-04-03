import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import { API_BASE_URL } from '@/repository/server/utils'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'studyId', 'studentHistoryId')
  const studyId = parameter.getString('studyId', '')
  const studentHistoryId = parameter.getString('studentHistoryId', '')

  //FIXME - 하드코딩 데이터
  const data = await fetch(
    `${API_BASE_URL}v1/pre-k/record?studyId=${studyId}&studentHistoryId=${studentHistoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  const status = data.status
  const json = await data.json()
  return RouteResponse.response(json, { status })

  // const parameter = await getParameters(request, 'studyId', 'studentHistoryId')
  // const studyId = parameter.getString('studyId', '')
  // const studentHistoryId = parameter.getString('studentHistoryId', '')

  // const [payload, status, error] = await executeRequestAction(
  //   LevelTest.quiz(token, { studyId, studentHistoryId }),
  // )
  // if (error) {
  //   return RouteResponse.commonError()
  // }
  // return RouteResponse.response(payload, status)
}
