# TESTOVÁNÍ — kde co ověřit

Master přehled všech testovacích nástrojů a jejich použití. Pro každý nový web projdi celý seznam.

## 1. Funkční testy (manuálně)

### Brána
- [ ] Lila pole rozkvétá ze středu
- [ ] Tři věty se postupně objeví (1s, 3s, 5s)
- [ ] Dodekaedr-Menu hupsne zespoda (po cca 24s)
- [ ] Tři šipky pulzují vpravo dole (po cca 29s)
- [ ] Scroll funguje

### Síň
- [ ] Všechny sekce jsou viditelné
- [ ] Anchor odkazy z menu fungují (`/#kdo-jsem` skočí na správné místo)
- [ ] Prolinky („Chci vědět více…") fungují

### Komnaty
- [ ] Každá Komnata se otevře
- [ ] Odkaz „Morion Light" nahoře vlevo vrátí na hlavní stránku
- [ ] Dodekaedr-Menu funguje uvnitř Komnaty

### Vrchol
- [ ] Čtyři věty jsou viditelné
- [ ] Gradient lila → bílá je plynulý

### Menu
- [ ] Dodekaedr otevírá menu
- [ ] Kliknutí mimo menu zavírá
- [ ] Escape zavírá
- [ ] Kliknutí na položku zavírá menu a skočí na cíl

### Cookies lišta
- [ ] Zobrazí se při první návštěvě
- [ ] „Odmítnout vše" zavře lištu a zaznamená souhlas
- [ ] „Přijmout vše" zavře lištu a zaznamená souhlas
- [ ] „Nastavení" otevře dialog (nebo alert v základní šabloně)
- [ ] Při opakované návštěvě se lišta neobjeví

### Mobilní view
Chrome DevTools → F12 → Toggle device toolbar → testovat:
- [ ] iPhone SE (375×667)
- [ ] iPhone 12 Pro (390×844)
- [ ] iPad (768×1024)
- [ ] Galaxy S20 Ultra (412×915)

### Prohlížeče
- [ ] Chrome (desktop + mobil)
- [ ] Firefox (desktop)
- [ ] Safari (desktop + mobil iOS)
- [ ] Edge (desktop)

## 2. Bezpečnostní testy

### securityheaders.com
**URL:** https://securityheaders.com/?q=NOVA-DOMENA.CZ

**Cíl:** **A**

Co kontroluje:
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Content-Security-Policy
- Strict-Transport-Security (HSTS)
- X-Frame-Options

Pokud chybí → zkontrolovat Cloudflare Transform Rules.

### SSL Labs
**URL:** https://www.ssllabs.com/ssltest/analyze.html?d=NOVA-DOMENA.CZ

**Cíl:** **A** nebo **A+**

Co kontroluje:
- Certifikát (Cloudflare automaticky)
- TLS verze
- Cipher suites
- HSTS

### Mozilla Observatory
**URL:** https://observatory.mozilla.org/

**Cíl:** **A** nebo **B+**

Nejpřísnější — B+ je v pořádku, pokud máš `'unsafe-inline'` v CSP.

## 3. SEO testy

### Google Rich Results Test
**URL:** https://search.google.com/test/rich-results

**Cíl:** **0 kritických chyb**, ideálně i 0 upozornění

Co kontroluje:
- JSON-LD validita
- Schema.org typy
- Doplňující data

Drobné nekritické upozornění *(„chybí volitelné pole")* jsou akceptovatelná.

### Schema Markup Validator
**URL:** https://validator.schema.org/

Detailnější než Google Rich Results — kontroluje úplnost a soulad se schema.org standardem.

### PageSpeed Insights
**URL:** https://pagespeed.web.dev/

**Cíle (mobile + desktop):**
- **SEO: 100/100** *(povinné)*
- **Best Practices: 100/100** *(povinné)*
- **Accessibility: 90+** *(silně doporučené)*
- **Performance: 80+** *(pro Astro s animovaným splash — „NO_LCP" Error je akceptovatelný, viz níže)*

### Lighthouse v Chrome DevTools
F12 → Lighthouse tab → Analyze.

Detailnější než PageSpeed online (běží lokálně, žádné Cloudflare CDN cache).

### Google Search Console
**URL:** https://search.google.com/search-console

Po prvním indexování *(1–2 týdny od submitu sitemap)*:
- **Indexování → Stránky** → kolik je indexovaných
- **Výkon** → kliky, zobrazení, dotazy

### Bing Webmaster Tools
**URL:** https://www.bing.com/webmasters

Po prvním indexování *(2–4 týdny)*:
- Sitemaps → status „Success"
- Reports & data → impressions, clicks

## 4. Performance testy

### WebPageTest.org
**URL:** https://www.webpagetest.org/

Detailnější než PageSpeed — vidíš waterfall, kde se co načítá.

### GTmetrix
**URL:** https://gtmetrix.com/

Hodnotí výkonnostně z různých lokalit (Praha, Londýn, NYC).

## 5. Open Graph testy

### Facebook Sharing Debugger
**URL:** https://developers.facebook.com/tools/debug/

Zadat URL → Scrape Again → ověří OG obrázek a meta tagy. Pokud Facebook cachuje starý obrázek, tady to vynutíš.

### Twitter Card Validator
**URL:** https://cards-dev.twitter.com/validator
*(Pokud ještě funguje — Twitter to občas zruší)*

### LinkedIn Post Inspector
**URL:** https://www.linkedin.com/post-inspector/

### OpenGraph.xyz (univerzální)
**URL:** https://www.opengraph.xyz/

Ukáže náhled, jak web vypadá ve sdílených odkazech.

## 6. Accessibility testy

### WAVE
**URL:** https://wave.webaim.org/

Detekuje accessibility problémy *(kontrast, alt texty, ARIA, …)*.

### axe DevTools
Chrome extension. Detailní accessibility audit.

### Lighthouse Accessibility
Součást PageSpeed Insights, viz výše.

### Manuální klávesnice
Otevři web → projdi celý web jen klávesnicí *(Tab, Enter, Escape)*. Všechny interaktivní prvky musí být dosažitelné.

## 7. Mobilní testy

### Google Mobile-Friendly Test
**URL:** https://search.google.com/test/mobile-friendly

**Cíl:** „Stránka je mobile-friendly"

### Chrome DevTools Device Mode
F12 → Toggle device toolbar → testovat různé viewporty.

### Skutečný telefon
Otevři web na fyzickém zařízení *(iPhone + Android)*. Browser DevTools simuluje, ale skutečný telefon často odhalí drobnosti.

## 8. Email testy

Pokud máš nastavenou pošta (viz POSTA.md):

### MXToolbox
**URL:** https://mxtoolbox.com/

Zadej `nova-domena.cz` → ověří MX, SPF, DKIM, DMARC.

### mail-tester.com
Pošli mail z `info@nova-domena.cz` na adresu, kterou ti dají *(např. `test-abc123@srv1.mail-tester.com`)* → otevři odkaz → skóre.

**Cíl:** 9/10 nebo 10/10

## 9. Continuous testy

### npm audit
```bash
npm audit
```

Měsíčně. Esbuild „vulnerabilities" v dev serveru jsou OK *(viz BEZPECNOST.md)*.

### Astro check
```bash
npx astro check
```

Před každým pushem. Kontroluje typescript a Astro syntax.

### Cloudflare Analytics
Cloudflare → Web Analytics → Traffic *(pokud zapnuté)*.

## 10. Notifikační testy

Po nasazení nech projít několik dní a sleduj:

### Google Search Console — Coverage
Pokud Google nahlásí problém s indexem *(„Pages with redirect", „Crawled not indexed")* — vyřeš.

### Cloudflare → Email Routing → Logs
Pokud Cloudflare hlásí, že některý mail nedoručil, podívej se proč.

### Mail klienta
Klient ti řekne, pokud něco neprojde *(SPF fail, spam folder…)*.

---

## Checklist před spuštěním

Před tím, než klientovi řekneš „je hotovo":

- [ ] securityheaders.com → A
- [ ] PageSpeed → SEO 100, BP 100, A11y 90+
- [ ] Google Rich Results → 0 kritických chyb
- [ ] Mobile-Friendly Test → Pass
- [ ] WAVE → 0 chyb (jen warnings akceptovatelné)
- [ ] Search Console + Bing → sitemap submited
- [ ] Funkční test celého webu na desktop + mobil
- [ ] Email funguje (přijem + odeslání pod doménovou adresou)
- [ ] Všechna 2FA aktivní (Google, GitHub, Cloudflare)

Když všechny zelené → můžeš klientovi předat.
