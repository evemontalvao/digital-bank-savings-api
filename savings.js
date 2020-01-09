const {
  TAXES,
  DEFAULT_TAX
} = require('./constants')

const {
  checkForViolations,
  calculateGross,
  getTax,
  calculateTax
} = require('./modules/businessRules')

const {
  createResponse,
  immutableState,
  switchcase
} = require('./helpers')

function savings (event, context, callback) {
  const initialState = immutableState(event.body)()
  const initialAmount = initialState['initial-amount']
  const violations = checkForViolations(initialState)

  if (violations.length) {
    return callback(null, createResponse({ violations }))
  }

  const gross = calculateGross(initialState)
  const taxPeriod = getTax(TAXES, initialState.period)
  const taxPercentage = switchcase(TAXES, DEFAULT_TAX, taxPeriod)
  const tax = calculateTax(gross, initialAmount, taxPercentage)

  return callback(null, createResponse({ violations, gross, tax }))
}

module.exports.handler = savings
