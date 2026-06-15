# Modul: Kontaktní formulář

Bezpečný formulář bez third-party služeb. Bezpečnostní backend přes Cloudflare Workers (zdarma).

## Architektura

```
[Návštěvník vyplní formulář]
        ↓
[Astro stránka POST /api/kontakt]
        ↓
[Cloudflare Worker (validace + spam check)]
        ↓
[Worker pošle mail přes Cloudflare Email Workers API]
        ↓
[Klient dostane mail s obsahem formuláře]
```

## Závislosti

Žádné externí. Cloudflare Workers + Email Workers (free tier).

## Setup

### Krok 1: Worker pro odeslání mailu

Cloudflare → Workers → Create Worker → název `kontakt-formular`.

Kód workera *(`worker.js`)*:
```js
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const data = await request.json();

    // Validace
    if (!data.jmeno || !data.email || !data.zprava) {
      return new Response(JSON.stringify({ error: 'Chybí povinná pole' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Honey pot anti-spam
    if (data.honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Odeslat mail přes Cloudflare Email Workers
    try {
      await env.EMAIL.send({
        from: 'no-reply@nova-domena.cz',
        to: 'info@nova-domena.cz',
        subject: `Nová zpráva od ${data.jmeno}`,
        content: [
          {
            type: 'text/plain',
            value: `Jméno: ${data.jmeno}\nE-mail: ${data.email}\n\nZpráva:\n${data.zprava}`
          }
        ]
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Mail se nepodařilo odeslat' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
```

### Krok 2: Bindings v Cloudflare Worker

Worker → Settings → Variables → Email bindings → Add binding:
- Variable name: `EMAIL`
- Destination address: `info@nova-domena.cz`

### Krok 3: Route v Cloudflare

Worker → Triggers → Add route:
- Route: `nova-domena.cz/api/kontakt`
- Zone: `nova-domena.cz`

### Krok 4: Astro komponenta

Zkopíruj `komponenta.astro` *(viz tento adresář)* do `src/komponenty/KontaktniFormular.astro`.

### Krok 5: Použít v Komnatě

```astro
---
import KontaktniFormular from '../komponenty/KontaktniFormular.astro';
---

<KomnataLayout nadpis="Kontakt" popis="...">
  <h1>Kontakt</h1>
  <KontaktniFormular />
</KomnataLayout>
```

## CSP aktualizace

V Cloudflare Transform Rules → Content-Security-Policy přidej:
```
connect-src 'self' https://nova-domena.cz;
```

(Aby fetch z formuláře na `/api/kontakt` prošel.)

## Alternativy

- **Formspree.io** *(zdarma 50 zpráv/měsíc)* — žádný backend, jen action URL
- **Netlify Forms** *(jen pokud hostuješ na Netlify, ne Cloudflare)*
- **Web3Forms** *(zdarma neomezeně, API klíč)*

## Test

Po nasazení:
1. Otevři Komnatu Kontakt
2. Vyplň formulář
3. Klikni Odeslat
4. Zkontroluj inbox

Pokud nepřijde → Cloudflare → Worker → Logs.
