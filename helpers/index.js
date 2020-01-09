exports.immutableState = (state) => () => JSON.parse(state)

exports.createResponse = ({ violations = [], gross = 0, tax = 0 }) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      gross,
      tax,
      violations
    })
  }
}

exports.switchcase = (cases, defaultCase, key) => key in cases ? cases[key] : defaultCase
