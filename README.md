BRO BARBER
Опис проєкту

BRO BARBER – це повноцінний вебсайт барбершопу з клієнтською частиною, серверним API, базою даних PostgreSQL та адміністративною панеллю.

Проєкт включає:

публічний вебсайт барбершопу;
систему онлайн-запису клієнтів;
систему звернень;
систему підписок;
адміністративну панель;
CRUD для послуг;
CRUD для барберів;
інтеграцію з базою даних Supabase PostgreSQL;
REST API на Node.js + Express;
деплой frontend та backend у production.
Технологічний стек
Frontend
HTML5
CSS3
JavaScript (Vanilla JS)
jQuery
AOS
Owl Carousel
Bootstrap
intl-tel-input
Backend
Node.js
Express.js
Prisma ORM
PostgreSQL
JWT Authentication
bcrypt
CORS
База даних
Supabase PostgreSQL
Деплой
Frontend – Netlify
Backend – Render
Database – Supabase
Архітектура проєкту

Проєкт поділений на дві основні частини:

client/  – frontend частина
server/  – backend API

Такий підхід дозволяє:

розділити frontend і backend;
окремо деплоїти частини проєкту;
масштабувати API;
спростити підтримку;
використовувати REST API.
Структура проєкту
barber-project/
│
├── client/
│   ├── admin/
│   ├── assets/
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   └── contact.html
│
├── server/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
Frontend архітектура
Папка client/

Містить клієнтську частину вебсайту.

Основні сторінки
Файл	Призначення
index.html	Головна сторінка
about.html	Сторінка про барбершоп
services.html	Сторінка послуг
portfolio.html	Галерея робіт
contact.html	Контактна інформація
Адміністративна панель
Папка client/admin/

Містить frontend адміністративної панелі.

Основні сторінки
Файл	Призначення
login.html	Авторизація адміністратора
dashboard.html	Панель адміністратора
JavaScript frontend модулі
client/assets/js/
config.js

Містить URL backend API.

Приклад:

window.API_BASE_URL = 'https://your-api.onrender.com'
home-pricing.js

Завантаження послуг на головній сторінці.

Функції:

отримання послуг з API;
відображення цін;
динамічне оновлення контенту.
services.js

Відповідає за:

завантаження послуг;
рендер карток послуг;
відкриття модальних вікон;
відображення описів;
інтеграцію з API.
contact.js

Обробка контактної форми.

Функції:

валідація;
відправка даних на сервер;
робота з API.
booking.js

Система онлайн-запису.

Функції:

відкриття модального вікна;
вибір послуги;
вибір барбера;
форматування телефону;
валідація форми;
надсилання запису.
Backend архітектура
server/src/

Backend реалізований за модульною архітектурою.

app.js

Основний файл Express-застосунку.

Функції:

ініціалізація Express;
middleware;
CORS;
підключення routes;
обробка JSON.
server.js

Точка запуску сервера.

Функції:

запуск HTTP сервера;
робота з process.env.PORT.
Controllers
server/src/controllers/

Контролери відповідають за:

приймання HTTP-запитів;
валідацію;
формування response;
виклик service layer.
Основні контролери
Контролер	Призначення
serviceController.js	Послуги
barberController.js	Барбери
appointmentController.js	Онлайн-записи
contactController.js	Звернення
subscriptionController.js	Підписки
authController.js	Авторизація адміністратора
adminController.js	Адмін-функціонал
Services
server/src/services/

Service layer містить бізнес-логіку.

Функції:

робота з Prisma;
CRUD операції;
обробка даних;
робота з базою даних.
Routes
server/src/routes/

Routes відповідають за маршрутизацію API.

Основні routes
Route	Призначення
serviceRoutes.js	API послуг
barberRoutes.js	API барберів
appointmentRoutes.js	API записів
contactRoutes.js	API звернень
subscriptionRoutes.js	API підписок
authRoutes.js	API авторизації
adminRoutes.js	API адміністратора
Middleware
authMiddleware.js

JWT middleware для захисту адміністративних endpoint.

Функції:

перевірка токена;
авторизація адміністратора;
захист admin API.
База даних
Prisma ORM

У проєкті використовується Prisma ORM.

Переваги:

типізація;
зручна робота з PostgreSQL;
migration system;
relation mapping.
Основні таблиці
Service

Зберігання послуг барбершопу.

Поля:

title;
slug;
categories;
shortDesc;
fullDesc;
includes;
price;
duration;
badge;
image;
isActive.
Barber

Зберігання інформації про барберів.

Поля:

name;
slug;
position;
description;
experience;
image;
isActive.
Appointment

Онлайн-записи клієнтів.

