# kanban-app

[See it online](#)

---

## Features

- Create task boards
- Manage your tasks
- Define their priority
- Filter by status
- Search by title
- Move them between columns
- Mobile integrated
- Share access to you friends collaborate in your board

---

## Setup guide

- clone the repo
- start the frontend and backend separately, following the detailed steps

### backend

```
cd backend
npm install
npm run migrate:run
npm run build
npm start
```

### frontend

```
cd frontend
npm install
npm run build
npm start
```

Access [localhost:5173](http://localhost:3001/)

---

## Useful commands

Generate migration (backend)
`npm run migration:generate -- db/migrations/[migration name]`

## Running tests

...
