# Modul: Platby (Stripe)

Stripe Checkout — jednorázové platby pro služby (koučink, terapie, kurzy).

## Stripe Checkout vs Stripe Elements

- **Stripe Checkout** *(doporučené)* — hostovaná stránka, redirect, žádný PCI compliance overhead
- **Stripe Elements** — vlastní formulář, PCI compliance, složitější

Tady popisuji Stripe Checkout.

## Setup

### Krok 1: Účet Stripe
1. https://stripe.com → Sign up
2. Vyplnit firemní údaje
3. **Aktivovat účet** *(KYC, bankovní účet)* — trvá 1–3 dny

### Krok 2: Vytvořit produkty
Stripe Dashboard → Products → Add product:
- Název: „Individuální konzultace"
- Cena: 2 500 Kč (CZK)
- Type: One-time

Po uložení získáš `price_xxxxx` ID.

### Krok 3: Astro endpoint pro Checkout Session

`src/pages/api/checkout.ts`:
```ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { priceId } = await request.json();

  const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

  const params = new URLSearchParams({
    'mode': 'payment',
    'success_url': 'https://nova-domena.cz/dekuji',
    'cancel_url': 'https://nova-domena.cz/kontakt',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  const session = await res.json();

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
```

### Krok 4: Komponenta s tlačítkem

`src/komponenty/TlacitkoPlatba.astro`:
```astro
---
const { priceId, nazev } = Astro.props;
---

<button class="platba-tlacitko" data-price-id={priceId}>
  Zaplatit {nazev}
</button>

<script>
  document.querySelectorAll('.platba-tlacitko').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const priceId = (btn as HTMLButtonElement).dataset.priceId;
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });
      const { url } = await res.json();
      window.location.href = url;
    });
  });
</script>
```

### Krok 5: Environment variable

`.env`:
```
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
```

V Cloudflare Pages → Settings → Environment variables → přidat.

### Krok 6: CSP aktualizace

V Cloudflare Transform Rules → Content-Security-Policy přidej:
```
connect-src 'self' https://api.stripe.com;
```

### Krok 7: Webhooks (pro potvrzení platby)

Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://nova-domena.cz/api/webhook`
- Events: `checkout.session.completed`

Astro endpoint v `src/pages/api/webhook.ts` zpracuje událost a pošle mail klientovi.

## Alternativy

- **GoPay** *(česká brána)* — pro klienty, kteří preferují domácí platby
- **ComGate** *(česká brána)*
- **PayPal** *(pro mezinárodní)*

## Test

Stripe má **test mode** (`pk_test_xxx` / `sk_test_xxx`). Použij testovací kartu `4242 4242 4242 4242` *(libovolné datum + CVV)*.

Po přechodu na live: vygeneruj live klíče a změň v `.env`.
