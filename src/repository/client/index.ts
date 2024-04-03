import { getLevelBooks } from '@/repository/client/achievement/level-books'
import { getLevelPoint } from '@/repository/client/achievement/level-point'
import Library from '@/repository/client/library'
import { getCategorySeries } from '@/repository/client/library/category/category-series'
import { getSearchLevelBook } from '@/repository/client/library/search/search-level'
import { getReadingKingEventDetail } from '@/repository/client/readingking/event-detail'
import { getReadingKingEventList } from '@/repository/client/readingking/event-list'
import { getClassGroup } from './account/class-group'
import { getClassList } from './account/class-list'
import { postFindIdClassAndStudentName } from './account/find-id-class-and-student-name'
import { getForgotId } from './account/forgot-id'
import { postForgotIdClassAndStudentName } from './account/forgot-id-class-and-student-name'
import { getForgotPassword } from './account/forgot-password'
import { postForgotPasswordConfirm } from './account/forgot-password-confirm'

/** Test */
import { postSignin } from './account/signin'
import { deleteSignout } from './account/signout'
import { postSignupCertEmail } from './account/signup-cert-email'
import { postSignupCertPhone_VN } from './account/signup-cert-phone-vn'
import { postSignupConfirmEmail } from './account/signup-confirm-email'
import { postSignupConfirmEmail_VN } from './account/signup-confirm-email-vn'
import { postSignupConfirmPhone_VN } from './account/signup-confirm-phone-vn'
import { postSignup_VN } from './account/signup-vn'
import { getLevelMaster } from './achievement/level-master'
import { getLevelTest } from './achievement/level-test'
import { getReadingKingTrophy } from './achievement/readingking-trophy'
import { getSuccessiveDailyGoal } from './achievement/success-daily-goal'
import { getSuccessiveStudy } from './achievement/success-study'
import { getPing } from './apiping'
import { getAttendCalendar } from './calendar/attend-calendar'
import { getStudyCalendar } from './calendar/study-calendar'
import { getFindCustomer } from './customer/find-customer'
import { getSearchCustomer } from './customer/search-customer'
import { getSpeakingReport } from './history/speaking-report'
import { getStudyReport } from './history/study-report'
import { getStudyReportSearch } from './history/study-report-search'
import { getCategoryTheme } from './library/category/category-theme'
import { getSearchDodoABCBook } from './library/search/search-dodoabc'
import { getSearchKeywordBook } from './library/search/search-keyword'
import { getSearchMovieBook } from './library/search/search-movie'
import { getSearchPreKBook } from './library/search/search-pk'
import { getSearchSeriesBook } from './library/search/search-series'
import { getSearchThemeBook } from './library/search/search-theme'
import { getSearchTryAgain } from './library/search/search-try-again'
import { getRankingPoint } from './ranking/point-ranking'
import { getRankingReadingking } from './ranking/readingking'
import { getReadingKingEventPrizeList } from './readingking/event-prize-list'
import { getReadingKingEventSet } from './readingking/event-prize-set'
import { postChangePassword } from './student/change-password'
import { postChangeSmsAgree } from './student/change-sms-agree'
import { putChangeStudentName } from './student/change-student-name'
import { postChangeStudySetting } from './student/change-study-setting'
import { getContinuousStudy } from './student/continuous-study'
import { getLevelTestInfo } from './student/level-test-info'
import { getStudent } from './student/student'
import { getStudentAvatarList } from './student/student-avatar-list'
import { putStudentAvatarUpdate } from './student/student-avatar-update'
import { getStudentDailyLearning } from './student/student-daily-learning'
import { getStudentDailyLearningHistory } from './student/student-daily-learning-history'
import { putStudentDailyLearningSave } from './student/student-daily-learning-save'
import { putStudentDailyLearningSaveLevel } from './student/student-daily-learning-save-level'
import { getStudentHistoryList } from './student/student-history-list'
import { getTodayStudyLearning } from './student/today-study-learning'

const Repository = {
  getPing,
  getLevelBooks,
  getLevelPoint,
  getLevelMaster,
  getLevelTest,
  getFavorite: Library.favorites,
  postFavoriteAdd: Library.addFavorites,
  deleteFavorite: Library.deleteFavorites,
  deleteFavoriteAll: Library.deleteAllFavorites,
  getTodo: Library.todos,
  postTodoAdd: Library.addTodos,
  deleteTodo: Library.deleteTodos,
  deleteTodoAll: Library.deleteAllTodos,
  getNewBooks: Library.newBooks,
  getBookInfo: Library.bookInfo,
  getCategorySeries,
  getCategoryTheme,
  getSearchLevelBook,
  getSearchPreKBook,
  getSearchDodoABCBook,
  getSearchThemeBook,
  getSearchSeriesBook,
  getReadingKingEventList,
  getReadingKingEventDetail,
  getReadingKingEventPrizeList,
  getReadingKingEventSet,
  getStudent,
  getStudentHistoryList,
  getStudentDailyLearning,
  putStudentDailyLearningSaveLevel,
  putStudentDailyLearningSave,
  getStudentDailyLearningHistory,
  postChangePassword,
  postChangeStudySetting,
  getSearchTryAgain,
  getSearchKeywordBook,
  getSearchMovieBook,
  getStudentAvatarList,
  putStudentAvatarUpdate,
  putChangeStudentName,
  postChangeSmsAgree,
  getRankingPoint,
  getRankingReadingking,
  getAttendCalendar,
  getStudyCalendar,
  getStudyReport,
  getStudyReportSearch,
  getSpeakingReport,
  getTodayStudyLearning,
  getLevelTestInfo,
  getContinuousStudy,
  getSuccessiveStudy,
  getSuccessiveDailyGoal,
  getReadingKingTrophy,
  postSignupCertEmail,
  postSignupConfirmEmail,
  postSignupConfirmEmail_VN,
  postSignupCertPhone_VN,
  postSignupConfirmPhone_VN,
  postSignup_VN,
  postSignin,
  deleteSignout,
  getForgotId,
  getForgotPassword,
  postForgotPasswordConfirm,
  postForgotIdClassAndStudentName,
  postFindIdClassAndStudentName,
  getClassGroup,
  getClassList,
  getSearchCustomer,
  getFindCustomer,
}
export default Repository
