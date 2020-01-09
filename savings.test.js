/* eslint-env jest */

const {
  handler: savings
} = require('./savings')

const defaultResponse = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: 200
}

describe('savings should', () => {
  test('call callback function when a violations is found', () => {
    const payload = {
      body: '{"initial-amount": 100, "interest": 0.5, "period": -1}'
    }

    const callback = jest.fn(() => {})
    const response = {
      ...defaultResponse,
      body: JSON.stringify({
        gross: 0,
        tax: 0,
        violations: ['invalid-period']
      })
    }
    savings(payload, {}, callback)
    expect(callback).toHaveBeenCalledWith(null, response)
  })

  test('call callback function when violations are found', () => {
    const payload = {
      body: '{"initial-amount": -1, "interest": -1, "period": -1}'
    }

    const callback = jest.fn(() => {})
    const response = {
      ...defaultResponse,
      body: JSON.stringify({
        gross: 0,
        tax: 0,
        violations: ['invalid-initial-amount', 'invalid-interest', 'invalid-period']
      })
    }
    savings(payload, {}, callback)
    expect(callback).toHaveBeenCalledWith(null, response)
  })

  test('call callback functions with gross and tax values, but with no violations', () => {
    const payload = {
      body: '{"initial-amount": 1000, "interest": 0.5, "period": 18}'
    }
    const callback = jest.fn(() => {})
    const response = {
      ...defaultResponse,
      body: JSON.stringify({
        gross: 1093.93,
        tax: 16.44,
        violations: []
      })
    }

    savings(payload, {}, callback)
    expect(callback).toHaveBeenCalledWith(null, response)
  })
})
