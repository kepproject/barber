# BRO BARBER – вебсайт барбершопу

> Дипломний проєкт на тему **«Вебсайт барбершопу»**.  
> Проєкт реалізує публічний сайт барбершопу, систему онлайн-запису, контактні звернення, підписки, адміністративну панель, CRUD для послуг і барберів, авторизацію адміністратора та роботу з базою даних PostgreSQL.

---

## Зміст

- [Опис проєкту](#опис-проєкту)
- [Основний функціонал](#основний-функціонал)
- [Технологічний стек](#технологічний-стек)
- [Архітектура проєкту](#архітектура-проєкту)
- [Структура папок](#структура-папок)
- [Frontend](#frontend)
- [Backend](#backend)
- [База даних](#база-даних)
- [API](#api)
- [Адміністративна панель](#адміністративна-панель)
- [Авторизація адміністратора](#авторизація-адміністратора)
- [Локальний запуск](#локальний-запуск)
- [Environment variables](#environment-variables)
- [Seed даних](#seed-даних)
- [Деплой](#деплой)
- [Перевірка після деплою](#перевірка-після-деплою)
- [Безпека](#безпека)
- [Можливі покращення](#можливі-покращення)

---

## Опис проєкту

**BRO BARBER** – це вебсайт барбершопу з повноцінною клієнтською та адміністративною частиною.

Клієнт може:

- переглядати інформацію про барбершоп;
- переглядати послуги;
- переглядати барберів;
- переглядати галерею робіт;
- записуватися на послугу онлайн;
- залишати звернення через контактну форму;
- залишати номер телефону для підписки.

Адміністратор може:

- авторизуватися в адмінпанелі;
- переглядати статистику;
- переглядати й обробляти записи клієнтів;
- створювати записи вручну;
- переглядати звернення;
- переглядати підписки;
- експортувати підписки у CSV;
- керувати послугами;
- керувати барберами;
- налаштовувати зв’язок барберів із послугами;
- налаштовувати графік роботи барберів.

---

## Основний функціонал

### Публічна частина сайту

- головна сторінка;
- сторінка «Про нас»;
- сторінка послуг;
- сторінка портфоліо/галереї;
- сторінка контактів;
- модальні вікна для детального перегляду послуг;
- модальні вікна для детального перегляду барберів;
- форма онлайн-запису;
- контактна форма;
- форма підписки;
- адаптивна верстка;
- анімації під час скролу.

### Система запису

Система запису враховує:

- обрану послугу;
- барбера, який виконує цю послугу;
- графік роботи барбера;
- дату запису;
- вільні часові слоти;
- тривалість послуги;
- уже створені записи;
- статус запису;
- джерело запису: онлайн або адміністратор.

### Адміністративна панель

Адмінпанель містить такі розділи:

- **Дашборд** – основна статистика;
- **Записи** – таблиця записів із фільтрами та зміною статусів;
- **Звернення** – повідомлення з контактної форми;
- **Підписки** – номери телефонів та CSV-експорт;
- **Послуги** – CRUD послуг;
- **Барбери** – CRUD барберів, графік роботи, прив’язка послуг.

---

## Технологічний стек

### Frontend

- **HTML5** – структура сторінок;
- **CSS3** – стилізація;
- **JavaScript** – клієнтська логіка;
- **Bootstrap** – базова сітка та компоненти;
- **AOS** – анімації під час скролу;
- **Owl Carousel / Slick** – слайдери;
- **Magnific Popup** – галерея / lightbox;
- **intl-tel-input** – форматування телефонних номерів.

### Backend

- **Node.js** – серверне середовище;
- **Express.js** – REST API;
- **Prisma ORM** – робота з базою даних;
- **PostgreSQL** – база даних;
- **bcrypt** – хешування паролів;
- **jsonwebtoken** – JWT авторизація;
- **cors** – налаштування CORS;
- **dotenv** – робота зі змінними середовища.

### Database

- **Supabase PostgreSQL**

### Deployment

- **Netlify** – frontend;
- **Render** – backend;
- **Supabase** – база даних.

---

## Архітектура проєкту

Проєкт має розділену архітектуру:

```txt
barber-project/
├── client/   # статичний frontend
└── server/   # backend REST API
```

Frontend і backend працюють окремо:

- frontend відправляє HTTP-запити до backend API;
- backend обробляє запити та працює з базою даних через Prisma;
- база даних розміщена в Supabase;
- у production frontend і backend розгорнуті на різних сервісах.

---

## Структура папок

```txt
barber-project/
│
├── client/
│   ├── admin/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   └── assets/
│   │       ├── css/
│   │       │   └── admin.css
│   │       └── js/
│   │           ├── admin-config.js
│   │           ├── login.js
│   │           └── dashboard.js
│   │
│   ├── assets/
│   │   ├── css/
│   │   ├── img/
│   │   ├── js/
│   │   └── fonts/
│   │
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   └── contact.html
│
└── server/
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seed.js
    │   └── seedAdmin.js
    │
    ├── src/
    │   ├── config/
    │   │   └── prisma.js
    │   │
    │   ├── controllers/
    │   │   ├── adminController.js
    │   │   ├── appointmentController.js
    │   │   ├── authController.js
    │   │   ├── barberController.js
    │   │   ├── contactController.js
    │   │   ├── serviceController.js
    │   │   └── subscriptionController.js
    │   │
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   │
    │   ├── routes/
    │   │   ├── adminRoutes.js
    │   │   ├── appointmentRoutes.js
    │   │   ├── authRoutes.js
    │   │   ├── barberRoutes.js
    │   │   ├── contactRoutes.js
    │   │   ├── serviceRoutes.js
    │   │   └── subscriptionRoutes.js
    │   │
    │   ├── services/
    │   │   ├── adminService.js
    │   │   ├── appointmentService.js
    │   │   ├── authService.js
    │   │   ├── barberService.js
    │   │   ├── contactService.js
    │   │   ├── serviceService.js
    │   │   └── subscriptionService.js
    │   │
    │   ├── app.js
    │   └── server.js
    │
    └── package.json
```

---

## Frontend

Frontend розміщений у папці `client`.
 
Сторінки відкриваються напряму як HTML-файли.

### Основні сторінки

| Файл | Призначення |
|---|---|
| `index.html` | Головна сторінка сайту |
| `about.html` | Інформація про барбершоп і команду |
| `services.html` | Повний список послуг |
| `portfolio.html` | Галерея робіт |
| `contact.html` | Контакти та контактна форма |
| `admin/login.html` | Вхід адміністратора |
| `admin/dashboard.html` | Адмінпанель |

---

## Frontend JavaScript модулі

### `client/assets/js/config.js`

Файл з базовим URL backend API.

```js
window.API_BASE_URL = 'https://barber-wzum.onrender.com'
```

На локальному середовищі може використовуватись:

```js
window.API_BASE_URL = 'http://localhost:5000'
```

---

### `client/admin/assets/js/admin-config.js`

Файл з URL backend API для адмінпанелі.

```js
window.ADMIN_API_BASE_URL = 'https://barber-wzum.onrender.com'
```

---

### `client/assets/js/home-pricing.js`

Відповідає за виведення прайсу на головній сторінці.

Функції:

- отримує список активних послуг;
- розділяє послуги на дві колонки;
- виводить назву та ціну;
- оновлює AOS після динамічного рендеру.

---

### `client/assets/js/services.js`

Відповідає за сторінку послуг.

Функції:

- завантажує послуги з API;
- рендерить картки послуг;
- підтримує фільтрацію за категоріями;
- відкриває модальне вікно з деталями послуги;
- передає `serviceId` у форму запису.

---

### `client/assets/js/barbers.js`

Відповідає за виведення барберів.

Функції:

- отримує барберів з API;
- виводить картки барберів;
- відкриває модальне вікно з інформацією про барбера;
- підтримує слайдер на сторінках.

---

### `client/assets/js/booking.js`

Модуль онлайн-запису.

Функції:

- відкриває модальне вікно запису;
- завантажує список послуг;
- після вибору послуги завантажує барберів;
- після вибору барбера і дати завантажує вільні слоти;
- форматує номер телефону;
- перевіряє введення номера;
- створює запис через API;
- показує модальне вікно подяки.

---

### `client/assets/js/contact.js`

Модуль контактної форми.

Функції:

- форматування телефонного поля;
- перевірка обов’язкових полів;
- відправка звернення на backend;
- показ модального повідомлення після успішної відправки.

---

### `client/assets/js/newsletter.js`

Модуль підписки.

Функції:

- форматування телефонного поля;
- обмеження введення тільки цифрами;
- створення підписки через API;
- повідомлення про успішну підписку;
- обробка дублювання номера.

---

## Backend

Backend розміщений у папці `server`.

Використовується архітектура:

```txt
route → controller → service → prisma → database
```

Це дозволяє розділити:

- маршрутизацію;
- обробку HTTP-запитів;
- бізнес-логіку;
- роботу з базою даних.

---

## Backend файли

### `server/src/server.js`

Точка запуску сервера.

Функції:

- імпорт Express-застосунку;
- отримання порту з `process.env.PORT`;
- запуск сервера.

Render автоматично передає `PORT`, тому сервер підтримує production середовище.

---

### `server/src/app.js`

Основний Express-застосунок.

Функції:

- підключення `express.json()`;
- налаштування CORS;
- підключення routes;
- health check endpoint.

Health check:

```txt
GET /api/health
```

---

### `server/src/config/prisma.js`

Ініціалізація Prisma Client.

Використовується в service layer для доступу до бази даних.

---

## Controllers

Контролери приймають HTTP-запити, перевіряють дані й викликають відповідні services.

| Файл | Призначення |
|---|---|
| `serviceController.js` | Публічне отримання послуг |
| `barberController.js` | Публічне отримання барберів |
| `appointmentController.js` | Онлайн-запис і доступні слоти |
| `contactController.js` | Контактні звернення |
| `subscriptionController.js` | Підписки |
| `authController.js` | Авторизація адміна |
| `adminController.js` | Адмінські операції |

---

## Services

Services містять бізнес-логіку і роботу з Prisma.

| Файл | Призначення |
|---|---|
| `serviceService.js` | Отримання активних послуг |
| `barberService.js` | Отримання активних барберів |
| `appointmentService.js` | Створення записів і розрахунок слотів |
| `contactService.js` | Створення звернень |
| `subscriptionService.js` | Створення підписок |
| `authService.js` | Логін адміністратора, JWT |
| `adminService.js` | Статистика, CRUD, admin-запити |

---

## Middleware

### `authMiddleware.js`

Middleware перевіряє JWT token.

Алгоритм:

1. Зчитує заголовок `Authorization`.
2. Перевіряє формат `Bearer TOKEN`.
3. Перевіряє token через `JWT_SECRET`.
4. Додає дані адміністратора в `req.admin`.
5. Дозволяє доступ до захищеного route.

---

## База даних

У проєкті використовується PostgreSQL через Supabase.

ORM – Prisma.

### Основні моделі Prisma

#### `AdminUser`

Адміністратори системи.

Поля:

- `id`
- `email`
- `password`
- `role`
- `createdAt`
- `updatedAt`

---

#### `Service`

Послуги барбершопу.

Поля:

- `title` – назва;
- `slug` – унікальний slug;
- `categories` – категорії;
- `shortDesc` – короткий опис;
- `fullDesc` – повний опис;
- `includes` – що входить у послугу;
- `price` – ціна;
- `duration` – тривалість;
- `badge` – бейдж;
- `image` – шлях до зображення;
- `isActive` – активність;
- `sortOrder` – порядок відображення.

---

#### `Barber`

Барбери.

Поля:

- `name`;
- `slug`;
- `position`;
- `description`;
- `experience`;
- `image`;
- `isActive`;
- `sortOrder`.

---

#### `BarberService`

Проміжна таблиця для зв’язку багато-до-багатьох між барберами та послугами.

Один барбер може виконувати декілька послуг.  
Одна послуга може виконуватися кількома барберами.

---

#### `BarberSchedule`

Графік роботи барбера.

Поля:

- `barberId`;
- `dayOfWeek`;
- `startTime`;
- `endTime`;
- `isActive`.

`dayOfWeek`:

```txt
1 – понеділок
2 – вівторок
3 – середа
4 – четвер
5 – п’ятниця
6 – субота
7 – неділя
```

---

#### `Appointment`

Записи клієнтів.

Поля:

- `clientName`;
- `phone`;
- `email`;
- `date`;
- `startTime`;
- `endTime`;
- `status`;
- `source`;
- `comment`;
- `serviceId`;
- `barberId`.

Статуси:

```txt
NEW
CONFIRMED
DONE
CANCELED
```

Джерела:

```txt
ONLINE
ADMIN
```

---

#### `ContactMessage`

Звернення з контактної форми.

Поля:

- `name`;
- `phone`;
- `subject`;
- `message`;
- `status`.

Статуси:

```txt
NEW
PROCESSED
```

---

#### `Subscription`

Підписки користувачів.

Поля:

- `phone`;
- `createdAt`.

---

## API

### Публічні endpoint

| Method | Endpoint | Призначення |
|---|---|---|
| GET | `/api/health` | Перевірка роботи backend |
| GET | `/api/services` | Отримання активних послуг |
| GET | `/api/barbers` | Отримання активних барберів |
| GET | `/api/barbers/service/:serviceId` | Барбери для конкретної послуги |
| GET | `/api/appointments/available-slots` | Доступні часові слоти |
| POST | `/api/appointments` | Онлайн-запис |
| POST | `/api/contact` | Створення звернення |
| POST | `/api/subscriptions` | Створення підписки |
| POST | `/api/auth/login` | Логін адміністратора |
| GET | `/api/auth/me` | Перевірка JWT |

---

### Admin endpoint

Усі admin endpoint захищені через JWT.

| Method | Endpoint | Призначення |
|---|---|---|
| GET | `/api/admin/dashboard` | Статистика дашборду |
| GET | `/api/admin/appointments` | Список записів |
| POST | `/api/admin/appointments` | Створити запис вручну |
| PATCH | `/api/admin/appointments/:id/status` | Змінити статус запису |
| GET | `/api/admin/contacts` | Список звернень |
| PATCH | `/api/admin/contacts/:id/status` | Змінити статус звернення |
| GET | `/api/admin/subscriptions` | Список підписок |
| GET | `/api/admin/services` | Список послуг для адмінки |
| POST | `/api/admin/services` | Створити послугу |
| PUT | `/api/admin/services/:id` | Оновити послугу |
| PATCH | `/api/admin/services/:id/status` | Активувати / приховати послугу |
| GET | `/api/admin/barbers` | Список барберів |
| POST | `/api/admin/barbers` | Створити барбера |
| PUT | `/api/admin/barbers/:id` | Оновити барбера |
| PATCH | `/api/admin/barbers/:id/status` | Активувати / приховати барбера |

---

## Онлайн-запис

### Логіка запису

1. Клієнт відкриває форму запису.
2. Обирає послугу.
3. Система завантажує барберів, які виконують цю послугу.
4. Клієнт обирає барбера.
5. Клієнт обирає дату.
6. Backend повертає доступні слоти.
7. Клієнт обирає час.
8. Запис створюється в базі.

### Розрахунок слотів

Backend враховує:

- графік роботи барбера;
- тривалість послуги;
- уже створені записи;
- скасовані записи;
- перетин часових проміжків.

---

## Адміністративна панель

Адмінпанель знаходиться за шляхом:

```txt
client/admin/login.html
```

Після деплою:

```txt
https://fastidious-mousse-27626e.app/admin/login.html
```

### Логін

Адміністратор вводить:

- email;
- password.

Після успішного логіну:

- backend повертає JWT;
- token зберігається в `localStorage`;
- користувач переходить у dashboard.

---

## Функції адмінпанелі

### Dashboard

Показує:

- кількість нових записів;
- кількість нових звернень;
- кількість активних послуг;
- кількість активних барберів;
- кількість підписок.

---

### Записи

Можливості:

- перегляд усіх записів;
- пошук;
- фільтр за статусом;
- фільтр за джерелом;
- фільтр за датою;
- сортування;
- зміна статусу;
- ручне створення запису.

---

### Звернення

Можливості:

- перегляд звернень;
- пошук;
- фільтр за статусом;
- зміна статусу на `PROCESSED`.

---

### Підписки

Можливості:

- перегляд номерів;
- пошук за номером;
- копіювання номера;
- експорт CSV.

---

### Послуги

CRUD:

- створення;
- редагування;
- активація;
- приховування.

---

### Барбери

CRUD:

- створення;
- редагування;
- активація;
- приховування;
- прив’язка послуг;
- графік роботи;
- шлях до фото.

Фото барберів у поточній реалізації не завантажуються через upload.  
У полі `image` зберігається шлях до файлу або URL.

---

## Локальний запуск

### 1. Клонування репозиторію

```bash
git clone https://github.com/kepproject/barber.git
cd REPOSITORY_NAME
```

---

### 2. Встановлення backend залежностей

```bash
cd server
npm install
```

---

### 3. Налаштування `.env`

Створити файл:

```txt
server/.env
```

Приклад:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
JWT_SECRET="your_secret_key"
CLIENT_URL="http://127.0.0.1:5500"
```

> Не додавайте `.env` у GitHub.

---

### 4. Генерація Prisma Client

```bash
npx prisma generate
```

---

### 5. Синхронізація схеми з БД

```bash
npx prisma db push
```

---

### 6. Заповнення початкових даних

```bash
npm run seed
```

---

### 7. Створення адміністратора

```bash
node prisma/seedAdmin.js
```

---

### 8. Запуск backend

```bash
npm run dev
```

Backend буде доступний:

```txt
http://localhost:5000
```

---

### 9. Запуск frontend

Відкрити папку:

```txt
client/
```

через Live Server у VS Code.

Локальний URL зазвичай:

```txt
http://127.0.0.1:5500
```

---

## Environment variables

### Backend `.env`

| Змінна | Призначення |
|---|---|
| `DATABASE_URL` | Основний рядок підключення до PostgreSQL |
| `DIRECT_URL` | Direct URL для Prisma |
| `JWT_SECRET` | Секретний ключ для JWT |
| `CLIENT_URL` | Домен frontend для CORS |

---

## Seed даних

### `prisma/seed.js`

Заповнює базові дані:

- послуги;
- барберів;
- зв’язки барберів із послугами;
- графік роботи.

### `prisma/seedAdmin.js`

Створює першого адміністратора.

Пароль у базі зберігається у вигляді hash через `bcrypt`.

---

## Деплой

Production складається з трьох частин:

```txt
Frontend → Netlify
Backend → Render
Database → Supabase
```

---

## Деплой backend на Render

### Налаштування Render Web Service

| Поле | Значення |
|---|---|
| Root Directory | `server` |
| Runtime | Node |
| Build Command | `npm install && npx prisma generate` |
| Start Command | `npm start` |

---

### Environment variables у Render

```env
DATABASE_URL=...
DIRECT_URL=...
JWT_SECRET=...
CLIENT_URL=https://fastidious-mousse-27626e.netlify.app/
```

---

### Перевірка backend

```txt
https://barber-wzum.onrender.com/api/services
```

---

## Деплой frontend на Netlify

Frontend деплоїться як статичний сайт.

На Netlify потрібно завантажити саме папку:

```txt
client/
```

У корені цієї папки має бути:

```txt
index.html
```

---

### Production config frontend

У файлі:

```txt
client/assets/js/config.js
```

має бути:

```js
window.API_BASE_URL = 'https://barber-wzum.onrender.com'
```

У файлі:

```txt
client/admin/assets/js/admin-config.js
```

має бути:

```js
window.ADMIN_API_BASE_URL = 'https://barber-wzum.onrender.com'
```

---

## CORS

У backend використовується список дозволених origins:

```js
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  process.env.CLIENT_URL,
].filter(Boolean)
```

У production потрібно додати Netlify URL у Render environment variable:

```env
CLIENT_URL=https://fastidious-mousse-27626e.netlify.app/
```

Після зміни environment variables потрібно зробити redeploy backend.

---

## Перевірка після деплою

Після деплою потрібно перевірити:

### Публічний сайт

- головна сторінка;
- сторінка послуг;
- сторінка барберів / команда;
- галерея;
- контактна сторінка;
- прайс;
- модальні вікна.

### Форми

- онлайн-запис;
- контактна форма;
- підписка;
- форматування номера телефону;
- модальне вікно подяки.

### Адмінка

- логін;
- dashboard;
- записи;
- створення запису адміністратором;
- зміна статусу запису;
- звернення;
- підписки;
- CSV export;
- CRUD послуг;
- CRUD барберів.

---

## Безпека

У проєкті реалізовано:

- JWT авторизація адміністратора;
- bcrypt хешування паролів;
- protected admin routes;
- CORS;
- environment variables;
- відсутність `.env` у репозиторії.

---

## Робота з Git

Після змін:

```bash
git add .
git commit -m "Update project"
git push
```

Після push Render може автоматично виконати redeploy backend.

Для Netlify manual deploy потрібно повторно завантажити папку `client`.

---

## Відомі особливості

### Render Free Plan

На безкоштовному тарифі Render backend може засинати після простою.

Перший запит після простою може виконуватись довше.

---

### Netlify cache

Після оновлення frontend іноді потрібно очистити кеш браузера:

```txt
Ctrl + Shift + R
```

---

## Можливі покращення

У майбутньому проєкт можна розширити:

- email notifications;
- SMS notifications;
- Telegram notifications;
- Google Calendar integration;
- онлайн-оплата;
- ролі адміністраторів;
- логування дій адміністратора;
- окремий календар записів;
- завантаження фото через storage;
- pagination для великих таблиць;
- фільтрація на backend;
- export записів;
- email-розсилка для підписників.

---

## Призначення проєкту

Проєкт демонструє:

- побудову повноцінного вебсайту;
- роботу з frontend;
- роботу з backend;
- REST API;
- роботу з PostgreSQL;
- використання Prisma ORM;
- авторизацію через JWT;
- CRUD операції;
- адміністративну панель;
- production deployment.

---

## Автор
Найдюк Вадим

Дипломний проєкт:

```txt
Вебсайт барбершопу
```

