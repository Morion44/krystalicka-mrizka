# SEO — kompletní guide

Vše, co dělá nový web vyhledatelným pro Google, Bing a AI vyhledávače *(Perplexity, ChatGPT, Claude search)*.

## 1. Meta tagy (každá stránka)

Každá stránka má v `<head>` *(přes komponentu `MetaTagy.astro`)*:

- **`<title>`** — formát `{Nadpis stránky} | {Název značky}`, max 60 znaků
- **`<meta name="description">`** — 150–160 znaků, **emočně silné**, s klíčovými slovy
- **`<link rel="canonical">`** — kanonická URL stránky
- **Open Graph** — `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`
- **Twitter Card** — `summary_large_image`

### Pravidlo pro meta description

- **Mluv ke konkrétnímu člověku** — ne k davu
- **Použij problémová klíčová slova** (co lidé píší do Googlu ve 3 ráno)
- **Naznač, jak věc vyřešíš** — krátce, bez prodejnosti
- **Žádný keyword stuffing** — Google to penalizuje

### Příklad (Morion Light hlavní stránka)
```
Online životní koučink a energetická harmonizace pro hypersenzitivní lidi.
Strukturovaná cesta z vnitřního chaosu k pevné půdě. Písek a celá ČR.
```

## 2. Strukturovaná data (JSON-LD schema.org)

V `src/komponenty/StrukturovanaData.astro` máš **`@graph`** se 3+ entitami:

1. **LocalBusiness + ProfessionalService** — značka jako podnik
2. **Person** — autor jako konkrétní osoba s `knowsAbout` (expertní oblasti)
3. **Service** — každá služba jako vlastní entita

### Klíčová slova v `knowsAbout`

Tady patří **úplná expertize autora**, ne jen co dělá teď. Když někdo hledá *„Reiki Písek"* a autor reiki uměl v minulosti, Google ho může nabídnout jako alternativu.

### Klíčová pravidla schema.org

- **`@id`** propojuje entity vzájemně *(Person `worksFor` Business, Business `founder` Person)*
- **Adresa** jen na úroveň města *(pro Service Area Business, soukromí)*
- **`areaServed`** — město → kraj → země, vícevrstvé
- **`priceRange`** — orientační, formát `"0–0 Kč"`
- **`@context`** vždy `"https://schema.org"`

## 3. Sitemap a robots.txt

### sitemap-index.xml
Automaticky generován Astro pluginem `@astrojs/sitemap` při buildu. Najdeš na `/sitemap-index.xml`.

### robots.txt
V `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://nova-domena.cz/sitemap-index.xml
```

## 4. Google Search Console (povinné)

URL: https://search.google.com/search-console

### Setup
1. Add property → **Domain** *(ne URL prefix — pokrývá více variant)*
2. Verifikace: **Cloudflare DNS** *(automatická, doporučená)*
   - Klikni „Cloudflare.com" v dropdown
   - Klikni „Zahájit ověření"
   - Cloudflare ověří automaticky přes oficiální integraci
3. Po ověření → Sitemaps → Add new sitemap → `sitemap-index.xml`
4. Stav „Nelze načíst" je dočasný (24–48 hodin), pak „Úspěch"

### Co sledovat
- **Indexování → Stránky** — kolik je indexovaných, kolik čeká
- **Výkon** — kliky, zobrazení, CTR, klíčová slova *(první data za 1–2 týdny)*

## 5. Bing Webmaster Tools (doporučené)

URL: https://www.bing.com/webmasters

### Setup
1. Sign in → **Google** *(použij stejný účet jako pro GSC)*
2. **Import sites from Google Search Console** → automatický import
3. Sitemaps → Submit sitemap → `https://nova-domena.cz/sitemap-index.xml`

### Proč Bing
- ChatGPT a Copilot používají Bing index
- Microsoft Edge default
- Pokrývá zbytek trhu (cca 10 % v ČR, ale mezi nimi i mnoho hledačů AI vyhledávači)

