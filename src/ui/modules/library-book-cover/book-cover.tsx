'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import { BookInfoModal } from './BookInfoModal'

const STYLE_ID = 'book_cover'

export interface BookCoverProps {
  target?: string
  bookImgSrc: string
  bookCode?: string
  title: string
  author: string
  summary?: string
  assignDate?: string
  earnPoint?: number
  isAssignedTodo?: boolean
  passedCount?: number
  isMovieBook?: boolean
  id?: string
  onClickCheck?: (isChecked: boolean) => void
  isExportMode?: boolean
  isDeleteMode?: boolean
  // 신규추가 프롭
  isBookInfo?: boolean
  onClickBookDetail?: () => void
  levelRoundId: string
  studyId?: string
  studentHistoryId: string
  studentHistoryList?: any[]
  onSelectStudentHistoryId?: (studentHistoryId: string) => void
}

// 도서 아이템
export function BookCover({
  target = 'library',
  bookImgSrc,
  bookCode,
  title,
  author,
  assignDate,
  earnPoint,
  isAssignedTodo = false,
  passedCount = 0,
  onClickCheck,
  isMovieBook,
  isExportMode,
  isDeleteMode,
  isBookInfo,
  onClickBookDetail,
  levelRoundId,
  studyId,
  studentHistoryId,
  studentHistoryList,
  onSelectStudentHistoryId,
}: BookCoverProps) {
  const style = useStyle(STYLE_ID)

  const [isCheckActive, _isCheckActive] = useState(false)

  let passedIcon = ''
  let passedClassName = ''
  if (passedCount >= 2) {
    passedIcon = '/src/images/@book-cover/passed_all.svg'
    passedClassName = style.passed_all
  } else if (passedCount === 1) {
    passedIcon = '/src/images/@book-cover/passed_1.svg'
    passedClassName = style.passed_1
  }

  return (
    <>
      <div className={style.book_cover}>
        <div className={style.container}>
          <div className={style.study_status}>
            {isAssignedTodo && (
              <div className={style.assigned_todo}>
                <Image
                  alt=""
                  src="/src/images/@book-cover/assigned_todo.svg"
                  width={34}
                  height={34}
                />
              </div>
            )}
            {passedIcon && (
              <div className={passedClassName}>
                <Image alt="" src={passedIcon} width={34} height={34} />
              </div>
            )}
          </div>
          <div className={style.book_image}>
            {isExportMode || isDeleteMode ? (
              <div
                className={`${style.check_box} ${style.swirl_in_bck}`}
                onClick={() => {
                  // onClickCheck
                  //   ?
                  //   : undefined
                  isCheckActive
                    ? _isCheckActive(false) // 체크박스 체크시 일괄 작업 실행 명령어가 들어갈 자리
                    : _isCheckActive(true)
                  onClickCheck && onClickCheck(!isCheckActive)
                }}>
                {isCheckActive ? (
                  <Image
                    alt={''}
                    src="/src/images/check-icons/check_box_on.svg"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    alt={''}
                    src="/src/images/check-icons/check_box_off.svg"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ) : undefined}
            {isMovieBook && (
              <div className={style.movie_icon}>
                <Image
                  alt=""
                  src="/src/images/@book-cover/movie_src.svg"
                  width={34}
                  height={34}
                />
              </div>
            )}
            <Image
              alt=""
              src={bookImgSrc}
              layout="intrinsic"
              width={200}
              height={290}
              className={style.book_image_src}
              onClick={() => {
                onClickBookDetail && onClickBookDetail()
              }}
            />
          </div>
          {bookCode && (
            <div className={style.tag}>
              <span>{bookCode}</span>
            </div>
          )}
          {assignDate && (
            <div className={style.tag}>
              <span>+{assignDate}</span>
            </div>
          )}
          {earnPoint && (
            <div className={`${style.tag} ${style.point}`}>
              <span>{earnPoint}P</span>
            </div>
          )}
        </div>
      </div>
      {isBookInfo && (
        <BookInfoModal
          key={studyId}
          target={target}
          bookImgSrc={bookImgSrc}
          title={title}
          author={author}
          onClickDelete={() => {
            onClickBookDetail && onClickBookDetail()
          }}
          levelRoundId={levelRoundId}
          studyId={studyId}
          studentHistoryId={studentHistoryId}
          studentHistoryList={studentHistoryList}
          onSelectStudentHistoryId={onSelectStudentHistoryId}
        />
      )}
    </>
  )
}
