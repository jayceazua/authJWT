# Authentication with JWT (JSON Web Tokens) in Node

#### Notes:
- You do not need to keep track of sessions, cookies, CSRF, or CORS.
- [header].[payload].[signature]
- JSON Web Token (JWT) is a method of representing claims between two parties. <br>
    Think of it like a receipt that is recognized by the issuer.
- The token is hashed/encrypted as a string of characters that can only be decrypted by a computer that has access to the secret key.
