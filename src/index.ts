type Bindings = {
  featherbin: KVNamespace;
}

import { Hono } from 'hono'
const app = new Hono<{ Bindings: Bindings }>()

function randomString(length = 5) {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for (let i = 0; i < length; i++) {
    res += charset[Math.floor(Math.random() * charset.length)]
  }
  return res
}

app.get('/', async (c) => {
  return c.text('this is featherbin, create a paste by POSTing to /paste with the content in the body')
})

app.post('/paste', async (c) => {
  const id = randomString()
  const content = await c.req.text()
  await c.env.featherbin.put(id, content)
  return c.json({ id })
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
