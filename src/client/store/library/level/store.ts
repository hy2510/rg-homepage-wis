import {
  SearchLevelBookResponse,
  newSearchLevel,
} from '@/repository/client/library/search/search-level'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    level: string
    bookType: string
    page: number
  }
  payload: SearchLevelBookResponse
}

type Action = {
  setLibraryLevel: (
    option?: {
      level: string
      bookType: string
      page: number
    },
    payload?: SearchLevelBookResponse
  ) => void
}

export type LevelBookState = {
  levelBook: State & {
    action: Action
  }
}

export const createSliceLevelBookState: SliceStoreCreator<LevelBookState> = (
  set
) => ({
  levelBook: {
    option: {
      level: '',
      bookType: '',
      page: 1,
    },
    payload: newSearchLevel(),
    action: {
      setLibraryLevel: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.levelBook.option = option
          }
          if (payload) {
            state.library.levelBook.payload = payload
          }
        }),
    },
  },
})
