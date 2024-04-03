import { makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { LevelTestInfo, makeLevelTestInfo } from '../object/level-test-info'

type Input = {}

type Output = LevelTestInfo

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/level-test-info', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return makeLevelTestInfo(json)
  })
}

export { action as getLevelTestInfo }
export type { Output as LevelTestInfoResponse }

function newInstance(): Output {
  return makeLevelTestInfo()
}
export { newInstance as newLevelTestInfo }
