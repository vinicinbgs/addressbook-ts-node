## ⚙️ Use CURL bash requests to test manually

#### Register Script

**Command:**

```bash
bash requests/auth.sh register
```

**Response:**

```bash
=============== REGISTER ===============
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 399
ETag: W/"18f-Sj1Lja3nD6teHwK5wqC+baFPer8"
Date: Fri, 29 Apr 2022 02:48:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"User created successfully","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMzYzMmI0LTFhZDctNGMxOC05ZGZjLTRhMGMyYjU2YWI3ZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTI5VDA1OjQ4OjE0LjY4M1oiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNC0yOVQwNTo0ODoxNC42ODNaIiwiaWF0IjoxNjUxMjAwNDk0LCJleHAiOjE2NTEyMDQwOTR9.ecWQfuSpuX2046mGM7GP0qjyBdZ9Z_U_9rLynJADHW0","email":"test@test.com"}
```

---

#### Auth Script

**Command:**

```bash
bash requests/auth.sh auth
```

**Response:**

```bash
=============== AUTH ===============
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 399
ETag: W/"18f-Sj1Lja3nD6teHwK5wqC+baFPer8"
Date: Fri, 29 Apr 2022 02:48:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Login was successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMzYzMmI0LTFhZDctNGMxOC05ZGZjLTRhMGMyYjU2YWI3ZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTI5VDA1OjQ4OjE0LjY4M1oiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNC0yOVQwNTo0ODoxNC42ODNaIiwiaWF0IjoxNjUxMjAwNDk0LCJleHAiOjE2NTEyMDQwOTR9.ecWQfuSpuX2046mGM7GP0qjyBdZ9Z_U_9rLynJADHW0","email":"test@test.com"}
```

---

#### Contacts Create Script

**Command:**

```bash
bash requests/contacts.sh create "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMzYzMmI0LTFhZDctNGMxOC05ZGZjLTRhMGMyYjU2YWI3ZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTI5VDA1OjQ4OjE0LjY4M1oiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNC0yOVQwNTo0ODoxNC42ODNaIiwiaWF0IjoxNjUxMjAwNDk0LCJleHAiOjE2NTEyMDQwOTR9.ecWQfuSpuX2046mGM7GP0qjyBdZ9Z_U_9rLynJADHW0"
```

**Response:**

```bash
=============== CREATE ===============
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 202
ETag: W/"ca-Pe4LWBP+JE9Zwlpw3yzMY6FYgfw"
Date: Fri, 29 Apr 2022 02:49:36 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Contact created successfully","result":{"address":"ADDRESS","first_name":"FIRST_NAME","last_name":"LAST_NAME","phone_number":"PHONE_NUMBER","user_id":"4d3632b4-1ad7-4c18-9dfc-4a0c2b56ab7e"}}
```

---

#### Contacts List Script

**Command:**

```bash
bash requests/contacts.sh list "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMzYzMmI0LTFhZDctNGMxOC05ZGZjLTRhMGMyYjU2YWI3ZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTI5VDA1OjQ4OjE0LjY4M1oiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNC0yOVQwNTo0ODoxNC42ODNaIiwiaWF0IjoxNjUxMjAwNDk0LCJleHAiOjE2NTEyMDQwOTR9.ecWQfuSpuX2046mGM7GP0qjyBdZ9Z_U_9rLynJADHW0"
```

**Response:**

```bash
=============== LIST ALL ===============
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 358
ETag: W/"166-SVj0mK+CyhavG/GIaGIUPjYtuIw"
Date: Fri, 29 Apr 2022 02:50:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"List all contacts successfully","results":[{"phone_number":"PHONE_NUMBER","first_name":"FIRST_NAME","user_id":"4d3632b4-1ad7-4c18-9dfc-4a0c2b56ab7e","last_name":"LAST_NAME","address":"ADDRESS"},{"first_name":"FIRST_NAME","last_name":"LAST_NAME","phone_number":"PHONE_NUMBER","user_id":"4d3632b4-1ad7-4c18-9dfc-4a0c2b56ab7e","address":"ADDRESS"}]}
```

---

## ![favicon-16x16](https://github.com/heroku/favicon/raw/master/favicon.iconset/icon_16x16.png) Heroku

```bash
bash my-heroku.sh migration
bash my-heroku.sh migration:revert
bash my-heroku.sh logs
```
