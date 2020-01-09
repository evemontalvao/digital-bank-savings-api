# Digital Bank Savings API

This is the Digital Bank Savings' API. I chose to use serverless because of it's simplicity and cost.

## Instruction to run server locally

1. Install dependencies
   - `npm i`

  **You must have Serverless Framework installed. It should be installed along with another dependencies when you run `npm i`, but if don't, simply run `npm i serverless -g`.**

2. To run locally, you must start serverless-offine
  - `npm start`

3. Post to http://localhost:2107/savings passing:
  ```
  {
    "initial-amount": 1000,
    "interest": 0.5,
    "period": 12
  }
  ```

## Testing
Unit: `npm run test`
Coverage: `npm run test:coverage`

## Production

You can also post to the API in production using this endpoint with the same body as above:

`https://tcigd7rv5g.execute-api.us-east-1.amazonaws.com/prod/savings`
