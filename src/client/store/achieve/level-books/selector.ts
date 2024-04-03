import { useRootCreateStore } from '../../store'

export const useAchieveLevelBooksAction = () => {
  return useRootCreateStore((state) => state.achieve.levelBooks.action)
}

export const useAchieveLevelBooks = () => {
  return useRootCreateStore((state) => state.achieve.levelBooks)
}
