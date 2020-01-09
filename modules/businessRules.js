exports.checkForViolations = fields => {
  const violations = Object.keys(fields).filter(field => fields[field] < 0)
  if (violations.length) return violations.map(violation => `invalid-${violation}`)
  return violations
}

exports.calculateGross = ({ interest, 'initial-amount': initialAmount, period }) => {
  const amount = initialAmount * Math.pow(1 + (interest / 100), period)

  return Math.round(amount * 100) / 100
}

exports.getTax = (taxes, period) => {
  const taxValue = Object.keys(taxes).find(taxPeriod => period <= taxPeriod)

  return taxValue
}

exports.calculateTax = (gross, initialAmount, taxPercentage) => {
  const value = ((gross - initialAmount) * taxPercentage) / 100

  return Math.round(value * 100) / 100
}