## 6. Google Business Profile (volitelné, pro lokální vyhledávání)

URL: https://business.google.com

### Pro Service Area Business (bez veřejné adresy)
1. Create new → název firmy (vlastní jméno + titul ideálně)
2. Obchodní kategorie *(např. Životní kouč)*
3. **„Chcete přidat místo, které mohou zákazníci navštívit?" → NE**
4. Oblast služby: `Město + okres`, případně `Česká republika`
5. Kontaktní údaje
6. **Verifikace:** Google pravděpodobně bude chtít **video** *(podle aktuálních pravidel)* — video musí ukázat:
   - Pracovní materiály *(certifikáty, nástroje, knihy)*
   - Tebe jako majitelku
   - **NE interiér bytu**, **NE adresu**

## 7. Open Graph obrázek

`public/og-image.png` — **1200×630 px, PNG**, do 1 MB.

Doporučení:
- Nejen logo — **něco vizuálně zajímavého** *(gradient, foto, ilustrace)*
- Tagline v obrázku (volitelně)
- Test: https://www.opengraph.xyz/url/<url>

## 8. Klíčová slova (keyword research)

### Tři vrstvy klíčových slov

**Brandová** *(už tě hledají jménem)*
- Nejjednodušší — patří do `<title>` a `<h1>` hlavní stránky
- Nepřinášejí nové klienty, ale konverze jsou skoro 100%

**Problémová** *(lidé hledají řešení, neznají tě)*
- Nejvíc cenné — přivedou nové klienty
- Tvoří texty Síně a blog
- Vyhledávají se otevřenou otázkou: *„jak zvládnout vyhoření"*, *„úzkost v dospělosti"*

**Metodická** *(lidé hledají konkrétní postup)*
- Středně cenné — klienti, kteří znají postup, ale ne tě
- Patří do popisů služeb a JSON-LD `serviceType`

### Jak najít klíčová slova
- **Google autocomplete** — napiš začátek dotazu, Google nabídne pokračování
- **Google Trends** *(trends.google.cz)* — porovnává popularitu
- **Answer The Public** *(answerthepublic.com)* — generuje otázky
- **Frekvenční analýza s AI** *(Claude, Gemini)* — popiš cílovou skupinu, AI vygeneruje slovník

## 9. Testování SEO

### A) Google Rich Results Test
URL: https://search.google.com/test/rich-results

Zadej URL → Test URL → ověř, že JSON-LD je platný, **0 kritických chyb**. Nekritická upozornění *(„Chybí volitelné pole")* jsou OK.

### B) PageSpeed Insights
URL: https://pagespeed.web.dev/

Zadej URL → cíl:
- **SEO: 100/100** *(povinné)*
- **Best Practices: 100/100** *(povinné)*
- **Accessibility: 90+** *(silné doporučení)*
- **Performance: 80+** *(pro Astro statický web bez animovaného splash screenu — pro animovaný splash screen je „NO_LCP" akceptovatelné)*

### C) Schema.org Validator
URL: https://validator.schema.org/

Zadej URL → ověří JSON-LD podle schema.org standardu. Detailnější než Google Rich Results.

### D) AI Vyhledávače (manuální test)
Po 4–6 týdnech od spuštění:
- Perplexity.ai: vyhledej tvoje téma, ověř, zda web ukáže jako zdroj
- ChatGPT (s search): vyhledej tvoje téma
- Claude (s search): vyhledej tvoje téma

## 10. Pravidelná údržba

- **Týdně** *(první 4 týdny):* Search Console → Indexování → ověřit, že stránek přibývá
- **Měsíčně:** Search Console → Výkon → vidět, jaké dotazy přivádějí návštěvníky
- **Čtvrtletně:** PageSpeed test, Rich Results retest *(když přidáš obsah)*
- **Ročně:** Audit klíčových slov *(některé ztratí relevanci, jiné získají)*
