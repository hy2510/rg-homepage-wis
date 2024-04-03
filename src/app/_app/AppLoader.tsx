import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { makeCustomer } from '@/repository/client/object/customer'
import Common from '@/repository/server/common'
import AppProvider from './AppProvider'

type CustomerPayload = {
  applicationType: string
  customerData?: string
}
const getData = async (
  url: string,
  token?: string,
): Promise<CustomerPayload> => {
  let homepageUrl = url
  if (!url.startsWith('https') && !url.startsWith('http')) {
    homepageUrl = 'https://' + url
  }

  let payload: CustomerPayload | undefined = undefined
  const urlResponse = await Common.findCustomer({ homepageUrl })
  if (urlResponse.ok && urlResponse.data) {
    const customer = makeCustomer(urlResponse.data.Customer)
    const applicationType = customer.customerUse.toLowerCase()
    if (
      applicationType === 'private' ||
      applicationType === 'school' ||
      applicationType === 'academy'
    ) {
      payload = {
        applicationType,
        customerData: JSON.stringify(customer),
      }
    }
  }
  if (!payload) {
    if (token) {
      //FIXME - 개발서버 DB 하드코딩
      payload = {
        applicationType: 'app',
        customerData: JSON.stringify({
          Token:
            '97b3d41c2d8ef40ca0e8905172ad6552b0993c0a8816f6404367792216202e3e05a01e4b7d230c97d076c791d84837636b4f5369a8ef2a7bf2e8d4fb9709da65',
          Customer: {
            CustomerId: '001104',
            Name: '개인회원(DEV)',
            AreaCode: '003001',
            CustomerGroupCode: '002008',
            CustomerGroupName: '리딩게이트',
            CustomerUseCode: '008005',
            CustomerTypeCode: '',
            Round: '087',
            CustomerOldId: '100220',
            Postcode: '0-     ',
            Address: '경기도 성남시 수정구',
            DetailAddress: '창업로 43, A동 807~810호(글로벌비즈센터)',
            CellPhone: '',
            Telephone: '1599-0533',
            Fax: '',
            PayTypeCode: '',
            CeoName: '김용환',
            BusinessNo: '',
            LogoFilename:
              'https://wcfresource.a1edu.com/newsystem/image/acalogo/100220_top.png',
            BankCode: '',
            AccountNo: '0',
            Memo: '',
            ExpiredDate: '',
            UseYn: true,
            DeleteYn: false,
            SchoolYn: false,
            ViewPopupYn: true,
            ReportYn: true,
            StudyReportYn: true,
            MonthReportYn: true,
            YearReportYn: true,
            TeacherEvaluation: 'Fluency',
            AutoLevelUpYn: true,
            ViewVocaYn: true,
            ViewAssessmentYn: true,
            ViewLevelUpYn: true,
            LimitLevelYn: false,
            MinLevel: 0,
            MaxLevel: 0,
            UrlCode1: '',
            UrlCode2: '',
            ServiceYn: false,
            IniKeyCode: 'aoneedu001',
            CustomerUse: 'Private',
            SelfStudyYn: false,
            WholeSchoolYn: false,
            LanguageCode: 'ko-KR',
            ViewPbTypeSetupYn: true,
            ViewFullEasyYn: true,
            CountryCode: 'KR',
            MainBannerViewYn: true,
            UseEbookAniYn: true,
            StudentWorkSheetYn: true,
            ManagerWorkSheetYn: true,
            ViewRecommendBooksYn: true,
            NeedPayment: 'Y',
            StudyEBUseYn: true,
            StudyPBUseYn: true,
            StudyLCUseYn: false,
            StudyMSUseYn: false,
            StudyPDUseYn: false,
            StudyJNUseYn: false,
            StudyESUseYn: false,
            UseDodoAbcYn: 'A',
            UseSpeakYn: true,
            UseStudentNoYn: false,
          },
        }),
      }
      /*
       * 실제 DB연동 소스코드
      const meResponse = await Common.selfCustomer(token)
      if (meResponse.ok && meResponse.data) {
        const customer = makeCustomer(meResponse.data.Customer)
        payload = {
          applicationType: 'app',
          customerData: JSON.stringify(customer),
        }
      }
      */
    } else {
      payload = {
        applicationType: 'app',
        customerData: undefined,
      }
    }
  }

  if (!payload) {
    throw Error('Customer Not Found')
  }
  return payload
}

export default async function AppLoader({
  children,
}: {
  children?: ReactNode
}) {
  const findHost = headers().get('host') || ''
  const token = getAuthorizationWithCookie().getAccessToken()
  const data = await getData(findHost, token)

  if (data) {
    return (
      <AppProvider
        customerJson={data.customerData}
        applicationType={data.applicationType}
        isLogin={!!token}>
        {children}
      </AppProvider>
    )
  } else {
    return <div>Not Found Customer</div>
  }
}
