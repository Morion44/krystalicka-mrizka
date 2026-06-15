# BEZPEČNOST — kompletní guide

Kompletní bezpečnostní setup pro každý nový web. Cíl: **skóre A v securityheaders.com**.

## 1. Cloudflare SSL/TLS

V Cloudflare → SSL/TLS → Edge Certificates:

- [x] **Always Use HTTPS** — On
- [x] **HSTS (Strict Transport Security)** — Configure:
  - Enable HSTS: **On**
  - Max-Age: **6 months** (15552000 s)
  - Apply HSTS to subdomains (includeSubDomains): **Off** *(bezpečnější — neblokuje budoucí subdomény)*
  - Preload: **Off** *(preload je téměř nevratný, nedělat na produkční doméně)*
  - No-Sniff Header: **On**
- [x] **Minimum TLS Version** — TLS 1.2
- [x] **TLS 1.3** — On
- [x] **Opportunistic Encryption** — On
- [x] **Automatic HTTPS Rewrites** — On

NIKDY nestiskni: **Disable Universal SSL** (vypnulo by SSL, web by přestal být dostupný).

## 2. Cloudflare Security

V Cloudflare → Security:

- [x] **Bot Fight Mode** — On *(blokuje malicious boty)*
- [x] **Client-side Security** — On *(monitoruje third-party scripts)*
- [ ] **Leaked credentials mitigation** — Off *(jen pro weby s loginem)*
- [ ] **Under Attack Mode** — Off *(jen v nouzi)*

## 3. Vlastní HTTP bezpečnostní hlavičky

V Cloudflare → Rules → **Transform Rules** → **Modify Response Header** → Create rule (každá hlavička je vlastní pravidlo):

### Pravidlo 1: X-Frame-Options
- Rule name: `Add X-Frame-Options DENY`
- If incoming requests match: **All incoming requests**
- Then → Modify response header → **Set static**
- Header name: `X-Frame-Options`
- Value: `DENY`

### Pravidlo 2: Referrer-Policy
- Rule name: `Add Referrer-Policy`
- Action: Set static
- Header name: `Referrer-Policy`
- Value: `strict-origin-when-cross-origin`

### Pravidlo 3: Permissions-Policy
- Rule name: `Add Permissions-Policy`
- Action: Set static
- Header name: `Permissions-Policy`
- Value: `camera=(), microphone=(), geolocation=(), payment=(), usb=()`

### Pravidlo 4: Content-Security-Policy
- Rule name: `Add Content-Security-Policy`
- Action: Set static
- Header name: `Content-Security-Policy`
- Value:
```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.bunny.net; font-src 'self' https://fonts.bunny.net; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

*(Pokud používáš jiné externí zdroje — např. analytics, embed videí — přidej do `default-src`, `script-src`, `font-src` podle potřeby.)*

## 4. Dvoufaktorové ověření (2FA)

### Google účet (Gmail, Search Console, Analytics)
1. https://myaccount.google.com/security
2. 2-Step Verification → Get started
3. Telefon SMS + Authenticator app (TOTP)
4. **Vygenerovat App passwords** (pro Send mail as v Gmailu)

### GitHub
1. https://github.com/settings/security
2. Two-factor authentication → Enable
3. Authenticator app (Google Authenticator, Authy)
4. **Uložit 16 recovery kódů** offline (text soubor, vytištěné)

### Cloudflare
1. https://dash.cloudflare.com → Profile → Authentication
2. Two-Factor Authentication → Mobile App → Add
3. Authenticator app
4. **Uložit recovery kódy** offline

## 5. Testování bezpečnosti

### A) securityheaders.com
URL: `https://securityheaders.com/?q=<tva-domena>`

Cíl: **A** (případně A+, ale to vyžaduje odstranění `'unsafe-inline'` z CSP — pro Astro to není možné bez velkého refactoringu).

### B) SSL Labs
URL: `https://www.ssllabs.com/ssltest/analyze.html?d=<tva-domena>`

Cíl: **A** nebo **A+** *(Cloudflare to dělá automaticky)*.

### C) Mozilla Observatory
URL: `https://observatory.mozilla.org/analyze/<tva-domena>`

Cíl: **A** nebo **B+**. Pokud B+, je v pořádku — Observatory je nejpřísnější.

## 6. Pravidelná údržba

- **Měsíčně:** `npm audit` (informativní, false positives od esbuild jsou OK)
- **Pololetně:** zkontrolovat 2FA na všech účtech, obnovit recovery kódy pokud jsi je použila
- **Ročně:** prohlédnout přístupy do GitHubu, Cloudflare, Google (kdo má přístup?)

## 7. Známé limity Astra (transparentně)

- `'unsafe-inline'` v CSP `script-src` — nutné kvůli Astro inline scriptům v komponentech (Menu, Cookies). Cesta k A+ by vyžadovala nonce-based CSP, což je velký refactor.
- npm audit občas hlásí esbuild vulnerabilities — týkají se jen dev serveru, ne produkce.

Tyto kompromisy jsou **vědomé a akceptovatelné** pro Astro statické weby.
