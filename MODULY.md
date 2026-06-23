# MODULY — volitelné nástavby

Šablona Krystalická mřížka má **modulární architekturu**. Core (Brána, Síň, Komnaty, Vrchol) je v základu. Tady jsou volitelné moduly, které přidáš jen pokud konkrétní web potřebuje.

## Když Morion Light typ webu

**Nepotřebuješ žádný modul.** Tichý web bez formulářů a CTA.

## Když trychtýřový marketingový web

Doporučená kombinace:
- ✅ Kontaktní formulář
- ✅ Newsletter signup
- ✅ Analytics
- 🔶 Pop-upy (sociální důkaz, urgency) — *přidej dle potřeby*
- 🔶 Booking — pokud klient prodává schůzky
- 🔶 Platby / Eshop — pokud klient prodává produkty

## Když e-shop

- ✅ Eshop (Snipcart)
- ✅ Platby (Stripe)
- ✅ Analytics
- ✅ Kontaktní formulář
- 🔶 Newsletter

---

## Jak modul přidat

Každá podsložka v `moduly/` obsahuje:
- `README.md` — návod, jak modul integrovat
- Někdy `komponenta.astro`, `worker.js`, `endpoint.ts` apod.

Postup:
1. Zkopíruj obsah modulu do odpovídajícího místa v `src/` *(podle README modulu)*
2. Nainstaluj případné npm závislosti *(viz README)*
3. Přidej případné env proměnné do `.env`

## Přehled modulů

### 📨 kontaktni-formular
Bezpečný formulář s Cloudflare Workers backendem. Žádné third-party služby, žádný spam. Pro: weby s kontaktem.

### 📧 newsletter
Integrace s Buttondown / ConvertKit / MailerLite. Hostovaný backend, mailchimp-like. Pro: weby s pravidelným obsahem (blog, kurzy).

### 💳 platby
Stripe Checkout — jednorázové platby. Pro: kouči, terapeuti, kurzy.

### 🛒 eshop
Snipcart — košík + Stripe pro statické weby. Pro: malé e-shopy (do 50 produktů).

### 📅 booking
Cal.com nebo Calendly embed. Pro: weby s objednávkovým systémem (terapie, koučink).

### 📊 analytics
Plausible nebo Cloudflare Web Analytics. Bez cookies. Pro: weby, kde chceš měřit návštěvnost bez tracking skriptů.

### 🌍 i18n
Dvojjazyčnost CS / EN (rozšiřitelné). Výchozí jazyk bez prefixu, ostatní s `/en/...`. Slovník překladů, přepínač jazyka, hreflang pro SEO. Pro: weby mířící i na zahraničí *(Open Your Power, InterfaceArchitekt)*.

---

## Filozofie modulů

- **Žádný modul není „povinný".** Šablona musí fungovat i bez nich.
- **Žádný modul nemění Core.** Brána, Síň, Komnaty, Vrchol zůstávají.
- **Každý modul má vlastní README.** Klient si přečte, sám nainstaluje.
- **Žádné napojení na cizí servery bez vědomí klienta.** GDPR.
