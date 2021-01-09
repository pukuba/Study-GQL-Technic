import fetch from 'node-fetch'
import assert from 'assert'

const server = `http://localhost:3333/api`

describe(`API TEST`, () => {
  it(`GQL SERVER TEST - 1`, async () => {
    const id = `1`
    const response: any = await fetch(server, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
    const data = await response.json()
    console.log(data)
    assert.strictEqual(response.status, 200)

  }).timeout(50505)
})