const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = [
  {
    title: 'Чоловіча стрижка',
    slug: 'cholovicha-stryzhka',
    categories: ['haircut'],
    shortDesc:
      'Класика, текстура або сучасний стиль – під форму обличчя, волосся і твій ритм життя.',
    fullDesc:
      'Чоловіча стрижка починається з короткої консультації, щоб майстер зрозумів бажаний стиль, тип волосся та особливості форми обличчя.',
    includes: [
      'Консультація барбера',
      'Миття голови',
      'Стрижка ножицями та машинкою',
      'Фінальна укладка',
    ],
    price: 600,
    duration: 45,
    badge: 'TOP',
    sortOrder: 1,
  },
  {
    title: 'Стрижка + борода',
    slug: 'stryzhka-boroda',
    categories: ['haircut', 'beard', 'combo'],
    shortDesc:
      'Повне оновлення образу: чистий перехід, рівні контури і борода без випадковостей.',
    fullDesc:
      'Комплексна послуга для завершеного чоловічого образу.',
    includes: [
      'Чоловіча стрижка',
      'Моделювання бороди',
      'Оформлення контурів',
      'Фінальна укладка',
    ],
    price: 950,
    duration: 75,
    badge: 'POPULAR',
    sortOrder: 2,
  },
  {
    title: 'Моделювання бороди',
    slug: 'modeliuvannia-borody',
    categories: ['beard'],
    shortDesc:
      'Форма, симетрія, контури та догляд – щоб борода виглядала впевнено.',
    fullDesc:
      'Послуга для створення чіткої форми та акуратних контурів бороди.',
    includes: [
      'Корекція довжини',
      'Оформлення контурів',
      'Доглядові засоби',
    ],
    price: 450,
    duration: 30,
    badge: null,
    sortOrder: 3,
  },
  {
    title: 'Fade / Skin Fade',
    slug: 'fade-skin-fade',
    categories: ['haircut', 'beard'],
    shortDesc:
      'Чистий перехід і техніка, яка тримає форму навіть після кількох днів.',
    fullDesc:
      'Технічна чоловіча стрижка з плавним переходом довжини.',
    includes: [
      'Fade-перехід',
      'Контури',
      'Укладка',
    ],
    price: 700,
    duration: 60,
    badge: null,
    sortOrder: 4,
  },
  {
    title: 'BRO комплекс',
    slug: 'bro-kompleks',
    categories: ['combo'],
    shortDesc:
      'Стрижка, борода, укладка та фінальний догляд.',
    fullDesc:
      'Комплексний догляд для повного оновлення образу.',
    includes: [
      'Стрижка',
      'Борода',
      'Укладка',
      'Догляд',
    ],
    price: 1200,
    duration: 90,
    badge: 'NEW',
    sortOrder: 5,
  },
  {
    title: 'Камуфлювання сивини',
    slug: 'kamufliuvannia-syvyny',
    categories: ['care'],
    shortDesc:
      'М’яке тонування без ефекту фарбування.',
    fullDesc:
      'Делікатне тонування для природного вигляду волосся.',
    includes: [
      'Підбір тону',
      'Тонування',
      'Догляд',
    ],
    price: 500,
    duration: 35,
    badge: null,
    sortOrder: 6,
  },
  {
  title: 'Стрижка машинкою',
  slug: 'stryzhka-mashynkoiu',
  categories: ['haircut'],
  shortDesc: 'Швидка та акуратна стрижка машинкою з рівною довжиною або плавним переходом.',
  fullDesc: 'Стрижка машинкою підходить для клієнтів, які хочуть охайну коротку форму без складної укладки.',
  includes: ['Консультація майстра', 'Стрижка машинкою', 'Оформлення контурів', 'Фінальна перевірка форми'],
  price: 400,
  duration: 30,
  badge: null,
  sortOrder: 7,
},
{
  title: 'Дитяча стрижка',
  slug: 'dytiacha-stryzhka',
  categories: ['haircut'],
  shortDesc: 'Акуратна дитяча стрижка у комфортному темпі та з уважним підходом.',
  fullDesc: 'Дитяча стрижка виконується з урахуванням віку дитини, структури волосся та побажань батьків.',
  includes: ['Консультація', 'Підбір форми', 'Стрижка ножицями або машинкою', 'Легка укладка'],
  price: 450,
  duration: 35,
  badge: null,
  sortOrder: 8,
},
{
  title: 'Укладка волосся',
  slug: 'ukladka-volossia',
  categories: ['care'],
  shortDesc: 'Фінальна укладка для охайного вигляду після стрижки або перед подією.',
  fullDesc: 'Укладка допомагає надати волоссю форму, текстуру та завершений вигляд із використанням професійних засобів.',
  includes: ['Підбір засобу', 'Формування зачіски', 'Фіксація', 'Рекомендації з догляду'],
  price: 250,
  duration: 20,
  badge: null,
  sortOrder: 9,
},
{
  title: 'Корекція бороди',
  slug: 'korektsiia-borody',
  categories: ['beard'],
  shortDesc: 'Підтримка форми бороди між повноцінними візитами до барбера.',
  fullDesc: 'Корекція бороди дозволяє швидко освіжити форму, прибрати зайву довжину та оновити контури.',
  includes: ['Корекція довжини', 'Оновлення контурів', 'Вирівнювання форми', 'Доглядовий засіб'],
  price: 350,
  duration: 25,
  badge: null,
  sortOrder: 10,
},
{
  title: 'Королівське гоління',
  slug: 'korolivske-holinnia',
  categories: ['beard', 'care'],
  shortDesc: 'Класичне гоління небезпечною бритвою з підготовкою шкіри та доглядом.',
  fullDesc: 'Королівське гоління включає розпарювання, акуратне гоління, заспокоєння шкіри та фінальний догляд.',
  includes: ['Підготовка шкіри', 'Гаряче рушник', 'Гоління бритвою', 'Заспокійливий догляд'],
  price: 550,
  duration: 45,
  badge: null,
  sortOrder: 11,
},
{
  title: 'Father & Son',
  slug: 'father-and-son',
  categories: ['haircut', 'combo'],
  shortDesc: 'Парна послуга для батька і сина – дві охайні стрижки за один візит.',
  fullDesc: 'Father & Son – формат запису для батька та дитини, який дозволяє отримати дві стрижки під час одного візиту.',
  includes: ['Консультація', 'Стрижка для батька', 'Дитяча стрижка', 'Фінальна укладка'],
  price: 950,
  duration: 80,
  badge: null,
  sortOrder: 12,
},
]

