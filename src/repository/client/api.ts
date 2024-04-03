// @Deprecate - Import 구문이 복잡해서 사용 안 함
import { ApiResponse } from '@/http/common/response'
import { execute } from '../../http/common/utils'
import { executeWithAuth, makeRequest } from './utils'

///// Test =================================================================================================================
export async function getCheckExample(): Promise<ApiResponse<void>> {
  const request = makeRequest('api/check-example')
  return await executeWithAuth<void>(request)
}

export async function getCheckExampleWithAuth(
  p: number,
): Promise<ApiResponse<{ pp?: number }>> {
  const request = makeRequest('api/check-example', { queryString: { p: p } })
  return await executeWithAuth<{ pp?: number }>(request)
}

export async function postLogin(params: {
  username: string
  password: string
}): Promise<ApiResponse<void>> {
  const request = makeRequest('api/login', {
    method: 'post',
    body: { ...params },
  })
  return await execute(request)
}

export async function deleteLogout(): Promise<ApiResponse<void>> {
  const request = makeRequest('api/logout', {
    method: 'delete',
  })
  return await execute(request)
}

export async function getFreeExample(): Promise<
  ApiResponse<{ time: string; label: string }>
> {
  const request = makeRequest('api/free-example')
  return await execute(request)
}
