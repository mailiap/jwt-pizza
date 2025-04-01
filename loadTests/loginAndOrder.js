import { sleep } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  const vars = {}

  response = http.put(
    'https://pizza.mailiap.click/api/auth',
    '{"email":"mailiap@byu.edu","password":"admin"}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        origin: 'https://pizza.mailiap.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    }
  )

  vars['token'] = jsonpath.query(response.json(), '$.token')[0]

  response = http.options('https://pizza.mailiap.click/api/auth', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'content-type',
      'access-control-request-method': 'PUT',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(2.5)

  response = http.get('https://pizza.mailiap.click/api/order/menu', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `Bearer ${vars['token']}`,
      'content-type': 'application/json',
      'if-none-match': 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.options('https://pizza.mailiap.click/api/order/menu', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'GET',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.get('https://pizza.mailiap.click/api/franchise', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `Bearer ${vars['token']}`,
      'content-type': 'application/json',
      'if-none-match': 'W/"40-EPPawbPn0KtYVCL5qBynMCqA1xo"',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.options('https://pizza.mailiap.click/api/franchise', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'GET',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(62.6)

  response = http.post(
    'https://pizza.mailiap.click/api/order',
    '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.mailiap.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    }
  )

  response = http.options('https://pizza.mailiap.click/api/order', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'POST',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(3.9)

  response = http.post(
    'https://pizza-factory.cs329.click/api/order/verify',
    '{"jwt":"eyJpYXQiOjE3NDM0ODgyNjksImV4cCI6MTc0MzU3NDY2OSwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJsc2o3IiwibmFtZSI6IkxlZSBKZW5zZW4ifSwiZGluZXIiOnsiaWQiOjQsIm5hbWUiOiJNYWlMaWEgUG9oYWhhdSIsImVtYWlsIjoibWFpbGlhcEBieXUuZWR1In0sIm9yZGVyIjp7Iml0ZW1zIjpbeyJtZW51SWQiOjEsImRlc2NyaXB0aW9uIjoiVmVnZ2llIiwicHJpY2UiOjAuMDAzOH1dLCJzdG9yZUlkIjoiMSIsImZyYW5jaGlzZUlkIjoxLCJpZCI6NH19.henHeTxPYKWpEIa9RYY6Z_RM2jBEN1pYTulxz-lXnJX45EotTx1Icl2jmENvq7C7h_kYD4QLsOkpo16YZefUsjdVJVKQ8vorQacqjW9dpqnpuHuc73xrnxOuQQ1D9nfqOaMsElzvx8EoDQlLG8l4FhxvDYS2R9FfTe_0mpLc4ZQLJk72aK4y_7KHZSouabcq191Im4xwOomM_k0rpYAQ8qjpNMyDTkyMOXtE9c_PrSK_q4cdsYY9Sp9Q5o9vaZARY4Th356-frKhGTYSeGnq3_kHwlCMR7l9f1IFovLB0wNpAoEECUVtuEd01zLqA3ro_MKE_I6BVZStKFsGbPKxhpHFSir67PtfMwF7fAQe0QfYVW27HSkJ0jH2XYPIRQOzoO3P72Z49bhI4ReowDm8IRgprm7s9lsjSWDIXEyl8fDWMDcP88wAMETngp6TS8Nn7fQixxSfgGnK1rkcZlK6g2cUpd9Jo5TlmrNItd0fgk7I5_8SJwLSRUAhE6YDyP-KllzHwOaG_lBTuO3B2t4DcOup9C_-RBk7-kyw2uZGgiTmsVJudvVtAyWCrLXhb_WWOPVlrxqR8ydAoqXJkIboZDYx8gxJSt_TvMxwBTSxVHmr-T8G5qCZdmadGGYdZQxRLdsuxgsfEQxIl9H_W0IIHGm7zhzRUysM5sOVRCrmiCY"}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.mailiap.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-storage-access': 'active',
      },
    }
  )

  response = http.options('https://pizza-factory.cs329.click/api/order/verify', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'POST',
      origin: 'https://pizza.mailiap.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
  })
}