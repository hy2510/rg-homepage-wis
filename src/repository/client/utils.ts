import { ApiResponse, getInvalidTokenPayload } from '@/http/common/response'
import { makeRequest as commonMakeRequest, execute } from '@/http/common/utils'
import { HttpRequest, HttpRequestOption } from '@/http/core/request'

// FIXME : CLIENT_API_BASE_URL은 URL이 동적으로 요청 되도록 필요하다.
// export const CLIENT_API_BASE_URL = 'http://192.168.0.27:3000/'
// export const CLIENT_API_BASE_URL = 'http://localhost:3000/'
export const CLIENT_API_BASE_URL = '/'

const clientRefreshRequest = makeRequest('api/login/refresh', {
  method: 'post',
})

export function makeRequestWithCustomer(
  path: string,
  option?: HttpRequestOption,
): HttpRequest {
  const customerToken = getCustomerToken()

  if (option) {
    if (option.headers) {
      option.headers = {
        ...option.headers,
        customer: customerToken,
      }
    } else {
      option.headers = {
        customer: customerToken,
      }
    }
  } else {
    option = {
      headers: {
        customer: customerToken,
      },
    }
  }
  return commonMakeRequest(CLIENT_API_BASE_URL, path, option)
}

export function makeRequest(
  path: string,
  option?: HttpRequestOption,
): HttpRequest {
  return commonMakeRequest(CLIENT_API_BASE_URL, path, option)
}

export function makeRequestOption(option?: HttpRequestOption) {
  return option
}

export async function executeWithAuth<T>(
  request: HttpRequest,
  transform?: (rawJson: any) => T,
): Promise<ApiResponse<T>> {
  let response = await execute(request, transform)
  const preRequestCode = response.status
  if (preRequestCode === 401) {
    const isRefreshed = await refreshCookieToken()
    if (isRefreshed) {
      response = await execute(request, transform)
    } else {
      response = getInvalidTokenPayload()
    }
  }
  return response
}

async function refreshCookieToken() {
  const refreshManager = getRefreshTokenManager()

  if (refreshManager) {
    if (refreshManager.status === 'on') {
      refreshManager.status = 'pending'

      let response = await execute(clientRefreshRequest)
      refreshManager.status = 'finish'
      const result = response.ok

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500))

      refreshManager.watcher.forEach((element: (bool: boolean) => void) => {
        element(result)
      })
      refreshManager.watcher.splice(0, refreshManager.watcher.length)
      refreshManager.status = 'on'
      if (result) {
        return true
      } else {
        return false
      }
    } else if (refreshManager.status === 'pending') {
      const response = await new Promise<boolean>((resolve) => {
        refreshManager.watcher.push((bool: boolean) => {
          resolve(bool)
        })
      })
      return response
    }
  } else {
    let response = await execute(clientRefreshRequest)
    if (response.ok) {
      return true
    } else {
      return false
    }
  }
  return false
}

function getRefreshTokenManager(): RefreshTokenManager | undefined {
  const windowObj = window && (window as any)
  if (windowObj) {
    if (!windowObj._REFRASH) {
      const refresh: RefreshTokenManager = {
        status: 'on',
        watcher: [],
      }
      windowObj._REFRASH = refresh
    }
    return windowObj._REFRASH
  }
  return undefined
}

type RefreshTokenStatus = 'on' | 'pending' | 'finish' | 'reject'
type RefreshTokenManager = {
  status: RefreshTokenStatus
  watcher: ((bool: boolean) => void)[]
}

function getCustomerToken(): string | undefined {
  let customerToken: string | undefined = undefined
  if (window) {
    customerToken = window.sessionStorage.getItem('CustomerToken') || undefined
  }
  return customerToken
}
