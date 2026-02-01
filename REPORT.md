# SR Ins Застрахователен Брокер – отчет по проект

## Как да стартирате сайта

1. **Отваряне директно в браузър**  
   Отворете файла `index.html` в браузър (двойно кликване или File → Open). Всички линкове са относителни и работят без сървър.

2. **С локален сървър (препоръчително за тестване)**  
   В папката на проекта изпълнете:
   ```bash
   npm run start
   ```
   или
   ```bash
   npm run dev
   ```
   Сайтът ще е достъпен на: **http://localhost:3000**

   Не се изисква `npm install` – използва се `npx serve`.

---

## Структура на проекта

```
srins-insurance-site/
├── index.html              # Начало (homepage) – всички секции: Услуги, За нас, Партньори, Контакти
├── complaints-rules.html   # Правила за разглеждане на жалби (отделна страница)
├── style.css               # Глобални стилове + design system (цветове, типография, секции)
├── script.js               # Header, mobile drawer, Lenis smooth scroll (като ACM)
├── package.json
├── REPORT.md               # Този файл
└── src/
    ├── theme.css           # Само CSS variables (алтернативен източник на темата)
    ├── menu-burger.svg     # Икона за hamburger меню
    ├── x.svg                # Икона за затваряне на drawer
    └── img/                 # (празна – за бъдещи лога/изображения)
```

- **Няма build стъпка** – проектът е статичен HTML/CSS/JS.
- **Две страници:** `index.html` (главна с всички секции) и `complaints-rules.html` (Правила за жалби).
- **Навигация:** хедърът навсякъде е един и същ – Начало, Услуги, За нас, лого, **Жалби (Правила)** като teal бутон, Контакти. Линковете водят към секции на главната (`#home`, `#services`, `#about`, `#contact`, `#partners`) или към `complaints-rules.html`.

---

## Ключови файлове и къде се редактира съдържанието

| Какво да промените | Файл(ове) |
|--------------------|-----------|
| **Текстове на началната страница** (hero, услуги, за нас, партньори, контакти) | `index.html` |
| **Правила за жалби** – пълният юридически текст, TOC, summary box | `complaints-rules.html` |
| **Цветова палитра, шрифтове, размери** | `style.css` – блокът `:root` в началото на файла |
| **Навигация** (header/footer) | `index.html` и `complaints-rules.html` – при промяна синхронизирай и двете. |

---

## Design system (цветове)

- **Primary:** тъмно синьо (navy) `#0f2847`
- **Secondary:** teal `#0d9488`
- **Accent:** светло синьо за CTA/линкове `#38bdf8`
- **Neutral:** бяло, сиви фонове `#f8fafc`, `#374151`

Типографията и spacing-ът са запазени като в template-а (Nunito Sans, същите `--spacing-*`, `--font-size-*`).

---

## Достъп до „Правила за жалби“

Страницата `/complaints-rules.html` е достъпна от:

1. **Header** – бутон „Жалби (Правила)“ с teal цвят (клас `.btn-teal`) – навсякъде един и същ
2. **Footer** – линк „Правила за жалби“ (клас `.complaints-link`)
3. **Начална страница** – бутон „Правила за жалби“ в hero и strip под услугите

На страницата има: Table of Contents с anchor линкове, summary box „Как да подадете жалба“, контакт box, бутон „Печат“ (`window.print()`), и print стилове в `style.css` (скриване на header, footer, бутони при печат).

---

## Партньори

- На **homepage** – strip с текстови badges (линкове към партньори).
- На **/partners** – grid с всички партньори от SR Ins; при hover – scale и shadow (при наличие на лога – grayscale → color чрез `.partner-logo img`).
- Responsive: 2 колони мобилно, 3–4 tablet, 5–6 desktop.

---

## Технически бележки

- **Stack:** статичен HTML + CSS + vanilla JS (без framework, без build).
- **Браузъри:** съвременни браузъри с поддръжка на CSS variables и `:has()` (за padding при sticky CTA). При нужда може да се премахне `body:has(.sticky-complaints-cta)` и да се зададе фиксиран padding на footer.
- **SEO:** всяка страница има `<title>`, `<meta name="description">` и при нужда `theme-color`.

Ако искате да добавите лога (SR Ins или партньори), поставете файловете в `src/img/` или `src/partners/` и обновете съответните `<img>` или линкове в HTML.
