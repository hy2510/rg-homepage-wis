import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'

type Status = 'Before' | 'Complete' | 'Fail' | 'All'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'status', 'page')
  const pStatus = parameter.getString('status', 'All') as Status
  const page = parameter.getNumber('page', 1)

  const [payload, status, error] = await executeRequestAction(
    Library.favorites(token, { status: pStatus, page }),
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

  const parameter = await getBodyParameters(request, 'levelRoundIds', 'status')
  const levelRoundIds = parameter.getString('levelRoundIds')
  const [payload, status, addError] = await executeRequestAction(
    Library.addFavorites(token, { levelRoundIds }),
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
    'levelRoundIds',
    'status',
  )
  const isAll = parameter.getString('isAll', 'N') as 'Y' | 'N'

  if (isAll === 'Y') {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteAllFavorites(token),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  } else {
    const levelRoundIds = parameter.getString('levelRoundIds')

    const [payload, status, deleteError] = await executeRequestAction(
      Library.deleteFavorites(token!, { levelRoundIds }),
    )

    if (deleteError) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  }
}
