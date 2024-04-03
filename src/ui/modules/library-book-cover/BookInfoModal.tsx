'use client'

import { goToStudy } from '@/app/_function/study-start'
import Image from 'next/image'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  useFetchBookInfoDetail,
  useOnLoadBookInfoDetail,
} from '@/client/store/bookinfo/detail/hook'
import {
  useBookInfoDetail,
  useBookInfoDetailAction,
} from '@/client/store/bookinfo/detail/selector'
import {
  useFetchLibraryAddFavroite,
  useFetchLibraryDeleteFavorite,
} from '@/client/store/library/favorites/hook'
import {
  useLibraryFavorite,
  useLibraryFavoriteAction,
} from '@/client/store/library/favorites/selector'
import {
  useFetchLibraryAddTodo,
  useFetchLibraryDeleteTodo,
  useFetchLibraryTodos,
} from '@/client/store/library/todos/hook'
import { BookInfo } from '@/repository/client/object/book-info'
import {
  AlertBox,
  Button,
  Modal,
  SelectBox,
  SelectBoxItem,
} from '@/ui/common/common-components'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'book_cover'

export interface BookInfoModal {
  target: string
  bookImgSrc: string
  title: string
  author: string
  levelRoundId: string
  studyId?: string
  studentHistoryId: string
  onClickDelete?: () => void
  onClickLightBox?: () => void

  studentHistoryList?: any[]
  onSelectStudentHistoryId?: (studentHistoryId: string) => void
}
type StudyStart = 'study' | 'speak'

