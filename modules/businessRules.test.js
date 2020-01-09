/* eslint-env jest */
const { TAXES } = require('../constants')

const {
  checkForViolations,
  calculateGross,
  calculateTax,
  getTax
} = require('./businessRules')

describe('checkForViolations should', () => {
  test('check if there\'s any negative value and return it as invalid if it is', () => {
    const fields = {
      'initial-amount': -100,
      interest: 0.5,
      period: 18
    }

    const expected = ['invalid-initial-amount']

    expect(checkForViolations(fields)).toEqual(expected)
  })

  test('check if there\'s any negative value and return an empty array if there isn\'t ', () => {
    const fields = {
      'initial-amount': 100,
      interest: 0.5,
      period: 18
    }

    const expected = []

    expect(checkForViolations(fields)).toEqual(expected)
  })
})

describe('calculateGross should', () => {
  test('apply the interest for each month in the investment period', () => {
    const testCases = [
      {
        initialState: {
          'initial-amount': 2960,
          interest: 0.5,
          period: 40
        },
        expected: 3613.55
      },
      {
        initialState: {
          'initial-amount': 5000,
          interest: 0.5,
          period: 6
        },
        expected: 5151.89
      },
      {
        initialState: {
          'initial-amount': 1000,
          interest: 0.5,
          period: 20
        },
        expected: 1104.9
      }
    ]

    testCases.forEach(({ initialState, expected }) =>
      expect(calculateGross(initialState)).toEqual(expected))
  })
})

describe('getTax should return one of the rules periods or undefined', () => {
  test('return 6', () => {
    expect(getTax(TAXES, 5))
      .toEqual('6')

    expect(getTax(TAXES, 6))
      .toEqual('6')
  })

  test('return 12', () => {
    expect(getTax(TAXES, 8))
      .toEqual('12')

    expect(getTax(TAXES, 12))
      .toEqual('12')
  })

  test('return 18', () => {
    expect(getTax(TAXES, 15))
      .toEqual('18')

    expect(getTax(TAXES, 18))
      .toEqual('18')
  })

  test('return undefined otherwise', () => {
    expect(getTax(TAXES, 40))
      .not.toBeDefined()

    expect(getTax(TAXES, 21))
      .not.toBeDefined()
  })
})

describe('calculateTax', () => {
  test('should apply given tax to earnings', () => {
    const testCases = [
      {
        initialState: 2960,
        taxPercentage: 15,
        gross: 3613.55,
        expected: 98.03
      },
      {
        initialState: 5000,
        taxPercentage: 22.5,
        gross: 5151.89,
        expected: 34.18
      },
      {
        initialState: 1000,
        taxPercentage: 17.5,
        gross: 1104.9,
        expected: 18.36
      }
    ]

    testCases.forEach(({ initialState, expected, gross, taxPercentage }) =>
      expect(calculateTax(gross, initialState, taxPercentage)).toEqual(expected))
  })
})
