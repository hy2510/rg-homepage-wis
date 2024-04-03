import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import { API_BASE_URL } from '@/repository/server/utils'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'studyId')
  const studyId = parameter.getString('studyId', '')

  //FIXME - 하드코딩 데이터
  const data = await fetch(
    `${API_BASE_URL}v1/pre-k/movie-info?studyId=${studyId}`,
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

  // const [payload, status, error] = await executeRequestAction(
  //   LevelTest.quiz(token, { studyId, studentHistoryId }),
  // )
  // if (error) {
  //   return RouteResponse.commonError()
  // }
  // return RouteResponse.response(payload, status)
}
