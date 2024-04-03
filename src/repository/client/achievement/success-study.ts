import { makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  SuccessiveStudy,
  makeSuccessiveStudy,
} from '../object/successive-study'

type Input = {}

type Output = SuccessiveStudy[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/successive-study', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return json.Study.map((item: any) => makeSuccessiveStudy(item))
  })
}

export { action as getSuccessiveStudy }
export type { Output as SuccessiveStudyResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newSuccessiveStudy }