const barbers = [
  {
    name: 'Андрій Мельник',
    slug: 'andrii-melnyk',
    position: 'Senior Barber',
    description:
      'Спеціалізується на класичних чоловічих стрижках, fade-техніках та сучасних чоловічих образах.',
    experience: '6 років досвіду',
    image: null,
    sortOrder: 1,
    services: [
      'cholovicha-stryzhka',
      'fade-skin-fade',
      'stryzhka-boroda',
      'stryzhka-mashynkoiu',
      'dytiacha-stryzhka',
      'father-and-son',
    ],
  },

  {
    name: 'Олег Коваль',
    slug: 'oleh-koval',
    position: 'Barber',
    description:
      'Працює з бородою, комплексними послугами та класичними техніками гоління.',
    experience: '4 роки досвіду',
    image: null,
    sortOrder: 2,
    services: [
      'modeliuvannia-borody',
      'korektsiia-borody',
      'korolivske-holinnia',
      'bro-kompleks',
      'stryzhka-boroda',
    ],
  },

  {
    name: 'Іван Бойко',
    slug: 'ivan-boiko',
    position: 'Top Barber',
    description:
      'Виконує комплексні чоловічі образи, камуфлювання сивини та професійний догляд за волоссям.',
    experience: '8 років досвіду',
    image: null,
    sortOrder: 3,
    services: [
      'cholovicha-stryzhka',
      'kamufliuvannia-syvyny',
      'ukladka-volossia',
      'bro-kompleks',
      'father-and-son',
      'dytiacha-stryzhka',
    ],
  },

  {
    name: 'Назар Гуменюк',
    slug: 'nazar-humeniuk',
    position: 'Barber Stylist',
    description:
      'Працює з текстурними стрижками, сучасними укладками та чоловічим стилем.',
    experience: '5 років досвіду',
    image: null,
    sortOrder: 4,
    services: [
      'cholovicha-stryzhka',
      'fade-skin-fade',
      'ukladka-volossia',
      'stryzhka-mashynkoiu',
      'father-and-son',
    ],
  },

  {
    name: 'Максим Савчук',
    slug: 'maksym-savchuk',
    position: 'Beard Master',
    description:
      'Спеціалізується на роботі з бородою, королівському голінні та комплексному догляді.',
    experience: '7 років досвіду',
    image: null,
    sortOrder: 5,
    services: [
      'modeliuvannia-borody',
      'korektsiia-borody',
      'korolivske-holinnia',
      'bro-kompleks',
      'stryzhka-boroda',
      'kamufliuvannia-syvyny',
    ],
  },
]

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: service,
      create: service,
    })
  }

  for (const barberData of barbers) {
    const { services, ...barberInfo } = barberData

    const barber = await prisma.barber.upsert({
      where: {
        slug: barberInfo.slug,
      },
      update: barberInfo,
      create: barberInfo,
    })

    for (const serviceSlug of services) {
      const service = await prisma.service.findUnique({
        where: {
          slug: serviceSlug,
        },
      })

      if (!service) continue

      await prisma.barberService.upsert({
        where: {
          barberId_serviceId: {
            barberId: barber.id,
            serviceId: service.id,
          },
        },
        update: {},
        create: {
          barberId: barber.id,
          serviceId: service.id,
        },
      })
    }

    const schedules = [
  {
    dayOfWeek: 1,
    startTime: '10:00',
    endTime: '19:00',
  },
  {
    dayOfWeek: 2,
    startTime: '10:00',
    endTime: '19:00',
  },
  {
    dayOfWeek: 3,
    startTime: '10:00',
    endTime: '19:00',
  },
  {
    dayOfWeek: 4,
    startTime: '10:00',
    endTime: '19:00',
  },
  {
    dayOfWeek: 5,
    startTime: '10:00',
    endTime: '19:00',
  },
  {
    dayOfWeek: 6,
    startTime: '10:00',
    endTime: '17:00',
  },
]

for (const schedule of schedules) {
  await prisma.barberSchedule.upsert({
    where: {
      barberId_dayOfWeek: {
        barberId: barber.id,
        dayOfWeek: schedule.dayOfWeek,
      },
    },
    update: schedule,
    create: {
      barberId: barber.id,
      ...schedule,
    },
  })
}
  }



  console.log('Seed completed successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })