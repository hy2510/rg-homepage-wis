'use client'

import {
  useFetchLibraryLevelDodoAbc,
  useOnLoadLibraryLevelDodoAbc,
} from '@/client/store/library/dodo-abc/hook'
import { useLibraryDodoAbcLevel } from '@/client/store/library/dodo-abc/selector'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { DodoABCGameBookList } from '@/ui/modules/library-find-book-list/book-list-dodo-abc-game'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelDropDown, {
  DropDownOption,
} from '@/ui/modules/library-find-study-level-selector/StudyLevelDropDown'
import StudentHistorySelectModal from '../../_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../../_fn/use-quick-study-start'
import DodoABCNavBar from '../_component/DodoABCNavBar'

const STYLE_ID = 'page_dodo_abc_game'
export default function Page() {
  const { loading } = useOnLoadLibraryLevelDodoAbc({
    activity: 'Game-Alphabet',
  })
  if (loading) {
    return <LoadingScreen />
  }
  return <DodoABCGame />
}
function DodoABCGame() {
  const style = useStyle(STYLE_ID)

  const { fetch: updateBook } = useFetchLibraryLevelDodoAbc()
  const { option, payload: books } = useLibraryDodoAbcLevel()

  const preKCategory: DropDownOption[] = [
    { key: 'Game-Alphabet', label: '알파벳' },
    { key: 'Game-Phonics', label: '파닉스' },
    { key: 'Game-Sight-Words-1', label: '사이트워드1' },
    { key: 'Game-Sight-Words-2', label: '사이트워드2' },
  ]
  let currentActivity = preKCategory[0]
  for (let i = 0; i < preKCategory.length; i++) {
    if (option.activity === preKCategory[i].key) {
      currentActivity = preKCategory[i]
      break
    }
  }

  const onChangeFilterActivity = (activity: string) => {
    updateBook({ activity })
  }

  const {
    studentHistoryId,
    studentHistoryList,
    selectLevelRoundId,
    setSelectLevelRoundId,
    startStudyIfAvail,
    startStudyImmediate,
  } = useQuickStudyStart()

  return (
    <>
      <DodoABCNavBar active={'game'} />
      <main className={style.dodo_abc_game}>
        <StudyLevelBox>
          <StudyLevelDropDown
            currentItem={currentActivity}
            items={preKCategory}
            onItemClick={(key) => onChangeFilterActivity(key)}
          />
        </StudyLevelBox>
        <DodoABCGameBookList count={books.book.length}>
          {books.book.map((a, i) => {
            return (
              <DodoAbcBookCover
                key={`book-cover-${i}-${a.surfaceImagePath}`}
                bookImgSrc={a.surfaceImagePath}
                levelRoundId={a.levelRoundId}
                isDisabled={!a.gameLandRoundOpenYn}
                onStartStudy={startStudyIfAvail}
              />
            )
          })}
        </DodoABCGameBookList>
        {selectLevelRoundId && (
          <StudentHistorySelectModal
            levelRoundId={selectLevelRoundId}
            studentHistoryList={studentHistoryList}
            defaultStudentHistoryId={studentHistoryId}
            onCloseModal={() => setSelectLevelRoundId(undefined)}
            onStartActivity={startStudyImmediate}
          />
        )}
      </main>
    </>
  )
}

const DodoAbcBookCover = ({
  bookImgSrc,
  levelRoundId,
  isDisabled = true,
  onStartStudy,
}: {
  bookImgSrc: string
  levelRoundId: string
  isDisabled?: boolean
  onStartStudy?: (levelRoundId: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.dodo_abc_game_cover}>
      <div
        className={`${style.group1} ${isDisabled ? style.incompleted : ''}`}
        onClick={() => {
          if (!isDisabled && onStartStudy) {
            onStartStudy(levelRoundId)
          }
        }}>
        <div className={style.completed_label}>
          <div className={style.ico_star}></div>
          <div className={style.ico_star}></div>
        </div>
        <img alt="" src={bookImgSrc} width={'100%'} />
      </div>
      {/* <div className={style.group2}>
        <div className={style.btn_start}>Start</div>
      </div> */}
    </div>
  )
}
