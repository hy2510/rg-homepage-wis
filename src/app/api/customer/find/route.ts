import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { NextRequest } from 'next/server'
import Common from '@/repository/server/common'

export async function GET(request: NextRequest) {
  const parameter = await getParameters(request, 'customerId')
  const customerId = parameter.getString('customerId')

  // FIXME - 개발서버 DB 하드코딩
  if (true) {
    const newState = {
      status: 201,
    }
    const newPayload: { Token: string; Customer: any } = {
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
    }
    return RouteResponse.response(newPayload, newState)
  }
  const [payload, status, error] = await executeRequestAction(
    Common.findCustomer({ customerId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
