import { SliceStoreCreator } from '../../store'
import {
  SearchBookResponse,
  newThemeSeriesBook,
} from '@/repository/client/library/search/search-theme'

type State = {
  option: {
    level: string
    bookType: string
    title: string
    keyword: string
    image: string
    page: number
  }
  payload: SearchBookResponse
}

type Action = {
  setThemeSearch: (
    option?: {
      level: string
      bookType: string
      title: string
      keyword: string
      image: string
      page: number
    },
    payload?: SearchBookResponse
  ) => void
}

export type ThemeState = {
  theme: State & {
    action: Action
  }
}

export const createSliceThemeState: SliceStoreCreator<ThemeState> = (set) => ({
  theme: {
    option: {
      level: '',
      bookType: '',
      title: '',
      keyword: '',
      image: '',
      page: 1,
    },
    payload: newThemeSeriesBook(),
    action: {
      setThemeSearch: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.theme.option = option
          }
          if (payload) {
            state.library.theme.payload = payload
          }
        }),
    },
  },
})
