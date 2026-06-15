# POŠTA — doménová adresa info@domena.cz

Nastavení profesionální mailové adresy na vlastní doméně klienta. **Zdarma** přes Cloudflare Email Routing + Gmail Send mail as.

## Architektura

```
[Někdo pošle] → info@nova-domena.cz
       ↓
  Cloudflare Email Routing (přijímá)
       ↓
  Přesměrování na osobní Gmail klienta (např. klient@gmail.com)
       ↓
  Gmail s filtrem + štítkem "Nová značka"
       ↓
  Klient vidí mail jako součást "Nová značka" složky

[Klient odpovídá]
       ↓
  Gmail → Send mail as info@nova-domena.cz (přes Gmail SMTP s App Password)
       ↓
  Příjemce vidí info@nova-domena.cz jako odesílatele
```

## Krok 1: Cloudflare Email Routing (přijímání pošty)

V Cloudflare → vybranout doménu → Email → Email Routing.

### 1A: Destination Address (kam přesměrovávat)
- Destination Addresses → Add destination address
- Zadat osobní Gmail klienta
- Cloudflare pošle ověřovací mail → kliknout v něm

### 1B: Routing Rule (jaká adresa kam)
- Routing rules → Create address
- **Custom address:** `info`
- **Action:** Send to an email
- **Destination:** vybraný Gmail (z 1A)
- Save → status: Active

### 1C: DNS aktualizace
Cloudflare automaticky:
- Smaže staré MX záznamy *(pokud nějaké jsou)*
- Přidá vlastní MX (`route1/2/3.mx.cloudflare.net`)
- Přidá DKIM (`cf2024-1._domainkey`)
- Přidá SPF (`v=spf1 include:_spf.mx.cloudflare.net ~all`)

**POZOR:** Pokud na doméně už visela pošta u jiného providera, Cloudflare požádá o **manuální mazání starých MX**. Postup:
1. Cloudflare → DNS → Records
2. Smazat staré MX *(např. `mx0.fortion.net`, `mx1.fortion.net`)*
3. Smazat starý SPF *(starý TXT `v=spf1 redirect=…`)*
4. Vrátit se do Email Routing → Onboarding → Done

### 1D: Enable Email Routing
- Po DNS změnách → Email Routing → Overview → status by měl být **Active**

### 1E: Test příjmu
- Z jiné adresy *(seznam.cz, jiný Gmail)* pošli mail na `info@nova-domena.cz`
- Mělo by dorazit do osobního Gmailu klienta za 30 s – 2 min
- **Nepoužívej k testu osobní Gmail samotného klienta** — Gmail blokuje „self-forward" a Cloudflare ti pošle „Missing email" info mail

## Krok 2: Gmail filtr + štítek

V Gmailu klienta:

### 2A: Vytvoření filtru
1. Otevřít mail, který přišel z testu *(viz 1E)*
2. Tři tečky `⋮` → **„Filtrovat zprávy jako tato"**
3. V dialogu: **Smaž obsah pole „Od"**, **vyplň pole „Komu"** s `info@nova-domena.cz`
4. Vytvořit filtr

### 2B: Akce filtru
- ✅ **Použít štítek** → Nový štítek → `Nová značka`
- ✅ **Použít filtr také na X odpovídajících konverzací** *(pro zpětnou archivaci)*
- ⚠️ *(volitelně)* Přeskočit doručenou poštu *(archivovat)* — jen pokud klient nechce vidět maily na info@ ve smíšeném inboxu

Vytvořit filtr.

## Krok 3: Send mail as (odesílání z doménové adresy)

**Vyžaduje 2FA na Google účtu klienta + App Password.**

### 3A: Zapnout 2FA na Google účtu
1. https://myaccount.google.com/security
2. 2-Step Verification → Get started → Authenticator app

### 3B: Vygenerovat App Password
1. https://myaccount.google.com/apppasswords
2. App name: `Send mail as info`
3. Create → zobrazí se 16místné heslo
4. **OKAMŽITĚ ZKOPÍRUJ** *(Google ho ukáže jen jednou)*

### 3C: Send mail as v Gmail nastavení
1. Gmail → Nastavení (kolečko) → Zobrazit všechna nastavení
2. Záložka **„Účty a import"**
3. **„Odeslat zprávu jako:"** → Přidat další e-mailovou adresu
4. Jméno: `Nová značka` *(nebo jméno klienta)*
5. E-mail: `info@nova-domena.cz`
6. ✅ Použít jako alias → Další krok
7. **SMTP server:** `smtp.gmail.com`
8. **Port:** `587`
9. **Uživatelské jméno:** osobní Gmail klienta *(celá adresa, např. `klient@gmail.com`)*
10. **Heslo:** **App Password z 3B** *(16 znaků, klidně s mezerami)*
11. **Zabezpečené připojení:** TLS
12. Přidat účet

### 3D: Ověření
Google pošle 6-místný kód na `info@nova-domena.cz`. Mail dorazí přes Cloudflare Routing do osobního Gmailu. Klient vloží kód do Google ověřovacího formuláře.

### 3E: Potvrzení
Po vložení kódu Google ukáže: *„Tento uživatel Gmailu teď může odesílat poštu jako uživatel info@nova-domena.cz."*

## Krok 4: Test odesílání

Klient v Gmailu → Napsat:
- **Z:** `info@nova-domena.cz` *(vybere v dropdown vedle pole „Od")*
- **Komu:** test adresa *(seznam.cz nebo jiná, ne stejný Gmail!)*
- Předmět + tělo
- Odeslat

Příjemce by měl vidět odesílatele `info@nova-domena.cz`, ne osobní Gmail.

## Známé limity

### Self-forward block
Gmail blokuje, když odešleš z `klient@gmail.com` na `info@nova-domena.cz`, který se forwarduje zpět na `klient@gmail.com`. Cloudflare pošle „Missing email" info mail. **K testům používej jinou adresu.**

### Telefon „použit příliš mnohokrát"
Pokud chceš vytvořit **nový Gmail účet** *(plně oddělená schránka)* místo Send mail as, Google může odmítnout tvůj telefon kvůli limitu *(2 účty / telefon / rok)*. Řešení:
- Použít cizí telefon dočasně *(odebrat z účtu po vytvoření)*
- Použít Google Voice / virtuální číslo *(omezené v ČR)*
- Počkat 1–3 měsíce
- Zůstat u Send mail as setupu *(funguje stejně dobře pro většinu případů)*

### Není to Google Workspace
Send mail as setup **není** plnohodnotný Google Workspace ($6/měsíc/uživatel). Rozdíly:
- ✅ Funguje úplně zdarma
- ✅ Přijímá i odesílá z doménové adresy
- ❌ Vlastní pošta není samostatný inbox — je smíchaná s osobním Gmailem *(řešitelné filtrem + štítkem)*
- ❌ Nemůžeš mít více uživatelů na doméně *(jen jednu adresu na osobní Gmail)*

Pro klienty s týmem → Google Workspace.
