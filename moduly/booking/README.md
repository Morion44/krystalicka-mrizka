# Modul: Booking (rezervační systém)

Pro klienty, kteří prodávají schůzky *(koučink, terapie, konzultace)*. Cal.com je open-source, GDPR friendly, zdarma.

## Cal.com vs Calendly

| | Cal.com | Calendly |
|---|---|---|
| Cena | zdarma | zdarma s omezeními |
| Open source | ano | ne |
| Self-host | ano (volitelně) | ne |
| GDPR | excellent | dobrý |
| UI | čisté | čisté |
| Embed | iframe nebo widget | iframe |

**Doporučuji Cal.com** pro Morion Light typ klientů.

## Setup Cal.com

### Krok 1: Účet
1. https://cal.com → Sign up *(přes Google nebo e-mail)*
2. Vytvořit „Event Type" *(např. „Individuální konzultace 60 minut")*
3. Nastavit dostupné časy
4. Propojit Google Calendar / iCal *(volitelně)*

### Krok 2: Embed v Astru

V Komnatě:
```astro
<div id="cal-embed"></div>

<script>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        typeof namespace === 'string'
          ? (cal.ns[namespace] = api) && p(api, ar)
          : p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');

  Cal('init', { origin: 'https://cal.com' });

  Cal('inline', {
    elementOrSelector: '#cal-embed',
    calLink: 'tva-cal-link/individualni-konzultace'
  });
</script>
```

`tva-cal-link` je tvoje uživatelské jméno na Cal.com, `individualni-konzultace` je slug eventu.

### Krok 3: CSP aktualizace

V Cloudflare Transform Rules → Content-Security-Policy přidej:
```
script-src 'self' 'unsafe-inline' https://app.cal.com;
frame-src https://app.cal.com https://cal.com;
connect-src 'self' https://app.cal.com;
```

### Krok 4: Test

Otevři Komnatu s embed → ověř, že kalendář se načítá. Zarezervuj test schůzku → ověř, že přišla notifikace + mail.

## Alternativa: Calendly (pokud klient preferuje)

Setup podobný, jen embed kód z calendly.com.

## Filozofie

Booking je užitečný pro klienty, kteří **prodávají čas**. Pro klienty, kteří preferují kontaktní formulář *(„napište mi, domluvíme se osobně")*, je booking zbytečný.
