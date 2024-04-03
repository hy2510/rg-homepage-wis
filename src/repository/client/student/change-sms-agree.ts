import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  isReceive: boolean
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/change-sms-agree', {
    method: 'post',
    body: {
      studyReportYn: input.isReceive,
      eventInformationYn: input.isReceive,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as postChangeSmsAgree }
export type { Output as ChangeSmsAgreeResponse }
