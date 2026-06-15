# Modul: Newsletter signup

Integrace s third-party newsletter službou *(Buttondown, ConvertKit, MailerLite)*. Klient si vybere podle preferencí.

## Doporučené služby

### Buttondown *(doporučené)*
- **Cena:** zdarma do 100 odběratelů, $9/měsíc do 1000
- **Plus:** jednoduchý, žádný marketingový balast, GDPR friendly
- **Pro:** menší weby, autoři, terapeuti
- **URL:** https://buttondown.email

### MailerLite
- **Cena:** zdarma do 1000 odběratelů
- **Plus:** plnohodnotný builder, automatizace
- **Pro:** střední weby s aktivní rozesílkou
- **URL:** https://www.mailerlite.com

### ConvertKit (Kit)
- **Cena:** zdarma do 1000 odběratelů
- **Plus:** silné segmentace, tagging
- **Pro:** profi marketingové weby, kurzy
- **URL:** https://convertkit.com

## Setup (univerzální vzorec)

### Krok 1: Registrace u služby
Klient si zaregistruje účet, vytvoří první „Form" / „Email list".

### Krok 2: Embed kód
Služba dá embed kód *(HTML form tag s action URL)*. Zkopíruj.

### Krok 3: Komponenta v Astru

`src/komponenty/Newsletter.astro`:
```astro
---
// Newsletter signup
---

<form
  class="newsletter"
  action="https://buttondown.email/api/emails/embed-subscribe/USERNAME"
  method="post"
  target="popupwindow"
  onsubmit="window.open('https://buttondown.email/USERNAME', 'popupwindow')"
>
  <label class="pole">
    <span class="pole__nazev">Tvůj e-mail</span>
    <input type="email" name="email" required placeholder="hostujici@example.cz" />
  </label>

  <button type="submit" class="tlacitko">Přihlásit k odběru</button>
</form>

<style>
  .newsletter {
    display: flex;
    flex-direction: column;
    gap: var(--vzduch-stredni);
    max-width: 50ch;
    margin: 0 auto;
  }

  /* (zbytek stylů jako u kontaktního formuláře) */
</style>
```

### Krok 4: Použít v Komnatě nebo Síni
```astro
import Newsletter from '../komponenty/Newsletter.astro';
...
<Newsletter />
```

### Krok 5: CSP aktualizace
V Cloudflare Transform Rules → Content-Security-Policy přidej:
```
form-action 'self' https://buttondown.email;
```

(Nebo doménu jiné služby.)

## GDPR consent

Pokud Cookies lišta klienta zachycuje souhlas s „marketing cookies", newsletter signup je v pořádku bez extra dialogu.

Pokud Cookies lišta jen „necessary", musí být **explicitní souhlas** *(checkbox „Souhlasím s odesíláním newsletteru a zpracováním e-mailu pro tyto účely")*.

## Test

1. Otevři Komnatu/sekci s formulářem
2. Vyplň e-mail
3. Klikni Přihlásit
4. Buttondown / Kit / MailerLite pošle potvrzovací mail
5. Klikni odkaz v mailu → odběr aktivní
