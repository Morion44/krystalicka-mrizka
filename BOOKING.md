# BOOKING — rezervace + platba (Cal.com + Stripe + Google Calendar)

Návod, jak na webu zprovoznit rezervaci schůzek s platbou předem. Celá cesta zákazníka — od kliknutí na CTA až po potvrzovací mail s dokladem — běží přes tři propojené nástroje:

- **Cal.com** — rezervační kalendář (výběr termínu, způsob kontaktu, formulář, potvrzovací maily). Open-source, GDPR friendly, zdarma.
- **Stripe** — platební brána (platba proběhne přímo v rezervaci). Účet už máš napojený.
- **Google Calendar** — jeden kalendář pro všechny termíny (řeší kolize, generuje Google Meet odkazy).

Princip: klient nezaplatí → termín se nepotvrdí. Vše drží Cal.com, na webu je jen vložený kalendář.

---

## Cesta zákazníka (a kdo který krok řeší)

| # | Co klient udělá | Kdo to řeší |
|---|---|---|
| 1 | Klikne na CTA → objeví se rezervační okno | komponenta `RezervaceCal.astro` |
| 2 | Vybere datum a čas | Cal.com |
| 3 | Vybere způsob kontaktu (telefon / Google Meet) | Cal.com „Location" |
| 4 | U webináře se vytvoří termín + Meet odkaz | Cal.com ↔ Google Calendar |
| 5 | Vyplní kontaktní údaje | rezervační formulář Cal.com |
| 6 | Je naveden na platební bránu | Stripe (placený event) |
| 7 | Zaplatí | Stripe |
| 8 | Dostane mail: potvrzení termínu, způsob kontaktu, doklad o platbě | Cal.com + Stripe |
| 9 | Ty dostaneš oznámení: blokace termínu, kontakt, potvrzení platby | Cal.com + Stripe |

Žádný z těchto kroků nevyžaduje vlastní kód — všechno se nastaví v Cal.com a Stripe.

---

## Klíč: jeden kalendář, žádné kolize ⚠️

Tvoje obava je správná a důležitá: do kalendáře přibývají **dva druhy termínů** — ty objednané přes OYP a ty, co domluvíš ručně (např. z Morion Light). Aby se nikdy nepřekryly, drž se jednoho pravidla:

> **Jeden Google Calendar = jediný zdroj pravdy.**

Jak to funguje, když Cal.com napojíš na tenhle kalendář:

- **Cal.com čte** zaneprázdněné časy → automaticky **nenabídne** žádný obsazený slot. Tedy i termíny, které sis zapsala ručně, Cal vynechá. *(„conflict checking" / „check for conflicts".)*
- **Cal.com zapisuje** každou OYP rezervaci zpět do Google Calendar → ručně domluvené termíny zase nepřekryješ ty.
- **Ty dál ručně** zapisuješ Morion termíny do téhož kalendáře → Cal je respektuje.

