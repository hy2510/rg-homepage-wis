import RenewType from '@/util/string-utils'

//FIXME -- API 미구현으로 하드코딩 함
export interface SuccessiveStudy {
  straightDayCount: number
  achievedDate: string
}

export function makeSuccessiveStudy(json?: any): SuccessiveStudy {
  return {
    straightDayCount: RenewType.renewNumber(json?.StraightDayCount),
    achievedDate: RenewType.renewString(json?.AchievedDate),
  }
}
