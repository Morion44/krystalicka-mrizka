# Modul: Analytics

Sledování návštěvnosti webu **bez cookies, bez tracking skriptů**. GDPR friendly.

## Volby

### Cloudflare Web Analytics *(doporučené, zdarma)*
- **Cena:** zdarma
- **Bez cookies, bez fingerprintingu**
- **Integrované s Cloudflare** *(žádný extra účet)*
- **Limity:** základní statistiky (views, unique visitors, referrers, top pages)

### Plausible Analytics
- **Cena:** $9/měsíc do 10 000 views
- **Bez cookies**
- **UI:** výborné, podrobné
- **Self-host:** možný *(zdarma, ale vyžaduje vlastní server)*
- **URL:** https://plausible.io

### Microsoft Clarity *(zdarma, ale dohled MS)*
- **Cena:** zdarma neomezeně
- **Plus:** session recordings, heatmapy
- **Mínus:** posílá data do MS, méně GDPR friendly
- **URL:** https://clarity.microsoft.com

### Google Analytics 4 *(NE)*
- **Cena:** zdarma
- **Mínus:** vyžaduje cookies, GDPR komplikace, posílá data Googlu
- **Nedoporučuji** pro Morion Light typ klientů

## Setup Cloudflare Web Analytics

### Krok 1: Zapnout v Cloudflare
1. Cloudflare → Web Analytics → Get started
2. **Free, Server-side** *(pokud doména je v Cloudflare zóně)* nebo **JavaScript Beacon** *(pro weby mimo Cloudflare)*
3. Pokud je doména v Cloudflare zóně *(což je u nás)* → vyber **„Use my existing Cloudflare zone"**
4. Vybrat doménu

Hotovo. Cloudflare automaticky tracking *(přes svou síť, bez JS)*.

### Krok 2: Dashboard
- Cloudflare → Web Analytics → vybrat zónu
- Vidíš: page views, unique visitors, top pages, top referrers, performance metriky

## Setup Plausible

### Krok 1: Účet
https://plausible.io → 30 dní free trial → Add a site → zadat doménu.

### Krok 2: Embed v Astru

V layoutu *(např. `KomnataLayout.astro`)* přidat do `<head>`:
```astro
<script defer data-domain="nova-domena.cz" src="https://plausible.io/js/script.js"></script>
```

### Krok 3: CSP aktualizace

V Cloudflare Transform Rules → Content-Security-Policy přidej:
```
script-src 'self' 'unsafe-inline' https://plausible.io;
connect-src 'self' https://plausible.io;
```

### Krok 4: Test

Po deploy → otevři web → otevři Plausible dashboard → měl bys vidět 1 návštěvu.

## Cookies lišta

Cloudflare Web Analytics a Plausible **nepoužívají cookies** → Cookies lišta nemusí o nich informovat. *Necessary cookies* jen pro funkční webové cookies *(consent storage, případně theme preference)*.

Pokud klient přidá GA4 nebo Clarity → musí být v Cookies liště kategorie „Analytics" s explicitním opt-in.

## Filozofie

Analytics dává klientovi přehled, ale **nikdy nemá pochází na úkor návštěvníka**. Pro Morion Light typ klientů: **Cloudflare Web Analytics zdarma**, žádné GA4.
