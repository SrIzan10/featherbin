# featherbin

featherbin is the fastest pastebin on the internet. it returns stuff on plaintext to experience the **true speed**.  
it also has a cool name I came up with in 5 seconds and uses cheesy tech and uses hono and has only a 40-line codebase (now that's speed)  
serverless btw :sunglasses:

## usage

send a `POST` request to `https://fb.srizan.dev/paste` with the body being the content you want to paste. the response will be plaintext, containing the url of the paste.

## example

```bash
$ curl -X POST https://fb.srizan.dev/paste -d "hello, world!"
asdf2
```

## technologies used

- cloudflare workers
- hono
- cloudflare kv
- typescript