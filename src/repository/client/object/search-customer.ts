import RenewType from '@/util/string-utils'
export interface SearchCustomer { 
  name: string
  customerId: string
  homepageUrl: string
  databaseName: string
  customerUseCode: string
  databaseIp: string
  readingGateIp: string
  logoFilename: string
  appSvrIp: string
  appSvrPort: number
  appSvrUrl: string
  useStudentNoYn: boolean
  countryCode: string
}

export function makeSearchCustomer(json?: any): SearchCustomer { 
  return { 
    name: RenewType.renewString(json?.Name), 
    customerId: RenewType.renewString(json?.CustomerId), 
    homepageUrl: RenewType.renewString(json?.HomepageUrl), 
    databaseName: RenewType.renewString(json?.DatabaseName), 
    customerUseCode: RenewType.renewString(json?.CustomerUseCode), 
    databaseIp: RenewType.renewString(json?.DatabaseIp), 
    readingGateIp: RenewType.renewString(json?.ReadingGateIp), 
    logoFilename: RenewType.renewString(json?.LogoFilename), 
    appSvrIp: RenewType.renewString(json?.AppSvrIp), 
    appSvrPort: RenewType.renewNumber(json?.AppSvrPort), 
    appSvrUrl: RenewType.renewString(json?.AppSvrUrl), 
    useStudentNoYn: RenewType.renewBoolean(json?.UseStudentNoYn), 
    countryCode: RenewType.renewString(json?.CountryCode), 
  }
}
