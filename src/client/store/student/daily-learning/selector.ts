import { useRootCreateStore } from '../../store'

export const useStudentDailyLearningAction = () => {
  return useRootCreateStore((state) => state.student.dailyLearning.action)
}

export const useStudentDailyLearning = () => {
  return useRootCreateStore((state) => state.student.dailyLearning)
}

export const useSelectStudyLevel = () => {
  return useRootCreateStore(
    (state) => state.student.dailyLearning.payload.settingLevelName
  )
}
