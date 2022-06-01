## 🐳 Using Docker

To better understand about the ports that the services are running, check in: docker-compose.yml

```bash
npm run config:env
docker-compose up -d --build
docker-compose exec api npm run typeorm:migration:run
```

**API:** http://localhost:3000/api/v1/healthcheck <br />
**Swagger:** http://localhost:3000/api/v1/docs <br />
**Report Coverage:** http://localhost:3000/report-coverage

To access db-admin, enter in browser: http://localhost:8080 <br/>
**user:** root <br/>
**password:** root <br/>
**database:** address-book

---

## :package: Run in Development mode
First thing if you are running the API container on docker, use:

```bash
docker-compose stop api
```

because will conflict the ports. <br />

Run only if you do not have .env file yet, otherwise will overwrite the current.

```bash
npm run config:env
```

Change TYPEORM_HOST="db" to **TYPEORM_HOST="localhost"** in .env

```bash
npm run typeorm:migration:run
npm run dev
```

---

## 🧪 Run unit tests

```bash
npm run test <---- Only run the test
npm run test:coverage  <----- Run test generating coverage text and html
npm run test:coverage:text <---- Run test generating only coverage text
```
