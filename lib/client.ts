import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: 'toponyms',
  apiKey: process.env.X_API_KEY,
})