Поля:

ім’я;
телефон;
послуга;
барбер;
дата;
час;
статус.
ContactMessage

Звернення клієнтів.

Subscription

Підписки клієнтів.

AdminUser

Адміністративні користувачі.

Адмін-панель

Адмінка реалізована у вигляді SPA-інтерфейсу.

Функціонал
Dashboard
статистика;
кількість записів;
кількість звернень;
кількість підписок;
кількість активних послуг;
кількість барберів.
Записи

Функції:

перегляд записів;
фільтрація;
пошук;
зміна статусу;
ручне створення запису.
Звернення

Функції:

перегляд звернень;
зміна статусу;
фільтрація.
Підписки

Функції:

список номерів;
копіювання номера;
експорт CSV.
Послуги

CRUD:

створення;
редагування;
приховування;
активація.
Барбери

CRUD:

створення;
редагування;
графік роботи;
прив’язка послуг;
приховування;
активація.
Авторизація адміністратора

Використовується JWT authentication.

Процес:

Адміністратор вводить email та пароль.
Backend генерує JWT token.
Token зберігається у localStorage.
Захищені endpoint перевіряють token.
Валідація форм

У проєкті реалізовано:

required validation;
форматування телефону;
email validation;
перевірка довжини;
обмеження символів.
Телефонне поле

Використовується бібліотека intl-tel-input.

Функції:

прапорець країни;
міжнародний формат;
обмеження вводу;
форматування номерів.
Галерея

Галерея реалізована з використанням lightbox.

Функції:

preview;
відкриття фото;
слайдер;
адаптивність.
Анімації

Використовується AOS.

Функції:

анімація елементів;
scroll animation;
оптимізація через once: true.
Адаптивність

Сайт адаптований під:

desktop;
tablet;
mobile.

Використовується:

media queries;
responsive grid;
adaptive typography.
Production архітектура
Frontend

Деплой:

Netlify.

Тип:

static hosting.
Backend

Деплой:

Render Web Service.

Тип:

Node.js API server.
Database

Використовується:

Supabase PostgreSQL.
Production URL
Frontend
https://YOUR_NETLIFY_URL.netlify.app
Backend
https://YOUR_RENDER_URL.onrender.com
Локальний запуск проєкту
1. Клонування репозиторію
git clone REPOSITORY_URL
2. Frontend
Відкрити client/

Для запуску можна використовувати:

Live Server;
VS Code Live Preview.
3. Backend
cd server
npm install
4. Налаштування .env

Створити файл:

server/.env

Приклад:

DATABASE_URL=YOUR_DATABASE_URL
DIRECT_URL=YOUR_DIRECT_URL
JWT_SECRET=YOUR_SECRET
CLIENT_URL=http://127.0.0.1:5500
5. Prisma generate
npx prisma generate
6. Prisma migrate
npx prisma migrate dev
7. Seed database
npm run seed
8. Створення адміністратора
node prisma/seedAdmin.js
9. Запуск backend
npm run dev

Backend:

http://localhost:5000
Деплой backend
Render
Build command
npm install && npx prisma generate
Start command
npm start
Root directory
server
Деплой frontend
Netlify

У Netlify завантажується:

client/
GitHub

У проєкті використовується Git для:

контролю версій;
deployment workflow;
backup;
collaboration.
Безпека

У проєкті реалізовано:

JWT authentication;
password hashing через bcrypt;
protected admin routes;
CORS;
environment variables.
Використані npm залежності
Залежність	Призначення
express	Backend framework
prisma	ORM
@prisma/client	Prisma client
bcrypt	Hashing паролів
jsonwebtoken	JWT авторизація
cors	CORS middleware
dotenv	Environment variables
multer	Робота з файлами
nodemon	Dev server
Основні можливості системи
Клієнтська частина
перегляд послуг;
перегляд команди;
галерея;
онлайн-запис;
контактна форма;
підписка.
Адміністративна частина
dashboard;
записи;
звернення;
підписки;
CRUD послуг;
CRUD барберів.
Майбутнє розширення проєкту

Можливі покращення:

email notifications;
SMS notifications;
онлайн-оплата;
календар записів;
Google Calendar;
push notifications;
файлове сховище;
ролі адміністраторів.
Висновок

Проєкт BRO BARBER реалізує повноцінну систему вебсайту барбершопу з сучасною архітектурою, адміністративною панеллю, системою запису клієнтів та інтеграцією з базою даних PostgreSQL.

Проєкт демонструє:

роботу з frontend та backend;
REST API архітектуру;
роботу з базою даних;
авторизацію;
CRUD системи;
production deployment;
адаптивний інтерфейс.