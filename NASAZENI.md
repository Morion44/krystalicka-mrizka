# NASAZENÍ — kompletní deploy guide

Od lokálního buildu po živý web na vlastní doméně s SSL.

## Předpoklady

- Účet **GitHub** *(zdarma)*
- Účet **Cloudflare** *(zdarma)*
- Doména klienta *(registrovaná kdekoli — Webglobe, Active24, Namecheap, Cloudflare Registrar…)*

## Krok 1: Lokální build (test)

```bash
cd muj-novy-web
npm install      # první spuštění
npm run build    # zkontroluje, že vše buildí bez chyb
```

Pokud build prošel, vytvořila se složka `dist/` se statickým webem. **Neutahuj ji na GitHub** — je v `.gitignore`.

## Krok 2: GitHub repository

### 2A: Vytvořit repo
1. github.com → New repository
2. Název: `muj-novy-web` *(nebo cokoli)*
3. Visibility: **Private** *(volitelně)*
4. NIC nezaškrtnout *(žádné README, .gitignore, license — máme vlastní)*
5. Create

### 2B: Push lokálního projektu
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USER/muj-novy-web.git
git push -u origin main
```

### 2C: Ověř na GitHubu, že soubory jsou tam

## Krok 3: Cloudflare Pages

### 3A: Create project
1. https://dash.cloudflare.com → Workers & Pages → Create
2. Pages → **Connect to Git** → GitHub
3. Authorize Cloudflare aplikaci u GitHubu *(jen poprvé)*
4. Vybrat repository `muj-novy-web`
5. Begin setup

### 3B: Build configuration
- **Production branch:** `main`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** *(nechat prázdné)*
- Environment variables: *(zatím nic)*

Save and Deploy.

### 3C: První deploy
- Cloudflare stáhne kód, spustí `npm install` a `npm run build`
- Trvá 1–3 minuty
- Po úspěšném buildu: web jede na `<projekt>.pages.dev`

### 3D: Test
- Otevři `<projekt>.pages.dev` v prohlížeči
- Ověř všechny stránky, scroll, animace, menu

## Krok 4: Cloudflare jako DNS provider

Doména klienta musí být v Cloudflare zóně, aby Cloudflare mohl spravovat DNS + SSL.

### 4A: Add a site
1. Cloudflare Dashboard → **+ Add** → Connect a domain *(NE „Transfer a domain")*
2. Zadat doménu klienta *(např. `nova-domena.cz`)*
3. Vybrat **Free plan**

### 4B: DNS scan
- Cloudflare projde existující DNS u registrátora
- Ukáže ti seznam DNS záznamů *(A, CNAME, MX, TXT)*
- **POZORNĚ ZKONTROLUJ MX záznamy** *(pokud klient má poštu na doméně)*
- **Continue to activation**

### 4C: Cloudflare ti dá nameservers
- Dva nameservers, např. `liz.ns.cloudflare.com` a `todd.ns.cloudflare.com`

### 4D: Změna nameservers u registrátora
**Postup se liší podle registrátora.** Obecně:
1. Přihlas se k registrátorovi *(Webglobe / Active24 / Namecheap…)*
2. Najdi „DNS nastavení" / „Nameservers"
3. Změň ze stávajících na ty od Cloudflare
4. Save

**Pozor:** Pokud doména je u **resellera** *(např. websnadno.cz)* a **klíče drží reseller**, klient se musí obrátit na podporu resellera s žádostí o NS změnu.

### 4E: Počkat na DNS propagaci
- 1–24 hodin
- Cloudflare automaticky zjistí, že NS jsou změněné, a zónu aktivuje
- Po aktivaci dostaneš mail *(„morionlight.com is now active on Cloudflare")*

## Krok 5: Propojit Pages projekt s doménou

### 5A: Custom domain v Pages projektu
1. Cloudflare → Workers & Pages → tvůj projekt → **Custom domains**
2. **Set up a custom domain** → zadat `nova-domena.cz` *(bez www)*
3. Cloudflare ukáže návrh DNS změny *(přepne A `185.x.x.x` na CNAME `<projekt>.pages.dev`)*
4. **Activate domain**

### 5B: Opakovat pro www
1. Set up a custom domain → `www.nova-domena.cz`
2. Activate

### 5C: SSL certifikát
Cloudflare automaticky vystaví SSL pro obě domény. Trvá 1–5 minut. Pak web jede na `https://nova-domena.cz` i `https://www.nova-domena.cz`.

## Krok 6: První testy

### Funkční test
- [ ] `https://nova-domena.cz` — Brána načítá, animace běží
- [ ] `https://www.nova-domena.cz` — redirect nebo přímo web
- [ ] Otevřít všechny Komnaty
- [ ] Cookies lišta funguje (Odmítnout / Nastavení / Přijmout)
- [ ] Menu otevírá a zavírá
- [ ] Mobil view *(Chrome DevTools → Toggle device toolbar)*

### Rychlost
- [ ] PageSpeed Insights *(viz SEO.md)*

### Bezpečnost
- [ ] securityheaders.com *(viz BEZPECNOST.md)*

## Krok 7: Po nasazení

### Pro klienta
- Předat URL: `https://nova-domena.cz`
- Předat URL: Cloudflare dashboard + jak se přihlásit
- Předat URL: GitHub repo + jak nahrávat změny

### Pro tebe (autor šablony)
- Pozvat klienta jako spolupracovníka v GitHub repu
- Pozvat klienta jako Member v Cloudflare účtu
- Vypsat klientovi **mapu pravidelných úkolů** *(viz README.md, sekce Údržba)*

## Krok 8: Aktualizace webu (jak pushovat změny)

Klient nebo ty:

```bash
cd muj-novy-web

# Otevři soubor v editoru, uprav
# např. src/data/obsah.ts — změň text

# Otestuj lokálně
npm run dev

# Když je vše OK
git add .
git commit -m "Aktualizace textu Brány"
git push origin main
```

Cloudflare automaticky:
1. Detekuje push
2. Spustí build
3. Nasadí novou verzi
4. Trvá 1–3 minuty

Klient si může v Cloudflare Pages → Deployments sledovat průběh.

## Krok 9: Známé limity

### Cloudflare Free plan
- 500 builds / měsíc *(stačí pro běžné weby)*
- 100 custom domains *(stačí)*
- 100 GB bandwidth / měsíc *(stačí pro většinu webů)*
- Žádný „Always Online" *(potřebuješ Pro plan, $20/měsíc)*

### Astro `unsafe-inline`
- CSP musí povolit `'unsafe-inline'` v `script-src` pro Astro inline scripts
- securityheaders.com tě „cap-uje" na A místo A+ *(akceptovatelné)*

### Email Routing limity (Free)
- 200 destination adres / účet
- Žádný limit na počet routing rules
- Žádný limit na příchozí maily

## Řešení nejčastějších problémů

### „Web jede na pages.dev, ale ne na vlastní doméně"
- Zkontroluj DNS propagaci: https://dnschecker.org/
- Pokud nameservers ještě nepropagovaly, počkej

### „Cloudflare hlásí SSL chybu"
- SSL/TLS → Edge Certificates → vypnout a zapnout Always Use HTTPS
- Někdy stačí počkat 10 minut

### „Build na Cloudflare Pages padá"
- Cloudflare → Pages → Deployments → klikni na neúspěšný build → Logs
- Většinou je to chyba v package.json nebo závislosti
- Test lokálně: `rm -rf node_modules && npm install && npm run build`
