import { sleep, check, group, fail } from 'k6'
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
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
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
    'https://pizza-service.cs329.click/api/auth',
    '{"email":"m@jwt.com","password":"madmon"}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        origin: 'https://pizza.cs329.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    }
  )
  if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
    console.log(response.body);
    fail('Login was *not* 200');
  }

  vars['token'] = jsonpath.query(response.json(), '$.token')[0]

  response = http.options('https://pizza-service.cs329.click/api/auth', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'content-type',
      'access-control-request-method': 'PUT',
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(3.6)

  response = http.get('https://pizza-service.cs329.click/api/order/menu', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `Bearer ${vars['token']}`,
      'content-type': 'application/json',
      'if-none-match': 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.options('https://pizza-service.cs329.click/api/order/menu', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'GET',
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.get('https://pizza-service.cs329.click/api/franchise', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `Bearer ${vars['token']}`,
      'content-type': 'application/json',
      'if-none-match': 'W/"1ad-+pf1vS8S701z4ATQv9Fd6vXEWTo"',
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })

  response = http.options('https://pizza-service.cs329.click/api/franchise', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'GET',
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(14.3)

  response = http.post(
    'https://pizza-service.cs329.click/api/order',
    '{"items":[{"menuId":1,"description":"Veggie","price":0.0038},{"menuId":2,"description":"Pepperoni","price":0.0042},{"menuId":2,"description":"Pepperoni","price":0.0042},{"menuId":3,"description":"Margarita","price":0.0042}],"storeId":"1","franchiseId":1}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.cs329.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    }
  )

  response = http.options('https://pizza-service.cs329.click/api/order', null, {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'access-control-request-headers': 'authorization,content-type',
      'access-control-request-method': 'POST',
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
  sleep(4.1)

  response = http.post(
    'https://pizza-factory.cs329.click/api/order/verify',
    '{"jwt":"eyJpYXQiOjE3NDM1MzgxODUsImV4cCI6MTc0MzYyNDU4NSwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJqd3QtaGVhZHF1YXJ0ZXJzIiwibmFtZSI6IkpXVCBIZWFkcXVhcnRlcnMifSwiZGluZXIiOnsiaWQiOjU1LCJuYW1lIjoiTWFpTGlhIFBvaGFoYXUiLCJlbWFpbCI6Im1Aand0LmNvbSJ9LCJvcmRlciI6eyJpdGVtcyI6W3sibWVudUlkIjoxLCJkZXNjcmlwdGlvbiI6IlZlZ2dpZSIsInByaWNlIjowLjAwMzh9LHsibWVudUlkIjoyLCJkZXNjcmlwdGlvbiI6IlBlcHBlcm9uaSIsInByaWNlIjowLjAwNDJ9LHsibWVudUlkIjoyLCJkZXNjcmlwdGlvbiI6IlBlcHBlcm9uaSIsInByaWNlIjowLjAwNDJ9LHsibWVudUlkIjozLCJkZXNjcmlwdGlvbiI6Ik1hcmdhcml0YSIsInByaWNlIjowLjAwNDJ9XSwic3RvcmVJZCI6IjEiLCJmcmFuY2hpc2VJZCI6MSwiaWQiOjQ0M319.RsGnxCc-XHN_5o97Lf_TbpTWG7aXsAWqmN_r0LQ8eDVQfxhhwoGVj3WC7Uxfm1bUTf_KgQvrg0ElbU-Z3AGYA--j1cItT2ZhpBHKbb8JUyNnBHW1dU4pxEO7KSCkRrgHYOunJFCe7tl70QwT9GfNVqsIGPK4H85-fL3nXlJcdSoUgown_2kNrN2QIwrngOa6VUnHn7AUuyU-pTGSJMpoSpg5IkcGuiO4HZvUVVcU54kLUvTqtvwfXgxpyC0LozhlckkQFMb-hUvOiOcwoyuGjNMVOLRcK0w0D__jK38SvL4c2mHpZyISc3jja69Xy9f52y7T5kCISDLTjqg8nCntczdLNWsQFZxwrqfFsKz-_qGWJJdCd9ZmGgsy6Q6kvAoLu5xOZ7FspwP8OPavwB46ayEXQTQzBw0ut7F-PyXIncik_0bs9xPjxMzrq3cRPGlRt0Q5OBesZqE8N6GaOTIfsDJOXaMMt_TSUo7f4syhAsJ0d0xrOEgN3JV-sGr_qeVJkDyCtmn4I_6EPnffo2weqNYmETYt4TVBNQeVP56E7iFJCBgvEnDWbFtHZ9_q4Hd6rZhewjXbEIf8nylssTNPUwouoOZrDO9NYElAEVI9O-XS7BSsT6mGSS-gxjuldvSLXL7vnQZNPsN3kkHMY_LuESdu4u4yKOJNM_slvtB0uNA"}',
    {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.cs329.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
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
      origin: 'https://pizza.cs329.click',
      priority: 'u=1, i',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
  })
}