Výsledek: ať termín přijde odkudkoli, kalendář je jeden a kolize nevzniknou. *(Pokud bys chtěla Morion a OYP oddělit barevně, založ dva Google kalendáře a oba v Cal.com přidej do „conflict checking"; rezervace ať se zapisují do toho OYP.)*

---

## Nastavení krok za krokem

### Krok 1 — Účet Cal.com
1. Najdi `https://cal.com` → **Sign up** (přes Google nebo e-mail).
2. Zvol uživatelské jméno (bude v odkazu, např. `cal.com/blanka`).

### Krok 2 — Propojit Google Calendar (řeší kolize + Meet)
1. V Cal.com: **Settings → Apps / Calendars → Connect** → Google Calendar.
2. Přihlas se Google účtem a povol přístup.
3. Zapni **„Check for conflicts"** u kalendáře, který chceš hlídat → Cal nebude nabízet obsazené časy.
4. Nastav, do kterého kalendáře se mají **zapisovat** nové rezervace.

### Krok 3 — Vytvořit službu (Event Type)
1. **Event Types → + New**.
2. Název (např. „Individuální konzultace"), délka (např. 60 min), slug (např. `konzultace`).
3. **Location → přidej obě možnosti**, ze kterých si klient vybere:
   - **Phone call** (telefon)
   - **Google Meet** (webinář — odkaz se vygeneruje automaticky díky propojení z kroku 2)
4. **Availability** — nastav, kdy jsi k dispozici.

### Krok 4 — Zapnout platbu přes Stripe
1. V Cal.com: **Apps → Stripe → Install / Connect** → přihlas se svým Stripe účtem.
2. Otevři svůj Event Type → **záložka platby (Payments / Price)**.
3. Nastav **cenu a měnu** (např. 2 500 Kč). Ulož.
4. Od teď: klient po vyplnění formuláře jde na Stripe, zaplatí, a teprve pak je termín potvrzený.

### Krok 5 — Potvrzovací maily a oznámení
- Cal.com posílá **klientovi** potvrzení (termín, způsob kontaktu, Meet odkaz) a **tobě** oznámení o nové rezervaci — automaticky.
- Stripe posílá **doklad o platbě** (účtenku). V Stripe → Settings → zapni e-mailové účtenky, ať je má klient i kvůli dokladu.
- Texty mailů Cal.com si můžeš upravit ve **Workflows** (např. připomenutí 24 h předem).

### Krok 6 — Vložit kalendář na web
1. Zkopíruj `moduly/booking/RezervaceCal.astro` → `src/komponenty/RezervaceCal.astro`.
2. V Komnatě (např. `src/pages/rezervace.astro`):

```astro
---
import RezervaceCal from '../komponenty/RezervaceCal.astro';
---
<RezervaceCal calLink="blanka/konzultace" />
```

`calLink` = `tvoje-jmeno/slug-eventu` z Cal.com.

### Krok 7 — CSP (Cloudflare Transform Rules → Content-Security-Policy)
Přidej Cal.com mezi povolené zdroje:

```
script-src 'self' 'unsafe-inline' https://app.cal.com;
frame-src https://app.cal.com https://cal.com;
connect-src 'self' https://app.cal.com;
```

### Krok 8 — Test
1. Ve Stripe přepni do **test mode**, v Cal.com použij testovací režim.
2. Zarezervuj zkušební termín, zaplať testovací kartou `4242 4242 4242 4242` (libovolné budoucí datum + CVV).
3. Ověř: přišel ti mail klienta i tvoje oznámení? Zapsal se termín do Google Calendar? Vygeneroval se Meet odkaz?
4. Po úspěšném testu přepni Stripe na **live**.

---

## Kdy booking a kdy modul „platby"

- **Booking (tento návod)** = prodáváš **čas/schůzky**. Platba je součástí rezervace v Cal.com.
- **Modul `platby`** (Stripe Checkout, viz `moduly/platby/README.md`) = prodáváš **produkty/kurzy/e-booky** bez termínu. Samostatné platební tlačítko → Stripe stránka.

Oba mohou na webu žít vedle sebe. Pro OYP konzultace použij **booking**.

---

## GDPR a bezpečnost
- Cal.com i Stripe jsou GDPR-friendly; data klienta zpracovávají jako zpracovatelé. Do zásad ochrany osobních údajů doplň, že rezervace běží přes Cal.com a platby přes Stripe.
- Stripe klíče **nikdy nedávej do kódu na GitHub** — u tohoto řešení je ani nepotřebuješ v repu (platbu řeší Cal.com přes své Stripe propojení).

## Checklist před spuštěním
- [ ] Google Calendar propojený, „check for conflicts" zapnuté
- [ ] Event Type má telefon i Google Meet jako location
- [ ] Stripe propojený, u eventu nastavená cena
- [ ] Testovací rezervace + platba prošla (mail klient + oznámení tobě + zápis do kalendáře)
- [ ] CSP doplněné v Cloudflare
- [ ] Stripe přepnutý na live
