const HOME = {
  MAIN: '/uiz/home/main',
  // NOTICE: '/uiz/home/main/rg-news/notice',
  // NEWS_LETTER: '/uiz/home/main/rg-news/newsletter',
  // NEW_CONTENTS: '/uiz/home/main/rg-news/new-contents',
  // INFOGRAPHIC: '/uiz/home/main/rg-news/infographic',
  // EVENT_CHALLENGE: '/uiz/home/main/rg-news/challenge',
  // EVENT_SUPERSTAR: '/uiz/home/main/rg-news/superstar',
  // EVENT_READING_CAMPAIN: '/uiz/home/main/rg-news/campaign',
  CUSTOMER_INTERVIEW: '/uiz/home/customer-review/interview',
  SNS_REVIEW: '/uiz/home/customer-review/sns',
  MEMBERSHIP_INTRODUCE: '/uiz/home/rg-membership/introduction',
  MEMBERSHIP_REFUND_POLICY: '/uiz/home/rg-membership/refund-policy',
  MEMBERSHIP_SERVICE_TERM: '/uiz/home/rg-membership/terms-of-service',
  MEMBERSHIP_PRIVACY_POLICY: '/uiz/home/rg-membership/privacy-policy',
}
const ACCOUNT = {
  MAIN: '/uiz/account/account-list',
  SIGN_IN: '/uiz/account/sign-in',
  SIGN_UP: '/uiz/account/sign-up',
  SIGN_UP_WELCOME: '/uiz/account/welcome',
  FORGOT_ID: '/uiz/account/forgot-id',
  FORGOT_PASSWORD: '/uiz/account/forgot-password',
  INFO: '/uiz/account/account-info',
}
const LIBRARY = {
  HOME: '/uiz/library',
  TODO: '/uiz/library/assignment/to-do',
  TRY_AGAIN: '/uiz/library/assignment/try-again',
  FAVORITE: '/uiz/library/assignment/favorite',
  // DODO_ABC: '/uiz/library/dodo-abc',
  DODO_ABC_STUDY: '/uiz/library/dodo-abc/study',
  DODO_ABC_SONG: '/uiz/library/dodo-abc/song-n-chant',
  DODO_ABC_GAME: '/uiz/library/dodo-abc/game',
  PRE_K: '/uiz/library/pre-k',
  E_BOOK: '/uiz/library/e-book',
  P_BOOK: '/uiz/library/p-book-quiz',
  NEW_BOOK: '/uiz/library/new-books',
  SEARCH: '/uiz/library/search',
  SERIES: '/uiz/library/series',
  THEME: '/uiz/library/theme',
  MOVIE_BOOK: '/uiz/library/movie-book',
}
const REVIEW = {
  SIMPLE: '/uiz/review',
  DETAIL: '/uiz/review/detailed-view',
}
const RANKING = {
  POINT: '/uiz/ranking/points-rank',
  CAHLLENGE: '/uiz/ranking/challenge-rank',
}

export function isValidatePath(path: string): boolean {
  let isContainPath = false
  const entries = Object.entries(SITE_PATH)
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i]
    const itemValue = item[1]
    const type = typeof itemValue
    if (type === 'object') {
      const paths = Object.values(itemValue)
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j]
        isContainPath = p === path
        if (isContainPath) {
          break
        }
      }
    }
    if (isContainPath) {
      break
    }
  }
  return isContainPath
}

export function getValidatePath(path: string): string {
  let isContainPath = isValidatePath(path)
  if (!isContainPath) {
    return HOME.MAIN
  }
  return path
}

const SITE_PATH = {
  HOME,
  ACCOUNT,
  LIBRARY,
  REVIEW,
  RANKING,
}
export default SITE_PATH
