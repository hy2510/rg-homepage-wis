import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../../object/search-book'

type Input = {
  level: string
  bookType: string
  sort: string
  status: string
  genre: string
  keyword: string
  page: number
}

type Output = {
  book: SearchBook[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
}

async function action({
  bookType,
  keyword,
  level,
  status = 'All',
  genre = 'All',
  sort = 'Preference',
  page = 1,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/series?searchText=${keyword}&bookType=${bookType}&level=${level}&sort=${sort}&genre=${genre}&status=${status}&page=${page}`,
    {
      method: 'get',
    }
  )
  return await executeWithAuth(request, (json): Output => {
    return {
      book: json.Books.map((item: any) => makeSearchBook(item)),
      page: {
        page: Number(json.Pagination.Page),
        size: Number(json.Pagination.RecordPerPage),
        totalPages: Number(json.Pagination.TotalPages),
        totalRecords: Number(json.Pagination.TotalRecords),
      },
    }
  })
}

export { action as getSearchSeriesBook }
export type { Output as SearchBookResponse }

function newInstance(): Output {
  return {
    book: [],
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
export { newInstance as newThemeSeriesBook }
