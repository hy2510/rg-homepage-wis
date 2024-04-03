import { makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  SuccessiveDailyGoal,
  makeSuccessiveDailyGoal,
} from '../object/successive-daily-goal'

type Input = {}

type Output = SuccessiveDailyGoal[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/successive-daily-goal', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return json.Study.map((item: any) => makeSuccessiveDailyGoal(item))
  })
}

export { action as getSuccessiveDailyGoal }
export type { Output as SuccessiveDailyGoalResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newSuccessiveDailyGoal }
