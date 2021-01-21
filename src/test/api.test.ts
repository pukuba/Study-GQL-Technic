import assert from 'assert'
import app from 'server'
import request from 'supertest'

describe(`API TEST`, () => {

	it(`GQL SERVER TEST - 1`, async () => {
		const query = `
			query {
				Posts {
				author
				title
				content
				comments {
					postId
					author
					content
					id
				}
				id
			}
		}  
		`
		const res = await request(app)
			.post('/api')
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ query }))
			.expect(200)

		assert(Array.isArray(res.body.data.Posts))
		assert.strict(res.body.data.Posts[0].comments !== undefined)
		assert.strictEqual(Object.keys(res.body.data.Posts[0]).length, 5)
	}).timeout(50505)

	it(`GQL SERVER TEST - 2`, async () => {
		const id = `1`
		const res = await request(app)
			.post('/api')
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ id }))
			.expect(200)

		assert(Array.isArray(res.body.data.Posts))
		assert.strict(res.body.data.Posts[0].comments !== undefined)
		assert.strictEqual(Object.keys(res.body.data.Posts[0]).length, 5)
	}).timeout(50505)

	it(`GQL SERVER TEST - 3`, async () => {
		const query = `
			query {
				Posts {
					author
					title
					content
					id
				}
			}
		`
		const res = await request(app)
			.post('/api')
			.set("Content-Type", "application/json")
			.send(JSON.stringify({ query }))
			.expect(200)

		assert(Array.isArray(res.body.data.Posts))
		assert.strictEqual(res.body.data.Posts[0].comments, undefined)
		assert.strictEqual(Object.keys(res.body.data.Posts[0]).length, 4)
	}).timeout(50505)
})