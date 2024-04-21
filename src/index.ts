type Bindings = {
  featherbin: KVNamespace;
}

import { Hono } from 'hono'
import { cache } from 'hono/cache';
const app = new Hono<{ Bindings: Bindings }>()

function randomString(length = 5) {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for (let i = 0; i < length; i++) {
    res += charset[Math.floor(Math.random() * charset.length)]
  }
  return res
}

app.get(
  '*',
  cache({
    cacheName: 'featherbin',
    cacheControl: 'max-age=10800',
  })
)

app.get('/', async (c) => {
  return c.text('this is featherbin, create a paste by POSTing or GETting the /paste route with the content in the body or as a query parameter called "data"\nhttps://github.com/SrIzan10/featherbin')
})

app.post('/paste', async (c) => {
  const id = randomString()
  const content = await c.req.text() || c.req.query('data')
  if (!content) {
    return c.text('no content provided', 400)
  }
  await c.env.featherbin.put(id, content)
  return c.text(id)
})

app.get('/paste', async (c) => {
  const id = randomString()
  const content = await c.req.text() || c.req.query('data')
  if (!content) {
    return c.text('no content provided', 400)
  }
  await c.env.featherbin.put(id, content)
  return c.text(id)
})

app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const content = await c.env.featherbin.get(id)
  if (content === null) {
    return c.text('paste not found', 404)
  }
  return c.text(content)
})

export default app
