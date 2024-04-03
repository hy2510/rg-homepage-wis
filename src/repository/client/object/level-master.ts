import RenewType from '@/util/string-utils'

export interface LevelMaster {
  levelHistoryId: string
  levelDate: string
  studentId: string
  studentName: string
  className: string
  schoolId: string
  gradeCode: string
  schoolName: string
  levelCode: string
  levelName: string
  levelUp: string
  rgPoint: string
  books: string
  reason: string
  changerName: string
  showCertBtnYn: string
  levelUpCertificate: string
  masterLevelName: string
}
export function makeLevelMaster(json?: any): LevelMaster {
  return {
    levelHistoryId: RenewType.renewString(json?.LevelHistoryId),
    levelDate: RenewType.renewString(json?.LevelDate),
    studentId: RenewType.renewString(json?.StudentId),
    studentName: RenewType.renewString(json?.StudentName),
    className: RenewType.renewString(json?.ClassName),
    schoolId: RenewType.renewString(json?.SchoolId),
    gradeCode: RenewType.renewString(json?.GradeCode),
    schoolName: RenewType.renewString(json?.SchoolName),
    levelCode: RenewType.renewString(json?.LevelCode),
    levelName: RenewType.renewString(json?.LevelName),
    levelUp: RenewType.renewString(json?.LevelUp),
    rgPoint: RenewType.renewString(json?.RgPoint),
    books: RenewType.renewString(json?.Books),
    reason: RenewType.renewString(json?.Reason),
    changerName: RenewType.renewString(json?.ChangerName),
    showCertBtnYn: RenewType.renewString(json?.ShowCertBtnYn),
    levelUpCertificate: RenewType.renewString(json?.LevelUpCertificate),
    masterLevelName: RenewType.renewString(json?.MasterLevelName),
  }
}
