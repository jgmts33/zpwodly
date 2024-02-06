import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import * as chaiFetchMock from 'chai-fetch-mock'

import * as fetch from 'isomorphic-fetch'

import { handleRequest } from '../src/handler'

declare var global: any
global.fetch = fetch

const expect = chai.expect
chai.use(chaiFetchMock)
// chai.use(sinonChai);
// chai.use(chaiFetchMock);

describe('handler returns response with request method', () => {
  const methods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH',
  ]
  methods.forEach((method) => {
    it(method, async () => {
      expect('Hello').to.include('Hello')
    })
  })
})
