import { RouteResponse, getBodyParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import { API_BASE_URL } from '@/repository/server/utils'

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'studyId',
    'studentHistoryId',
    'step',
    'studyEndYn',
    'dvc',
  )
  const studyId = parameter.getString('studyId')
  const studentHistoryId = parameter.getString('studentHistoryId')
  const step = parameter.getString('step')
  const studyEndYn = parameter.getString('studyEndYn')
  const dvc = parameter.getString('dvc', 'N')

  //FIXME - 하드코딩 데이터
  const data = await fetch(`${API_BASE_URL}v1/pre-k/save`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studyId,
      studentHistoryId,
      step,
      studyEndYn,
      dvc,
    }),
  })
  const status = data.status
  const json = await data.json()
  return RouteResponse.response(json, { status })

  // const [payload, status, error] = await executeRequestAction(
  //   LevelTest.save(token, {
  //     levelTestDetailId,
  //     quizId,
  //     quizNo,
  //     currentQuizNo,
  //     ox,
  //     correct,
  //     studentAnswer,
  //     answerCount,
  //     lastQuizYn,
  //   }),
  // )
  // if (error) {
  //   return RouteResponse.commonError()
  // }
  // return RouteResponse.response(payload, status)
}
