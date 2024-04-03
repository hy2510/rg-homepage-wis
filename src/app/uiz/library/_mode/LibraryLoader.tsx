import { useCustomerInfo } from '@/client/context/CustomerContext'
import { useLibraryEbPbFilter } from '@/client/store/library/filter/selector'
import { useOnLoadLibraryHome } from '@/client/store/library/home/hook'
import {
  useLibraryHome,
  useLibraryHomeAction,
} from '@/client/store/library/home/selector'
import { useStudentDailyLearning } from '@/client/store/student/daily-learning/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { getUserConfig } from '../../_header/_fn/account-list'
import BookReadingMode from './BookReadingMode'
import ChallengeMode from './ChallengeMode'
import DodoABCMode from './DodoABCMode'
import PreKMode from './PreKMode'

export function LibraryLoader() {
  const libraryHome = useLibraryHome()
  const studentDaily = useStudentDailyLearning()
  const mode = libraryHome.mode
  const { updateMode } = useLibraryHomeAction()
  const customer = useCustomerInfo()
  const customerId = customer.customerId
  const studentId = useStudentInfo().payload.studentId

  const ebOption = useLibraryEbPbFilter('EB')
  const pbOption = useLibraryEbPbFilter('PB')

  const level = studentDaily.payload.settingLevelName || ''
  const bookType = 'EB'

  if (!mode && studentId && customerId) {
    const config = getUserConfig(
      {
        studentId,
        customerId,
      },
      true,
    )
    updateMode(config?.mode ? config.mode : 'level')
    return <div></div>
  }

  const pkType =
    customer.useDodoAbcYn === 'A' || customer.useDodoAbcYn === 'Y'
      ? 'Dodo'
      : 'PK'

  if (level === '' || (level === 'PK' && !pkType)) {
    return <div>Not Selected Level!</div>
  }

  const sort = bookType === 'EB' ? ebOption.sort : pbOption.sort
  const genre = bookType === 'EB' ? ebOption.genre : pbOption.genre
  const status = bookType === 'EB' ? ebOption.status : pbOption.status

  const libraryOption = {
    level,
    bookType,
    pkType: pkType as 'PK' | 'Dodo',
    sort,
    genre,
    status,
  }

  if (level === 'PK') {
    return <PreKLoading option={libraryOption} />
  } else {
    if (mode === 'challenge') {
      return <ChallengeLoading option={libraryOption} />
    }
    return <BookReadingLoading option={libraryOption} />
  }
}

function PreKLoading({
  option,
}: {
  option: {
    level: string
    bookType: string
    pkType: 'PK' | 'Dodo'
    sort: string
    genre: string
    status: string
  }
}) {
  const { loading, error } = useOnLoadLibraryHome(option)
  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }
  if (option.pkType === 'Dodo') {
    return <DodoABCMode />
  } else {
    return <PreKMode />
  }
}

function BookReadingLoading({
  option,
}: {
  option: {
    level: string
    bookType: string
    pkType: 'PK' | 'Dodo'
    sort: string
    genre: string
    status: string
  }
}) {
  const { loading, error } = useOnLoadLibraryHome(option)
  const { level } = useLibraryHome()

  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }

  return <BookReadingMode />
}

function ChallengeLoading({
  option,
}: {
  option: {
    level: string
    bookType: string
    pkType: 'PK' | 'Dodo'
    sort: string
    genre: string
    status: string
  }
}) {
  const { loading, error } = useOnLoadLibraryHome(option)
  const { level } = useLibraryHome()

  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }

  return <ChallengeMode />
}
