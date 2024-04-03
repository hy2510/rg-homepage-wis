import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  studentName: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/change-student-name', {
    method: 'put',
    queryString: { studentName: input.studentName },
  })
  return await execute(request, (json): Output => {
    return { success: json.success }
  })
}

export { action as putChangeStudentName }
export type { Output as ChangeStudentNameResponse }
