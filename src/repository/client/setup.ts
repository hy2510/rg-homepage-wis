import { executeWithAuth, makeRequest } from './utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  token: string
}

type Output = {}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/setup`, {
    method: 'patch',
    headers: {
      customer: input.token,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {}
  })
}

export { action as patchSetup }
export type { Output as SetupResponse }
