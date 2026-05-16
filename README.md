# BRO BARBER – Вебсайт барбершопу

> Вебпроєкт барбершопу з frontend, backend API, PostgreSQL базою даних та адміністративною панеллю.

---

## Основні можливості

### Клієнтська частина

- перегляд послуг;
- перегляд команди барберів;
- онлайн-запис;
- контактна форма;
- підписка;
- галерея робіт;
- адаптивний дизайн.

### Адміністративна панель

- dashboard;
- керування записами;
- керування зверненнями;
- керування підписками;
- CRUD послуг;
- CRUD барберів;
- зміна статусів;
- фільтрація та пошук.

---

## Технологічний стек

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap
- AOS
- Owl Carousel
- intl-tel-input

### Backend

- Node.js
- Express.js
- Prisma ORM
- JWT
- bcrypt
- CORS

### Database

- PostgreSQL (Supabase)

### Deployment

- Frontend → Netlify
- Backend → Render
- Database → Supabase

---

## Архітектура проєкту

```txt
barber-project/
│
├── client/     # frontend частина
├── server/     # backend API
└── README.md
```

---

## Локальний запуск

### 1. Клонування репозиторію

```bash
git clone https://github.com/kepproject/barber.git
```

### 2. Frontend

Для запуску frontend можна використовувати:

- VS Code Live Server
- Live Preview

### 3. Backend

```bash
cd server
npm install
```

### 4. Створення `.env`

```env
DATABASE_URL=YOUR_DATABASE_URL
DIRECT_URL=YOUR_DIRECT_URL
JWT_SECRET=YOUR_SECRET
CLIENT_URL=http://127.0.0.1:5500
```

### 5. Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 6. Seed адміністратора

```bash
node prisma/seedAdmin.js
```

### 7. Запуск backend

```bash
npm run dev
```

---

## Production

### Frontend

- Netlify

### Backend

- Render

### Database

- Supabase PostgreSQL

---

## Безпека

- JWT authentication
- bcrypt hashing
- protected admin routes
- environment variables
- CORS policy

---

## Основні npm залежності

| Залежність | Призначення |
|---|---|
| express | Backend framework |
| prisma | ORM |
| @prisma/client | Prisma client |
| bcrypt | Hashing |
| jsonwebtoken | JWT |
| cors | CORS middleware |
| dotenv | Environment variables |
| nodemon | Dev server |

---

## Функціонал адмін-панелі

### Dashboard

- статистика;
- записи;
- звернення;
- підписки;
- послуги;
- барбери.

### CRUD

- послуги;
- барбери;
- статуси;
- фільтрація;
- пошук.

---

## Адаптивність

- desktop
- tablet
- mobile

---
