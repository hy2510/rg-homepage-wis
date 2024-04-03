import {
  NewBooksResponse,
  newNewBooks,
} from '@/repository/client/library/new-books'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    year: number
    month: number
  }
  payload: NewBooksResponse
}

type Action = {
  setNewBooks: (
    option?: { year: number; month: number },
    payload?: NewBooksResponse
  ) => void
}

export type NewBookState = {
  newBook: State & {
    action: Action
  }
}

export const createSliceNewBookState: SliceStoreCreator<NewBookState> = (
  set
) => ({
  newBook: {
    option: {
      year: 0,
      month: 0,
    },
    payload: newNewBooks(),
    action: {
      setNewBooks: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.newBook.option = option
          }
          if (payload) {
            state.library.newBook.payload = payload
          }
        }),
    },
  },
})
