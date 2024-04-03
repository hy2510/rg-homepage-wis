import {
  SearchPreKBookResponse,
  newSearchPK,
} from '@/repository/client/library/search/search-pk'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    activity: string
    status: string
    page: number
  }
  payload: SearchPreKBookResponse
}

type Action = {
  setLibraryPreK: (
    option?: {
      activity: string
      status: string
      page: number
    },
    payload?: SearchPreKBookResponse,
  ) => void
}

export type PreKBookState = {
  levelPreK: State & {
    action: Action
  }
}

export const createSliceLevelPreKState: SliceStoreCreator<PreKBookState> = (
  set,
) => ({
  levelPreK: {
    option: {
      activity: 'All',
      status: 'All',
      page: 1,
    },
    payload: newSearchPK(),
    action: {
      setLibraryPreK: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.levelPreK.option = option
          }
          if (payload) {
            state.library.levelPreK.payload = payload
          }
        }),
    },
  },
})