// 도서 정보 모달
export function BookInfoModal({
  target,
  bookImgSrc,
  title,
  author,
  levelRoundId,
  studyId,
  studentHistoryId,
  onClickDelete,
  onClickLightBox,
  studentHistoryList,
  onSelectStudentHistoryId,
}: BookInfoModal) {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'
  const { loading: isBookInfoInitLoading } = useOnLoadBookInfoDetail({
    levelRoundId,
    studyId,
    studentHistoryId,
  })
  const { fetch: bookInfoReload, loading: isBookInfoLoading } =
    useFetchBookInfoDetail()

  const { fetch: todoListReload } = useFetchLibraryTodos()

  const bookInfo = useBookInfoDetail().payload
  const bookInfoAction = useBookInfoDetailAction()

  const {
    fetch: addFavorite,
    loading: isAddFavoriteLoading,
    success: isAddFavoriteSuccess,
  } = useFetchLibraryAddFavroite()
  const {
    fetch: deleteFavorite,
    loading: isDeleteFavoriteLoading,
    success: isDeleteFavoriteSuccess,
  } = useFetchLibraryDeleteFavorite()

  const favoriteChangeAction = bookInfoAction.setFavorite
  const favoriteCount = useLibraryFavorite().count
  const favoriteCountAction = useLibraryFavoriteAction().setFavoriteCount

  const onAddFavorite = () => {
    if (
      !isBookInfoInitLoading &&
      !isAddFavoriteLoading &&
      !isDeleteFavoriteLoading
    ) {
      const levelRoundIds = [levelRoundId]
      addFavorite({
        levelRoundIds,
        callback: ({ success, error }) => {
          if (success && !error) {
            favoriteChangeAction(true)
            favoriteCountAction(favoriteCount + 1)
          }
        },
      })
    }
  }
  const onDeleteFavorite = () => {
    if (
      !isBookInfoInitLoading &&
      !isAddFavoriteLoading &&
      !isDeleteFavoriteLoading
    ) {
      const levelRoundIds = [levelRoundId]
      deleteFavorite({
        levelRoundIds,
        callback: ({ success, error }) => {
          if (success && !error) {
            favoriteChangeAction(false)
            favoriteCountAction(favoriteCount - 1)
          }
        },
      })
    }
  }
  const {
    fetch: deleteTodo,
    loading: isDeleteTodoLoading,
    success: isDeleteTodoSuccess,
    reset: deleteTodoReset,
  } = useFetchLibraryDeleteTodo()
  const onDeleteTodo = () => {
    if (
      !isBookInfoInitLoading &&
      !isAddTodoLoading &&
      !isDeleteTodoLoading &&
      bookInfo &&
      bookInfo.studyId &&
      !bookInfo.studyStartedYn
    ) {
      const studyIds = [bookInfo.studyId]
      deleteTodo({
        studyIds,
        callback: ({ success, error }) => {
          if (success && !error) {
            todoListReload({ isReload: true })
            bookInfoReload({ levelRoundId, studentHistoryId })
          }
        },
      })
    }
  }
  const { fetch: addTodo, loading: isAddTodoLoading } = useFetchLibraryAddTodo()
  const onAddTodo = (study?: StudyStart) => {
    if (!isBookInfoInitLoading && !isAddTodoLoading && !isDeleteTodoLoading) {
      const levelRoundIds = [levelRoundId]
      addTodo({
        levelRoundIds,
        studentHistoryId,
        callback: ({ success, error }) => {
          if (success && !error) {
            todoListReload({ isReload: true })
            bookInfoReload({
              levelRoundId,
              studentHistoryId,
              callback: study
                ? ({ success, error, payload }) => {
                    if (success && !error && payload) {
                      onStartStudy(study!, payload)
                    }
                  }
                : undefined,
            })
          }
        },
      })
    }
  }

  const otherButtonLock =
    isAddFavoriteSuccess ||
    isDeleteFavoriteSuccess ||
    isAddFavoriteLoading ||
    isDeleteFavoriteLoading ||
    isBookInfoLoading ||
    isAddTodoLoading ||
    isDeleteTodoLoading

  const onClickStart = (study: StudyStart) => {
    if (!otherButtonLock) {
      if (bookInfo.studyId) {
        onStartStudy(study, bookInfo)
      } else {
        onAddTodo(study)
      }
    }
  }

  const onStartStudy = (study: StudyStart, bookInfo: BookInfo) => {
    goToStudy({
      studyInfo: bookInfo,
      mode: 'quiz',
      isStartSpeak: study === 'speak',
    })
  }

  const [confirmMessageType, setConfirmMessageType] = useState<
    'Favorite' | 'Todo' | undefined
  >(undefined)

  let isFirstPointPassed = false
  let isSecondPointPassed = false
  let firstPointText = ''
  let secondPointText = ''
  if (bookInfo.passCount === 0) {
    if (bookInfo.studyTypeFullEasyYn) {
      const studyMode = bookInfo.studyMode
      if (studyMode === 'full') {
        isFirstPointPassed = true
      } else if (studyMode === 'easy') {
        isSecondPointPassed = true
      }
      firstPointText = `Easy 모드 완료 시 ${bookInfo.secondRgPoint}P 획득`
      secondPointText = `Full 모드 완료 시 ${bookInfo.rgPoint}P 획득`
    } else {
      isSecondPointPassed = true
      firstPointText = `학습 1회 완료 시 ${bookInfo.rgPoint}P 획득`
      secondPointText = `학습 2회 완료 시 ${bookInfo.secondRgPoint}P 획득`
    }
  } else if (bookInfo.passCount === 1) {
    if (bookInfo.studyTypeFullEasyYn) {
      const studyMode = bookInfo.studyMode
      if (
        studyMode === 'select:easy' ||
        studyMode === 'add:easy' ||
        studyMode === 'easy'
      ) {
        isSecondPointPassed = true
        firstPointText = `Easy 모드 완료 시 ${bookInfo.secondRgPoint}P 획득`
        secondPointText = `Full 모드 완료 (+${bookInfo.rgPoint}P)`
      } else {
        isFirstPointPassed = true
        firstPointText = `Easy 모드 완료 (+${bookInfo.secondRgPoint}P)`
        secondPointText = `Full 모드 완료 시 ${bookInfo.rgPoint}P 획득`
      }
    } else {
      isFirstPointPassed = true
      firstPointText = `학습 1회 완료 (+${bookInfo.rgPoint}P)`
      secondPointText = `학습 2회 완료 시 ${bookInfo.secondRgPoint}P 획득`
    }
  } else {
    isFirstPointPassed = true
    isSecondPointPassed = true
    if (bookInfo.studyTypeFullEasyYn) {
      firstPointText = `Easy 모드 완료 (+${bookInfo.secondRgPoint}P)`
      secondPointText = `Full 모드 완료 (+${bookInfo.rgPoint}P)`
    } else {
      firstPointText = `학습 1회 완료 (+${bookInfo.rgPoint}P)`
      secondPointText = `학습 2회 완료 (+${bookInfo.secondRgPoint}P)`
    }
  }
  const firstPointClassName = `${style.detaild_item} ${isFirstPointPassed ? style.passed : ''}`
  const secondPointClassName = `${style.detaild_item} ${isSecondPointPassed ? style.passed : ''}`

  const isAssigned = !!bookInfo.studyId

  const [isMoviePlay, setMoviePlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoStop = () => {
    videoRef?.current?.pause()
  }

  useEffect(() => {
    return () => {
      videoStop()
    }
  }, [])

  return (
    <Modal
      onClickDelete={() => {
        onClickDelete && onClickDelete()
        bookInfoAction.resetBookDetail()
      }}
      onClickLightbox={() => {
        if (onClickLightBox) {
          onClickLightBox()
        } else if (onClickDelete) {
          onClickDelete()
        }
        bookInfoAction.resetBookDetail()
      }}>
      <div className={style.book_info_modal}>
        <div
          className={style.col_a}
          style={{ backgroundImage: `url(${bookImgSrc})` }}>
          <div className={style.col_a_container}>
            <AddAssignment>
              <AddFavorite
                isFavorite={bookInfo.bookMarkYn}
                isConfirmMessage={confirmMessageType === 'Favorite'}
                onClick={() => {
                  if (confirmMessageType !== 'Favorite') {
                    setConfirmMessageType('Favorite')
                  } else {
                    setConfirmMessageType(undefined)
                  }
                }}
                onAddFavorite={onAddFavorite}
                onDeleteFavorite={onDeleteFavorite}
              />
              <AddTodo
                isTodo={isAssigned}
                isConfirmMessage={confirmMessageType === 'Todo'}
                onClick={() => {
                  if (!bookInfo.studyStartedYn) {
                    if (confirmMessageType !== 'Todo') {
                      setConfirmMessageType('Todo')
                    } else {
                      setConfirmMessageType(undefined)
                    }
                  }
                }}
                onAddTodo={onAddTodo}
                onDeleteTodo={onDeleteTodo}
              />
            </AddAssignment>
            <div className={style.book}>
              <div className={style.book_container}>
                {bookInfo.animationPath ? (
                  <div className={style.movie_player}>
                    <video
                      ref={videoRef}
                      poster={bookImgSrc}
                      disablePictureInPicture={true}
                      autoPlay={false}
                      controls={true}
                      controlsList={'nodownload'}
                      playsInline={true}
                      style={{
                        width: '100%',
                        display: 'block',
                        maxHeight: isMobile ? '280px' : '300px',
                      }}
                      src={bookInfo.animationPath}
                    />
                  </div>
                ) : (
                  <div className={style.book_image}>
                    <Image
                      alt=""
                      src={bookImgSrc}
                      layout="intrinsic"
                      width={200}
                      height={200}
                    />
                  </div>
                )}

                <div className={style.txt_h}>{title}</div>
                <div className={style.txt_l}>{author}</div>
              </div>
              <div className={style.download}>
                <div className={style.download_voca}>
                  <span>단어장</span>
                  <Image
                    alt=""
                    src="/src/images/@book-info/download.svg"
                    width={14}
                    height={14}
                  />
                </div>
                <div className={style.download_worksheet}>
                  <span>워크시트</span>
                  <Image
                    alt=""
                    src="/src/images/@book-info/download.svg"
                    width={14}
                    height={14}
                  />
                </div>
              </div>
            </div>
            {!isAssigned &&
              studentHistoryList &&
              studentHistoryList.length > 1 && (
                <SelectBox
                  value={studentHistoryId}
                  onChange={(e) => {
                    onSelectStudentHistoryId &&
                      onSelectStudentHistoryId(e.target.value)
                  }}>
                  {studentHistoryList.map((stdHistory) => {
                    return (
                      <SelectBoxItem
                        key={stdHistory.studentHistoryId}
                        value={stdHistory.studentHistoryId}>
                        {stdHistory.className}
                      </SelectBoxItem>
                    )
                  })}
                </SelectBox>
              )}
            <Button
              width="100%"
              shadow
              color={'red'}
              onClick={() => onClickStart('study')}>
              학습하기
            </Button>
          </div>
          <div className={style.light_box}></div>
        </div>
        <div className={style.col_b}>
          <div className={style.col_b_header}>
            <div className={style.txt_h}>학습 정보</div>
            <div className={style.delete_button} onClick={onClickDelete}>
              {/* <Image
                  alt=""
                  src="/src/images/delete-icons/x_black.svg"
                  width={28}
                  height={28}
                /> */}
            </div>
          </div>
          <div className={style.col_b_body}>
            <div className={style.book_info}>
              <div className={style.txt_p}>{bookInfo.synopsis}</div>
              <div className={style.detaild}>
                <div className={style.detaild_row_a}>
                  <div className={style.detaild_item}>학습 레벨</div>
                  <div
                    className={
                      style.detaild_item
                    }>{`${bookInfo.bookLevel}`}</div>
                  <div className={style.detaild_item}>북코드</div>
                  <div
                    className={
                      style.detaild_item
                    }>{`${bookInfo.bookCode}`}</div>
                  <div className={style.detaild_item}>페이지수</div>
                  <div
                    className={style.detaild_item}>{`${bookInfo.pages}`}</div>
                  <div className={style.detaild_item}>단어수</div>
                  <div
                    className={
                      style.detaild_item
                    }>{`${bookInfo.wordCount}`}</div>
                  <div className={style.detaild_item}>등급</div>
                  <div
                    className={
                      style.detaild_item
                    }>{`${bookInfo.recommendedAge === 'B' ? 'Teen' : bookInfo.recommendedAge === 'C' ? 'Adult' : 'All'}`}</div>
                  <div className={style.detaild_item}>장르</div>
                  <div
                    className={style.detaild_item}>{`${bookInfo.genre}`}</div>
                </div>
                <div className={style.detaild_row_b}>
                  <div className={style.detaild_item}>학습횟수</div>
                  <div className={style.detaild_item}>
                    {bookInfo.passCount <= 2 ? bookInfo.passCount : 2}/2
                  </div>
                  <div className={style.detaild_item}>포인트</div>

                  <div className={`${firstPointClassName}`}>
                    {firstPointText}
                  </div>
                  <div className={style.detaild_item} />
                  <div className={`${secondPointClassName}`}>
                    {secondPointText}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.book_resource}>
              {(bookInfo.speakContentYn || bookInfo.animationPath) && (
                <div className={style.book_resource_container}>
                  <div className={style.txt_h}>보너스 학습</div>
                  <div className={style.buttons}>
                    {bookInfo.speakContentYn && (
                      <div
                        className={style.speak_button}
                        onClick={() => onClickStart('speak')}>
                        Speak{`${bookInfo.speakPassYn ? ' Pass' : ''}`}
                      </div>
                    )}
                    {/* {bookInfo.animationPath && (
                      <div
                        className={style.movie_button}
                        onClick={() => setMoviePlay(true)}>
                        영상시청
                      </div>
                    )} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isMoviePlay && (
        <div className={style.movie_player}>
          <div className={style.container_video}>
            <video
              ref={videoRef}
              poster={bookImgSrc}
              disablePictureInPicture={true}
              autoPlay={false}
              controls={true}
              controlsList={'nodownload'}
              playsInline={true}
              style={{
                width: '100%',
                display: 'block',
                maxHeight: isMobile ? '280px' : '300px',
              }}
              src={bookInfo.animationPath}
            />
          </div>
          <Button
            color={'red'}
            shadow
            width={'200px'}
            onClick={() => {
              videoStop()
              setMoviePlay(false)
            }}>
            close
          </Button>
        </div>
      )}
    </Modal>
  )
}

const AddAssignment = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.add_assignment}>
      <div className={style.add_assignment_container}>{children}</div>
    </div>
  )
}

const AddFavorite = ({
  isFavorite,
  isConfirmMessage,
  onClick,
  onAddFavorite,
  onDeleteFavorite,
}: {
  isFavorite: boolean
  isConfirmMessage: boolean
  onClick?: () => void
  onAddFavorite?: () => void
  onDeleteFavorite?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  const isMobile = useScreenMode() === 'mobile'

  return (
    <div className={style.add_favorite}>
      <div
        className={style.add_favorite_icon}
        onClick={() => {
          onClick && onClick()
        }}>
        {isFavorite ? (
          <Image
            alt=""
            src="/src/images/@book-info/add_favorite_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@book-info/add_favorite_off.svg"
            width={24}
            height={24}
          />
        )}
      </div>
      {isConfirmMessage && (
        <div className={style.alert}>
          <AlertBox
            toolTipRight={!isMobile}
            toolTipLeft={isMobile}
            text={
              isFavorite
                ? 'Favorite에서 학습을 삭제할까요?'
                : 'Favorite에 학습을 추가할까요?'
            }
            onClickY={() => {
              if (isFavorite) {
                onDeleteFavorite && onDeleteFavorite()
              } else {
                onAddFavorite && onAddFavorite()
              }
              onClick && onClick()
            }}
            onClickN={() => {
              onClick && onClick()
            }}
          />
        </div>
      )}
    </div>
  )
}

const AddTodo = ({
  isTodo,
  isConfirmMessage,
  onClick,
  onAddTodo,
  onDeleteTodo,
}: {
  isTodo: boolean
  isConfirmMessage: boolean
  onClick?: () => void
  onAddTodo?: () => void
  onDeleteTodo?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  const isMobile = useScreenMode() === 'mobile'

  return (
    <div className={style.add_todo}>
      <div
        className={style.add_todo_icon}
        onClick={() => {
          onClick && onClick()
        }}>
        {isTodo ? (
          <Image
            alt=""
            src="/src/images/@book-info/add_to_do_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@book-info/add_to_do_off.svg"
            width={24}
            height={24}
          />
        )}
      </div>
      {isConfirmMessage && (
        <div className={style.alert}>
          <AlertBox
            toolTipRight={!isMobile}
            toolTipLeft={isMobile}
            text={
              isTodo
                ? 'To-Do에서 학습을 삭제할까요?'
                : 'To-Do에 학습을 추가할까요?'
            }
            onClickY={() => {
              if (isTodo) {
                onDeleteTodo && onDeleteTodo()
              } else {
                onAddTodo && onAddTodo()
              }
              onClick && onClick()
            }}
            onClickN={() => {
              onClick && onClick()
            }}
          />
        </div>
      )}
    </div>
  )
}
