'use client'

import {
  useFetchLibraryLevelDodoAbc,
  useOnLoadLibraryLevelDodoAbc,
} from '@/client/store/library/dodo-abc/hook'
import { useLibraryDodoAbcLevel } from '@/client/store/library/dodo-abc/selector'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { DodoABCStudyBookList } from '@/ui/modules/library-find-book-list/book-list-dodo-abc-study'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelDropDown, {
  DropDownOption,
} from '@/ui/modules/library-find-study-level-selector/StudyLevelDropDown'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '@/ui/modules/library-set-fliter/LibrarySearchFilter'
import StudentHistorySelectModal from '../../_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../../_fn/use-quick-study-start'
import DodoABCNavBar from '../_component/DodoABCNavBar'

const STYLE_ID = 'page_dodo_abc_study'
export default function Page() {
  const { loading } = useOnLoadLibraryLevelDodoAbc({})
  if (loading) {
    return <LoadingScreen />
  }
  return <DodoABCStudy />
}

function DodoABCStudy() {
  const style = useStyle(STYLE_ID)

  const { fetch: updateBook } = useFetchLibraryLevelDodoAbc()
  const { option, payload: books } = useLibraryDodoAbcLevel()

  const preKCategory: DropDownOption[] = [
    { key: 'Study-Alphabet', label: '알파벳' },
    { key: 'Study-Phonics-1', label: '파닉스1' },
    { key: 'Study-Phonics-2', label: '파닉스2' },
    { key: 'Study-Sight-Words-1', label: '사이트워드1' },
    { key: 'Study-Sight-Words-2', label: '사이트워드2' },
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

  const bookFilter = [
    {
      group: 'status',
      title: '학습 상태',
      option: [
        { id: 'All', label: '모든 학습', enabled: option.status === 'All' },
        {
          id: 'Before',
          label: '미완료 학습',
          enabled: option.status === 'Before',
        },
        {
          id: 'Complete',
          label: '완료한 학습',
          enabled: option.status === 'Complete',
        },
      ],
    },
  ]

  const onFilterChanged = (filterOption: LibraryFilterOption[]) => {
    const findOptionId = (group: LibraryFilterOption) => {
      let value: string | undefined = undefined
      const option = group.option.filter((opt) => opt.enabled)
      if (option.length > 0) {
        value = option[0].id
      }
      return value
    }
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      }
    })
    updateBook({ status })
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
      <DodoABCNavBar active={'study'} />
      <main className={style.dodo_abc}>
        <StudyLevelBox>
          <StudyLevelDropDown
            currentItem={currentActivity}
            items={preKCategory}
            onItemClick={(key) => onChangeFilterActivity(key)}
          />
          <LibrarySearchFilter
            optionList={bookFilter}
            onOptionChange={onFilterChanged}
          />
        </StudyLevelBox>
        <DodoABCStudyBookList count={books.book.length}>
          {books.book.map((a, i) => {
            return (
              <DodoAbcBookCover
                key={`book-cover-${i}`}
                bookImgSrc={a.surfaceImagePath}
                levelRoundId={a.levelRoundId}
                onStartStudy={startStudyIfAvail}
              />
            )
          })}
        </DodoABCStudyBookList>
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
  onStartStudy,
}: {
  bookImgSrc: string
  levelRoundId: string
  onStartStudy?: (levelRoundId: string) => void
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <div className={style.dodo_abc_book_cover}>
      <div
        className={style.group1}
        onClick={() => {
          onStartStudy && onStartStudy(levelRoundId)
        }}>
        <img alt="" src={bookImgSrc} width={'100%'} />
      </div>
      <div className={style.group2}>
        <div className={style.btn_download}></div>
        {/* <div className={style.btn_start}>Start</div> */}
      </div>
    </div>
  )
}
