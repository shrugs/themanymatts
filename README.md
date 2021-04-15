# ✋ themanymatts

👉 [https://themanymatts.lol](https://themanymatts.lol)

> Matt Condon has a chip in his hand that dispenses rare, digital matt stickers... but only if you find him IRL.
>
> there are many matts, and one of them could be yours.

See the existing stickers on [OpenSea](https://opensea.io/collection/themanymatts).

## Participating

1. Your name, nickname, or whatever-you-call-yourself must start with `Mat`. That's it.
  - i.e. Matt, Matthew, Matilda, Mat, Mathieu, Matthieu
2. Get some stickers or some cool piece of art to represent you.
  - if you like the existing work, ig/seamor_butts is available for commissions
3. Get an NFC chip and put it on your person, somehow.
  - an implanted chip, via [Dangerous Things](https://dangerousthings.com/product/next/)
  - an NFC [ring](https://store.nfcring.com/)
  - an NFC [card](https://www.usmartcards.com/nfc/nfc-cards.html)

Next, generate an EC keypair

```bash
$ openssl ecparam -genkey -name prime256v1 -noout -out private.pem
$ openssl ec -in private.pem -pubout -out public.pem
```

Next, give to `@mattgcondon` on twitter the following:

1. that public key
2. a unique name as an 'issuer'
  - i.e. `shrugs` or `firstname-lastname`
3. for each sticker, the metadata:
  - `name`
  - `description`
  - `link to full-res image`

He will host the metadata (and re-host the image) at [themanymatts.lol](https://themanymatts.lol) and return to you the tokenIds that now represent your stickers.

Then, on your phone that you'll use to generate authenticated links, go to https://themanymatts.lol/dashboard

Add the token Ids (in hexadecimal with leading `0x`) in an order you'd like. Tokens are weighted by index, meaning that the first token has a weight of 1, the second a weight of 2, etc. If you have two tokens, the second will be 2x as likely as the first. if you have 3 tokens, the chances of getting the first is 1/6, and so on. It is assumed that once you decide this order, it's not changed, but obviously it's up to you to decide your own scarcity curve. Maybe some stickers are more likely on a wednesday!

Add the `issuer` identifier.

Finally, paste the contents of `private.pem` into the secret box. You should probably keep the `private.pem` around, just in case your phone clears your local storage at some point. Not a big deal, though, you can always reach out to me and i'll update the pub/priv keypair.

After that, the generate button should be enabled and you can generate a link!

Copy the generated link and write that to your NFC chip. On iOS i use [NFC Tools](https://apps.apple.com/us/app/nfc-tools/id1252962749)

Done! Links are one-time use, so after a successful redemption, you'll want to go through the generate/copy/write flow again.
