import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  ReadingKingTrophy,
  makeReadingKingTrophy,
} from '../object/readingking-trophy'
import { makeRequest } from '../utils'

type Input = {}

type Output = ReadingKingTrophy[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/readingking-trophy', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return json?.ReadingKing?.map((item: any) => {
      return makeReadingKingTrophy(item)
    })
  })
}

export { action as getReadingKingTrophy }
export type { Output as ReadingKingTrophyResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newReadingKingTrophy }
