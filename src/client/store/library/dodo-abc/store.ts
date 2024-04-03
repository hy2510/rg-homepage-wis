import {
  SearchDodoABCBookResponse,
  newSearchDodoABC,
} from '@/repository/client/library/search/search-dodoabc'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    activity: string
    status: string
    page: number
  }
  payload: SearchDodoABCBookResponse
}

type Action = {
  setLibraryDodoAbc: (
    option?: {
      activity: string
      status: string
      page: number
    },
    payload?: SearchDodoABCBookResponse,
  ) => void
}

export type DodoAbcBookState = {
  levelDodo: State & {
    action: Action
  }
}

export const createSliceLevelDodoAbcState: SliceStoreCreator<
  DodoAbcBookState
> = (set) => ({
  levelDodo: {
    option: {
      activity: 'All',
      status: 'All',
      page: 1,
    },
    payload: newSearchDodoABC(),
    action: {
      setLibraryDodoAbc: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.levelDodo.option = option
          }
          if (payload) {
            state.library.levelDodo.payload = payload
          }
        }),
    },
  },
})
