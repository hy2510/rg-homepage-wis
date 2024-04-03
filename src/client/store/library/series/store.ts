import {
  SearchLevelBookResponse,
  newSearchLevel,
} from '@/repository/client/library/search/search-level'
import { SliceStoreCreator } from '../../store'
import { SearchBookResponse } from '@/repository/client/library/search/search-theme'

type State = {
  option: {
    level: string
    bookType: string
    title: string
    image: string
    page: number
  }
  payload: SearchBookResponse
}

type Action = {
  setSeriesSearch: (
    option?: {
      level: string
      bookType: string
      title: string
      image: string
      page: number
    },
    payload?: SearchBookResponse
  ) => void
}
export type SeriesState = {
  series: State & {
    action: Action
  }
}

export const createSliceSeriesState: SliceStoreCreator<SeriesState> = (
  set
) => ({
  series: {
    option: {
      level: '',
      bookType: '',
      title: '',
      image: '',
      page: 1,
    },
    payload: newSearchLevel(),
    action: {
      setSeriesSearch: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.series.option = option
          }
          if (payload) {
            state.library.series.payload = payload
          }
        }),
    },
  },
})
