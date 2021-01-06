import fetch from 'node-fetch'
import assert from 'assert'

const server = `http://localhost:3333/graphql`

describe(`API TEST`, () => {
    it(`GQL SERVER TEST - 1`, async () => {
        const query = `
        query{
            Posts{
              title
              content
              id
              comments{
                postId
                author
                content
              }
            }
          }
        `
        const response: any = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)

    }).timeout(50505)
})