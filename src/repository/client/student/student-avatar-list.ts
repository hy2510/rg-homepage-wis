import { makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { Avatar, makeAvatar } from '../object/avatar'

type Input = {}

type Output = {
  avatarId: string
  avatars: Avatar[]
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/avatar', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return {
      avatarId: json.StudentAvatarId,
      avatars: json.StudentAvatar.map((item: any) => makeAvatar(item)),
    }
  })
}

export { action as getStudentAvatarList }
export type { Output as StudentAvatarListResponse }
function newInstance(): Output {
  return {
    avatarId: '',
    avatars: [],
  }
}
export { newInstance as newStudentAvatarList }
