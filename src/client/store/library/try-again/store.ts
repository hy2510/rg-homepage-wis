import { SearchTryAgainResponse } from '@/repository/client/library/search/search-try-again'

import { newSearchLevel } from '@/repository/client/library/search/search-level'
import { SliceStoreCreator, useRootCreateStore } from '../../store'

type State = {
  option: {
    page: number
  }
  payload: SearchTryAgainResponse
}

type Action = {
  setTryAgain: (
    option?: { page: number },
    payload?: SearchTryAgainResponse
  ) => void
}

export type TryAgainState = {
  tryAgain: State & {
    action: Action
  }
}

export const createSliceTryAgainState: SliceStoreCreator<TryAgainState> = (
  set
) => ({
  tryAgain: {
    option: {
      page: 1,
    },
    payload: newSearchLevel(),
    action: {
      setTryAgain: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.tryAgain.option = option
          }
          if (payload) {
            state.library.tryAgain.payload = payload
          }
        }),
    },
  },
})
