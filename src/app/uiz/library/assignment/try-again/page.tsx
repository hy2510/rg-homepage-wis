'use client'

import { useState } from 'react'
import {
  useFetchLibraryTryAgain,
  useOnLoadLibraryTryAgain,
} from '@/client/store/library/try-again/hook'
import { useLibraryTryAgain } from '@/client/store/library/try-again/selector'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import PaginationBar from '@/ui/common/PaginationBar'
import { AlertBar } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'
import AssignmentNavBar from '../_component/AssignmentNavBar'

const STYLE_ID = 'page_try_again'

export default function Page() {
  const { loading, error } = useOnLoadLibraryTryAgain()
  if (loading) {
    return <LoadingScreen />
  }
  return <TryAgain />
}

function TryAgain() {
  const style = useStyle(STYLE_ID)

  const { fetch } = useFetchLibraryTryAgain()
  const { option, payload: books } = useLibraryTryAgain()

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const onPageClick = (page: number) => {
    fetch({ page: page })
  }

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
      <AssignmentNavBar active={'try-again'} />
      <main className={style.try_again}>
        <AlertBar>
          이곳에서 학습을 완료했지만, 점수가 낮아 ‘통과하지 못한 도서’들을 볼 수
          있어요. (통과 점수: 70점)
        </AlertBar>
        <div className={style.try_again_list}>
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
      </main>
    </>
  )
}
