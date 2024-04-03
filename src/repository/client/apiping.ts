import { executeWithAuth, makeRequest } from './utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  status?: number
  time?: number
}

type Output = any

async function action(input?: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api', {
    method: 'get',
    queryString: {
      status: input?.status,
      time: input?.status,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return json
  })
}

export { action as getPing }
export type { Output as PingResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newPing }
