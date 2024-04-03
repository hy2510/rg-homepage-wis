'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'common'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function selfCustomer(token: string) {
  const request = makeRequest({
    token,
    path: getPath('customer'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function findCustomer(input: {
  homepageUrl?: string
  customerId?: string
}) {
  let requestPath = getPath(`find-customer?homepageUrl=${input.homepageUrl}`)
  if (!input.homepageUrl) {
    requestPath = getPath(`find-customer?customerId=${input.customerId}`)
  }
  const request = makeRequest({
    path: requestPath,
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function searchCustomer(input: {
  keyword?: string
  customerUse?: string
  countryCode?: string
}) {
  let requestPath = getPath(
    `customer-search?keyword=${input.keyword}&customerUse=${input.customerUse}&countryCode=${input.countryCode}`,
  )

  const request = makeRequest({
    path: requestPath,
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

const Common = {
  selfCustomer,
  findCustomer,
  searchCustomer,
}
export default Common
