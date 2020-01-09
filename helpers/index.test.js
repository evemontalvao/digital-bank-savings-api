/* eslint-env jest */
const {
  createResponse,
  switchcase
} = require('./index')

describe('createResponse should', () => {
  test('create an acceptable response for serverless framework', () => {
    expect(createResponse({ gross: 1500, tax: 15 }, 200)).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: '{"gross":1500,"tax":15,"violations":[]}'
    })
  })

  test('create response when request has violations', () => {
    expect(createResponse({ violations: ['invalid-interest'] }, 200)).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: '{"gross":0,"tax":0,"violations":["invalid-interest"]}'
    })
  })
})

describe('switchcase should', () => {
  test('return a value matching the given key with one of the cases', () => {
    const cases = {
      5: 20,
      10: 25,
      15: 30
    }

    expect(switchcase(cases, 45, 10)).toBe(25)
  })

  test('return the default value when no match is found', () => {
    const cases = {
      5: 20,
      10: 25,
      15: 30
    }

    expect(switchcase(cases, 45, 20)).toBe(45)
  })
})
