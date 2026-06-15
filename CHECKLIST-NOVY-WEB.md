# CHECKLIST — nový web od A do Z

Postupuj odshora dolů. Žádný krok nepřeskakuj — každý má důvod.

## FÁZE 1 — Brief a koncept (1–2 hodiny s klientem)

- [ ] Vyplnit **PRO-KLIENTA.md** s klientem
- [ ] Schválit barevnou paletu (5 stupňů od tmavé k světlé)
- [ ] Schválit Brána tři věty + Vrchol čtyři věty
- [ ] Schválit strukturu Síně a Komnat
- [ ] Vybrat volitelné moduly (viz MODULY.md)

## FÁZE 2 — Lokální setup (30 minut)

- [ ] Naklonovat šablonu (`git clone` nebo `Use this template`)
- [ ] `npm install`
- [ ] `npm run dev` — ověřit, že běží localhost:4321
- [ ] Otevřít projekt v editoru (VS Code)

## FÁZE 3 — Personalizace (2–4 hodiny)

### Data soubory
- [ ] `src/data/kontakt.ts` — telefon, e-mail, adresa, soc. sítě
- [ ] `src/data/navigace.ts` — položky menu
- [ ] `src/data/obsah.ts` — tři věty Brány + úvodní vzkaz + čtyři věty Vrcholu

### Styly
- [ ] `src/styly/tokeny.css` — vlastní barevná paleta (viz DESIGN-TOKENS.md)
- [ ] `src/komponenty/DechVPozadi.astro` — synchronizovat tři barvy v @keyframes

### Komponenty
- [ ] `src/komponenty/MetaTagy.astro` — NAZEV_ZNACKY na jméno klienta
- [ ] `src/komponenty/StrukturovanaData.astro` — celý JSON-LD pro nového klienta

### Stránky
- [ ] `src/pages/index.astro` — texty Síně (Kdo jsem, služby, kontakt…)
- [ ] Vytvořit Komnaty (kdo-jsem, sluzba-1, sluzba-2, kontakt, atd.)
- [ ] Volitelně: blog (`src/content/blog/`)

### Configuration
- [ ] `astro.config.mjs` — `site:` na cílovou doménu
- [ ] `package.json` — `name:` přejmenovat
- [ ] `public/favicon.svg` — vlastní favicon
- [ ] `public/og-image.png` + `og-image.svg` — vlastní OG obrázek (1200×630)
- [ ] `public/robots.txt` — upravit sitemap URL

## FÁZE 4 — Lokální test (30 minut)

- [ ] `npm run build` — ověřit, že build prošel
- [ ] Otevřít všechny stránky v prohlížeči
- [ ] Otestovat Menu, Cookies lišta, scroll, mobil view
- [ ] Zkontrolovat odkazy (žádný 404)

## FÁZE 5 — Git + GitHub (15 minut)

- [ ] `git init` (pokud nepřišel přes Use template)
- [ ] Nový repo na GitHubu (private OK)
- [ ] `git remote add origin <URL>`
- [ ] `git add .` + `git commit` + `git push`

## FÁZE 6 — Deploy na Cloudflare Pages (20 minut)

- [ ] Cloudflare → Workers & Pages → Create project
- [ ] Connect to Git → vybrat GitHub repo
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Deploy → ověřit, že běží na `<projekt>.pages.dev`

## FÁZE 7 — Doména (30 minut + 1–24 hodin DNS propagace)

- [ ] Cloudflare → Add a site → zadat doménu klienta
- [ ] Cloudflare ukáže DNS records — zkontrolovat (MX, TXT, atd.)
- [ ] Continue → dostat nameservers (např. `xxx.ns.cloudflare.com`)
- [ ] U registrátora domény změnit nameservers na Cloudflare
- [ ] Počkat na DNS propagaci (1–24 hodin)
- [ ] V Cloudflare Pages projektu → Custom domains → přidat doménu + www verzi
- [ ] Ověřit, že web jede na `https://nova-domena.cz`

## FÁZE 8 — Bezpečnost (30 minut)

Viz **BEZPECNOST.md** pro detail. Stručně:

- [ ] Cloudflare → SSL/TLS → Always Use HTTPS: On
- [ ] HSTS: On (6 měsíců, includeSubDomains Off, Preload Off, No-Sniff On)
- [ ] Min TLS: 1.2
- [ ] Cloudflare → Security → Bot Fight Mode: On
- [ ] Cloudflare → Security → Client-side Security: On
- [ ] Cloudflare → Rules → Transform Rules → 4 vlastní headers (viz BEZPECNOST.md)
- [ ] **Ověřit**: securityheaders.com → cíl A
- [ ] 2FA na: Google účet, GitHub, Cloudflare (viz BEZPECNOST.md)

## FÁZE 9 — SEO a indexace (30 minut)

Viz **SEO.md** pro detail. Stručně:

- [ ] Google Search Console → Add property → ověření přes Cloudflare DNS
- [ ] Search Console → Sitemaps → submit `/sitemap-index.xml`
- [ ] Bing Webmaster Tools → Sign in Google → Import sites from GSC
- [ ] Bing → Sitemaps → submit `/sitemap-index.xml`
- [ ] **Ověřit**: Google Rich Results Test → musí být 0 kritických chyb
- [ ] **Ověřit**: PageSpeed Insights → cíl SEO 100, Best Practices 100, Accessibility 90+
- [ ] Google Business Profile (pokud klient chce lokální vyhledávání)

## FÁZE 10 — Pošta (45 minut)

Pokud klient chce e-mail `info@domena.cz`. Viz **POSTA.md** pro detail.

- [ ] Cloudflare → Email → Email Routing
- [ ] Add destination address (osobní Gmail klienta)
- [ ] Verify destination (klikem v mailu)
- [ ] Create routing rule: info@domena.cz → osobní Gmail
- [ ] Cloudflare smaže staré MX a přidá své
- [ ] Enable Email Routing
- [ ] V Gmailu: vytvořit filtr + štítek pro doménovou poštu
- [ ] V Gmailu: nastavit Send mail as (vyžaduje 2FA + App password)
- [ ] **Test**: poslat mail ze seznam.cz na info@domena.cz, ověřit doručení

## FÁZE 11 — Moduly (variabilní)

Pokud klient potřebuje moduly, viz **MODULY.md** a jednotlivé README v `moduly/`.

## FÁZE 12 — Předání klientovi

- [ ] Předat URL: produkční web
- [ ] Předat URL: Cloudflare dashboard
- [ ] Předat URL: GitHub repo (s pozváním klienta jako spolupracovníka)
- [ ] Předat URL: Search Console + Bing Webmaster
- [ ] Předat: postup, jak napsat nový blog článek (markdown soubor)
- [ ] Předat: PRO-KLIENTA.md jako referenci

---

## Časový odhad celkem

- **Šablona** (žádné moduly, jen Core): **8–12 hodin práce**
- **+ trychtýřové moduly** (formulář, newsletter, analytics): **+ 4–6 hodin**
- **+ Eshop/Booking/Platby**: **+ 8–12 hodin** podle složitosti

Plus klientův čas na obsah (texty, fotky).
