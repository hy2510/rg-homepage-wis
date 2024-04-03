'use client'

import { useState } from 'react'
import {
  useFetchLibraryFavorite,
  useOnLoadLibraryFavorite,
} from '@/client/store/library/favorites/hook'
import { useLibraryFavorite } from '@/client/store/library/favorites/selector'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import PaginationBar from '@/ui/common/PaginationBar'
import { AlertBar, Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'
import {
  ExportItem,
  ExportModePanel,
} from '@/ui/modules/library-export-mode-panel/export-mode-panel'
import AssignmentNavBar from '../_component/AssignmentNavBar'

const STYLE_ID = 'page_favorite'

export default function Page() {
  const { loading, error } = useOnLoadLibraryFavorite()
  if (loading) {
    return <LoadingScreen />
  }
  return <Favorite />
}

function Favorite() {
  const style = useStyle(STYLE_ID)

  const STATUS_OPTION = [
    {
      id: 'All',
      label: 'All',
    },
    {
      id: 'Complete',
      label: '완료된 학습',
    },
    {
      id: 'Before',
      label: '미완료 학습',
    },
  ]

  const [isExportMode, _isExportMode] = useState(false)
  const [isDeleteMode, _isDeleteMode] = useState(false)
  const [isVocaSelected, _isVocaSelected] = useState(true)
  const [isListSelected, _isListSelected] = useState(false)
  const [isTodoSelected, _isTodoSelected] = useState(false)

  const { fetch } = useFetchLibraryFavorite()
  const { option, payload: books } = useLibraryFavorite()

  const onChangeStatus = (status: string) => {
    fetch({ status, page: 1 })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const onPageClick = (page: number) => {
    fetch({ status: option.status, page: page })
  }

  const findStatusOption = STATUS_OPTION.filter(
    (item) => option.status === item.id,
  )
  const currentSortOption =
    !findStatusOption || findStatusOption.length === 0
      ? STATUS_OPTION[0]
      : findStatusOption[0]

  const studentHistoryAction = useStudentHistoryAction()
  const studentHistoryList = useStudentHistory().payload.map((history) => ({
    studentHistoryId: history.studentHistoryId,
    classId: history.classId,
    className: history.className,
  }))
  const studentHistoryId = useStudentHistory().defaultHistoryId
  const onSelectStudentHistoryId = (studentHistoryId: string) => {
    studentHistoryAction.setDefaultHistoryId(studentHistoryId)
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  return (
    <>
      <AssignmentNavBar active={'favorite'} />
      <main className={style.favorite}>
        <AlertBar>
          이곳에서 학습 정보창의 하트 버튼을 눌러 추가한 도서들을 볼 수 있어요.
        </AlertBar>
        <div className={style.favorite_sort}>
          <div className={style.favorite_sort_container}>
            <Dropdown title={`총 ${books.page.totalRecords}권`}>
              <DropdownItem>목록 다운로드</DropdownItem>
              <DropdownItem>
                <span className="color-red">과제 전체삭제</span>
              </DropdownItem>
            </Dropdown>
            <Dropdown title={currentSortOption.label}>
              {STATUS_OPTION.map((opt) => {
                return (
                  <DropdownItem
                    key={`favorite-status-${opt.id}`}
                    onClick={() => {
                      onChangeStatus(opt.id)
                    }}>
                    {opt.label}
                  </DropdownItem>
                )
              })}
            </Dropdown>
          </div>
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
        </div>
        <div className={style.favorite_list}>
          {books.book.map((book, i) => {
            return (
              <BookCover
                key={`book-cover-${i}-${book.surfaceImagePath}`}
                target={`library`}
                bookImgSrc={book.surfaceImagePath}
                bookCode={book.levelName}
                earnPoint={undefined}
                title={book.topicTitle}
                author={book.author}
                isBookInfo={bookInfo === book.levelRoundId}
                passedCount={book.rgPointCount}
                isMovieBook={!!book.animationPath}
                isAssignedTodo={!book.addYn}
                onClickBookDetail={() => {
                  setBookInfo(bookInfo ? undefined : book.levelRoundId)
                }}
                levelRoundId={book.levelRoundId}
                studentHistoryId={studentHistoryId}
                studentHistoryList={studentHistoryList}
                onSelectStudentHistoryId={onSelectStudentHistoryId}
              />
            )
          })}
        </div>
        <PaginationBar
          page={currentPage}
          maxPage={maxPage}
          onPageClick={onPageClick}
        />
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
