'use client'

import { useState } from 'react'
import { useFetchLibraryTodos } from '@/client/store/library/todos/hook'
import { useLibraryTodo } from '@/client/store/library/todos/selector'
import PaginationBar from '@/ui/common/PaginationBar'
import {
  AlertBar,
  Dropdown,
  DropdownItem,
  EmptyMessage,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'
import {
  ExportItem,
  ExportModePanel,
} from '@/ui/modules/library-export-mode-panel/export-mode-panel'
import AssignmentNavBar from '../_component/AssignmentNavBar'

const STYLE_ID = 'page_to_do'

const PAGE_PER_RECORD = 12
export default function Page() {
  const style = useStyle(STYLE_ID)

  const [isExportMode, _isExportMode] = useState(false)
  const [isDeleteMode, _isDeleteMode] = useState(false)
  const [isVocaSelected, _isVocaSelected] = useState(true)
  const [isListSelected, _isListSelected] = useState(false)
  const [isTodoSelected, _isTodoSelected] = useState(false)

  const SORT_OPTIONS = [
    {
      id: 'RegistDate',
      label: '최신순',
    },
    {
      id: 'RegistDateAsc',
      label: '오래된순',
    },
    {
      id: 'OnGoing',
      label: '학습중 우선',
    },
    {
      id: 'BeforeStudy',
      label: '학습전 우선',
    },
  ]

  const { fetch, loading } = useFetchLibraryTodos()
  const { option, payload: todos } = useLibraryTodo()

  const onChangeSort = (sort: string) => {
    setCurrentPage(1)
    fetch({ sortOption: sort })
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const maxPage = Math.ceil(todos.count / PAGE_PER_RECORD)
  const onPageClick = (page: number) => {
    setCurrentPage(page)
  }
  const startIdx = PAGE_PER_RECORD * (currentPage - 1)
  const endIdx = PAGE_PER_RECORD * currentPage
  const todoItems = loading
    ? []
    : todos.todo.filter((_, idx) => {
        return startIdx <= idx && idx < endIdx
      })

  const findSortOption = SORT_OPTIONS.filter(
    (item) => option.sortOption === item.id,
  )
  const currentSortOption =
    !findSortOption || findSortOption.length === 0
      ? SORT_OPTIONS[0]
      : findSortOption[0]

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  return (
    <>
      <AssignmentNavBar active={'to-do'} />
      <main className={style.to_do}>
        <AlertBar>
          이곳에서 완료해야 할 학습(최대 200권)을 볼 수 있어요. 완료하지 않은
          학습은 추가된 날로부터 60일이 지나면 자동으로 삭제됩니다.
        </AlertBar>
        <div className={style.to_do_sort}>
          <div className={style.to_do_sort_container}>
            <Dropdown title={`총 ${todos.count}권`}>
              <DropdownItem>목록 다운로드</DropdownItem>
              <DropdownItem>
                <span className="color-red">과제 전체삭제</span>
              </DropdownItem>
            </Dropdown>
            <Dropdown title={currentSortOption.label}>
              {SORT_OPTIONS.map((sort) => {
                return (
                  <DropdownItem
                    key={`todo-sort-${sort.id}`}
                    onClick={() => {
                      onChangeSort(sort.id)
                    }}>
                    {sort.label}
                  </DropdownItem>
                )
              })}
            </Dropdown>
          </div>
          {todos.count !== 0 && (
            <div className="flex gap-m">
              <div
                className={style.txt_l}
                onClick={() => {
                  isExportMode ? _isExportMode(false) : _isExportMode(true)
                }}>
                {isDeleteMode
                  ? undefined
                  : isExportMode
                    ? '작업 취소'
                    : '내보내기'}
              </div>
              <div
                className={style.txt_l}
                onClick={() => {
                  isDeleteMode ? _isDeleteMode(false) : _isDeleteMode(true)
                }}>
                {isExportMode ? undefined : isDeleteMode ? '삭제 취소' : '삭제'}
              </div>
            </div>
          )}
        </div>
        {todos.count !== 0 ? (
          <>
            <div className={style.to_do_list}>
              {todoItems.map((book, i) => {
                return (
                  <BookCover
                    key={`book-cover-${i}-${book.surfaceImagePath}`}
                    target={`library`}
                    bookImgSrc={book.surfaceImagePath}
                    bookCode={book.levelName}
                    title={book.title}
                    author={book.author}
                    isBookInfo={bookInfo === book.studyId}
                    isMovieBook={!!book.animationPath}
                    onClickBookDetail={() => {
                      setBookInfo(bookInfo ? undefined : book.studyId)
                    }}
                    levelRoundId={book.levelRoundId}
                    studyId={book.studyId}
                    studentHistoryId={book.studentHistoryId}
                  />
                )
              })}
            </div>
            <PaginationBar
              page={currentPage}
              maxPage={maxPage}
              onPageClick={onPageClick}
            />
          </>
        ) : (
          <EmptyMessage>현재 완료해야 할 학습은 없어요.</EmptyMessage>
        )}

        {/* 내보내기 모드 실행시 */}
        {isExportMode && (
          <ExportModePanel>
            <ExportItem
              isVocaSelected={isVocaSelected}
              onClick={() => {
                _isVocaSelected(true)
                _isListSelected(false)
              }}>
              Vocabulary
            </ExportItem>
            <ExportItem
              isListSelected={isListSelected}
              onClick={() => {
                _isVocaSelected(false)
                _isListSelected(true)
              }}>
              Book List
            </ExportItem>
          </ExportModePanel>
        )}
        {/* 일괄삭제 모드 실행시 */}
        {isDeleteMode && (
          <ExportModePanel buttonName="선택한 과제를 삭제하기"></ExportModePanel>
        )}
      </main>
    </>
  )
}
