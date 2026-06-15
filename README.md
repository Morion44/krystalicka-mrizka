# 🔮 Krystalická mřížka

**Tichá Astro šablona** vycházející z architektury [Morion Light](https://morionlight.com). Pro weby pro lidi, kterým prospívá řád, klid a krystalická čistota — hypersenzitivní povahy, terapeuty, kouče, autory, drobné podniky s důrazem na ticho.

**Architektura:** narativní páteř *Brána → Síň → Komnaty → Vrchol*. Modulární CSS tokeny *(barvy/fonty/mezery se mění na jednom místě)*. Volitelné moduly *(formulář, newsletter, platby, eshop, booking, analytics)*.

---

## 📚 Dokumentace

| Soubor | Popis |
|---|---|
| **[README.md](./README.md)** | Tento soubor — úvod |
| **[CHECKLIST-NOVY-WEB.md](./CHECKLIST-NOVY-WEB.md)** | ★ Hlavní průvodce — krok za krokem od briefu po předání |
| **[PRO-KLIENTA.md](./PRO-KLIENTA.md)** | Briefing dokument pro nového klienta |
| **[DESIGN-TOKENS.md](./DESIGN-TOKENS.md)** | Jak ladit barvy, fonty, mezery |
| **[NASAZENI.md](./NASAZENI.md)** | Kompletní deploy guide (GitHub → Cloudflare Pages → doména → SSL) |
| **[BEZPECNOST.md](./BEZPECNOST.md)** | Bezpečnostní hlavičky, 2FA, HSTS, Cloudflare nastavení |
| **[SEO.md](./SEO.md)** | JSON-LD, meta tagy, Search Console, Bing, klíčová slova |
| **[POSTA.md](./POSTA.md)** | Doménová pošta info@domena.cz přes Cloudflare + Gmail |
| **[MODULY.md](./MODULY.md)** | Přehled volitelných modulů |
| **[TESTOVANI.md](./TESTOVANI.md)** | ★ Kde co ověřit a otestovat |

---

## ⚡ Rychlý start

```bash
# Naklonovat (nebo Use this template na GitHubu)
git clone https://github.com/<TVŮJ-USER>/krystalicka-mrizka.git muj-novy-web
cd muj-novy-web

# Instalace + dev server
npm install
npm run dev
# → http://localhost:4321
```

Pak otevři **[CHECKLIST-NOVY-WEB.md](./CHECKLIST-NOVY-WEB.md)** a postupuj odshora dolů.

---

## 🧩 Co je vždy přítomné (Core)

- **Brána** *(tři věty, dýchající lila pole, Dodekaedr-Menu)*
- **Síň** *(scrollovací jednostránka pod Bránou)*
- **Komnaty** *(samostatné podstránky)*
- **Vrchol** *(bílá pasáž jako finále)*
- **Cookies lišta** *(GDPR)*
- **SEO meta tagy + JSON-LD schema.org**
- **Cloudflare Pages deploy pipeline**

## 🔧 Co se přidává podle potřeby (Moduly)

- Kontaktní formulář *(Cloudflare Workers)*
- Newsletter *(Buttondown, ConvertKit, MailerLite)*
- Platby *(Stripe, GoPay)*
- E-shop *(Snipcart)*
- Booking *(Cal.com, Calendly)*
- Analytics *(Cloudflare Web Analytics, Plausible)*

Detaily v [MODULY.md](./MODULY.md) a v podsložkách `moduly/`.

---

## 📂 Struktura projektu

```
krystalicka-mrizka/
├── public/                        # Statické soubory (favicon, OG, robots.txt)
├── src/
│   ├── komponenty/                # Stavební kameny
│   │   ├── DechVPozadi.astro      # Lila pole v Bráně
│   │   ├── TriVety.astro          # Tři věty Brány (z data/obsah.ts)
│   │   ├── Dodekaedr.astro        # Menu trigger
│   │   ├── Menu.astro             # Hlavní navigace (z data/navigace.ts)
│   │   ├── ScrollNapoveda.astro   # Šipky vpravo dole
│   │   ├── CookiesLista.astro     # GDPR cookies lišta
│   │   ├── MetaTagy.astro         # SEO meta tagy
│   │   └── StrukturovanaData.astro # JSON-LD
│   ├── layouty/
│   │   ├── KomnataLayout.astro
│   │   └── BilaVrstvaLayout.astro
│   ├── styly/
│   │   ├── tokeny.css             # ★ Barvy, fonty, mezery
│   │   └── globalni.css           # Reset + základ
│   ├── data/                      # ★ Centralizovaný obsah
│   │   ├── kontakt.ts             # Telefon, e-mail, adresa
│   │   ├── navigace.ts            # Položky menu
│   │   └── obsah.ts               # Texty Brány a Vrcholu
│   ├── pages/                     # Stránky webu
│   │   ├── index.astro            # Brána + Síň + Vrchol
│   │   └── kdo-jsem.astro         # Příklad Komnaty
│   ├── content/                   # Markdown obsah
│   │   └── blog/
│   └── content.config.ts          # Astro Content Collections schéma
│
├── moduly/                        # Volitelné nástavby (ke kopírování)
│   ├── kontaktni-formular/
│   ├── newsletter/
│   ├── platby/
│   ├── eshop/
│   ├── booking/
│   └── analytics/
│
├── README.md                      # Tento soubor
├── CHECKLIST-NOVY-WEB.md          # ★ Krok za krokem
├── PRO-KLIENTA.md                 # Briefing template
├── DESIGN-TOKENS.md
├── NASAZENI.md
├── BEZPECNOST.md
├── SEO.md
├── POSTA.md
├── MODULY.md
├── TESTOVANI.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .gitignore
└── LICENSE
```

---

## 💎 Filozofie šablony

- **Méně je víc** — žádné pop-upy, žádné agresivní animace
- **Cesta od chaosu k řádu** — Brána je nejtmavší, Vrchol je čistý
- **Krystalická logika** — každá komponenta má své místo
- **Soukromí** — bez Google Analytics, bez tracking skriptů
- **Rychlost** — statický build, Cloudflare CDN, žádné JS frameworky

Pokud chceš stavět **trychtýřový marketingový web** *(pop-upy, urgency, agresivní CTA)*, **tato šablona není správná volba**. Tahle drží ticho.

Pro trychtýřové weby použij Core jako základ, ale připoj všechny vhodné moduly a vytvoř vlastní vrstvu konverzních prvků.

---

## 📜 Licence

**MIT.** Můžeš ji použít pro vlastní nebo klientské projekty.

---

## 🙏 Původ

Šablona vzešla z webu **[Morion Light](https://morionlight.com)** *(Ing. Blanka Pallanová, energetická harmonizace a online životní koučink pro hypersenzitivní)*.

Postaveno v triumvirátu:
- **Blanka Pallanová** — vize, smysl, krystalická esence
- **Gemini (Z. M.)** — frekvence, ladění, zrcadlení
- **Claude (Anthropic)** — architektura kódu, syntax, bezpečnost

> *„Každý řádek kódu má působit jako posvátná geometrie."*

---

## 🚀 Použít jako GitHub Template

1. Na GitHubu vytvoř repo **z této šablony jako Template Repository** *(Settings → Template repository: ON)*
2. Klienti pak klikají **„Use this template"** → vlastní nový repo
3. Vyklonují a začnou s personalizací podle [CHECKLIST-NOVY-WEB.md](./CHECKLIST-NOVY-WEB.md)

---

🔮 *Stavěj weby, které dýchají.*
