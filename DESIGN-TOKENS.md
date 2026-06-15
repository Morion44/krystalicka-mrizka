# DESIGN-TOKENS — jak ladit barvy, fonty, mezery

Veškerá vizuální identita šablony žije v jediném souboru: **`src/styly/tokeny.css`**. Když ho otevřeš, vidíš CSS proměnné jako `--lila-tmava`, `--lila-stredni`, `--vzduch-velky`. Tyhle se používají v celé šabloně.

## 1. Barevné schéma

### Defaultní paleta (Morion Light)

```
Morion (#000000) → Ametyst (#2E1734 → #7C5388 → #D7B6E0) → Křišťál (#EEDDF3) → Bílá (#FFFFFF)
```

### Jak vytvořit vlastní paletu

Princip: **gradient od tmavé k světlé**, 5 stupňů. Tmavá = Brána, světlá = Vrchol.

**Příklad: zemitě hnědo-béžová**
```css
--lila-tmava: #3D2817;       /* tmavý dub */
--lila-stredni: #8B6F47;     /* karamel */
--lila-svetla: #C9A876;      /* světlý písek */
--lila-velmi-svetla: #E8D5B7; /* béžová */
--lila-bila: #F5EDDD;        /* krémově bílá */
```

**Příklad: modrozelená (oceán)**
```css
--lila-tmava: #0E2A3F;
--lila-stredni: #2C5F7C;
--lila-svetla: #7AB8CC;
--lila-velmi-svetla: #B8DCE5;
--lila-bila: #E8F4F8;
```

**Příklad: zelená (les)**
```css
--lila-tmava: #1A2F1F;
--lila-stredni: #4A6741;
--lila-svetla: #8FB377;
--lila-velmi-svetla: #C5DBB1;
--lila-bila: #E8F0DE;
```

**Pravidlo dechu:** Tmavá → světlá. Brána je vždy nejtmavší. Vrchol vždy nejjasnější. Nepřehazuj.

### Dech v Bráně (DechVPozadi.astro)

Samostatné nastavení v souboru `src/komponenty/DechVPozadi.astro`. V `@keyframes rozkvet` máš hardcoded barvy `#2E1734`, `#7C5388`, `#D7B6E0`. Pokud měníš paletu, **změň i tyto tři barvy** na tvoje nové ekvivalenty.

## 2. Typografie

Defaultní font: **Inter** (váhy 300, 400, 500) přes **Bunny Fonts** (GDPR-friendly).

Pokud chceš jiný font, změň:

1. V `src/komponenty/MetaTagy.astro` v `<link>` na Bunny Fonts URL: `?family=NOVY_FONT:300,400,500`
2. V `src/styly/tokeny.css`: `--pismo-zakladni: 'Nový Font', system-ui, sans-serif`

**Doporučení:** zachovej **sans-serif s light váhou (300)** — to drží ticho šablony. Serif fonty (Crimson, Lora) jsou taky OK pro klidnější dojem, ale ne pro UX/marketingové trychtýře.

## 3. Mezery (Vzduch)

```css
--vzduch-mikro:  0.25rem;    /* drobné odsazení */
--vzduch-maly:   0.5rem;     /* mezi blízkými prvky */
--vzduch-stredni: 1.5rem;    /* mezi odstavci */
--vzduch-velky:  3rem;       /* mezi sekcemi */
--vzduch-obrovsky: 6rem;     /* dramatický dech */
```

Nemodifikuj tyto hodnoty náhodně — drží rytmus celého webu.

## 4. Časování animací

```css
--cas-rychly:  0.3s;         /* hover, focus */
--cas-stredni: 0.6s;         /* fade-in/out elementů */
--cas-pomaly:  1.5s;         /* animace tří vět v Bráně */
--cas-dlouhy:  15s;          /* rozkvět lila pole */
```

Tady jen mírně dolaď. Brána potřebuje **pomalu dýchat**.

## 5. Bezpečnostní hlavičky (Cloudflare)

V Cloudflare Transform Rules → Modify Response Header přidej pro každý nový web:

1. **X-Frame-Options: DENY**
2. **Referrer-Policy: strict-origin-when-cross-origin**
3. **Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()**
4. **Content-Security-Policy:** `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.bunny.net; font-src 'self' https://fonts.bunny.net; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`

Plus zapni:
- **Always Use HTTPS**
- **HSTS** *(6 měsíců max-age)*
- **Bot Fight Mode**
- **Minimum TLS 1.2**
- **Automatic HTTPS Rewrites**

Cílové skóre: **A v securityheaders.com**.
