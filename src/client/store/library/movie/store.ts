import { SliceStoreCreator } from '../../store'
import {
  SearchMovieBookResponse,
  newSearchMovie,
} from '@/repository/client/library/search/search-movie'

type State = {
  option: {
    level: string
    page: number
  }
  payload: SearchMovieBookResponse
}

type Action = {
  setLibraryMovie: (
    option?: {
      level: string
      page: number
    },
    payload?: SearchMovieBookResponse
  ) => void
}

export type MovieBookState = {
  movieBook: State & {
    action: Action
  }
}

export const createSliceMovieBookState: SliceStoreCreator<MovieBookState> = (
  set
) => ({
  movieBook: {
    option: {
      level: '',
      page: 1,
    },
    payload: newSearchMovie(),
    action: {
      setLibraryMovie: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.movieBook.option = option
          }
          if (payload) {
            state.library.movieBook.payload = payload
          }
        }),
    },
  },
})
