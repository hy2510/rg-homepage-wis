import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'sortColumn')
  const sortColumn = parameter.getString('sortColumn')

  const [payload, status, error] = await executeRequestAction(
    Library.todos(token, { sortColumn }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'levelRoundIds',
    'studentHistoryId',
  )
  const levelRoundIds = parameter.getString('levelRoundIds')
  const studentHistoryId = parameter.getString('studentHistoryId')

  const [payload, status, addError] = await executeRequestAction(
    Library.addTodos(token, {
      levelRoundIds,
      studentHistoryId,
    }),
  )
  if (addError) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function DELETE(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(
    request,
    'isAll',
    'studyIds',
    'sortColumn',
  )
  const isAll = parameter.getString('isAll', 'N') as 'Y' | 'N'
  const studyIds = parameter.getString('studyIds')

  if (isAll === 'Y') {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteAllTodos(token),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  } else {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteTodos(token, { studyIds }),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  }
}
