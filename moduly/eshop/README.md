# Modul: E-shop (Snipcart)

Snipcart je hostovaný „cart" pro statické weby. Stačí HTML data atributy a Snipcart zařídí košík, platby (přes Stripe), e-mail potvrzení.

## Cena

- **2 % z transakcí** + Stripe fees (1.4 % + 8 Kč pro EU karty)
- Free trial do $500 v obratu

## Setup

### Krok 1: Účet Snipcart
1. https://snipcart.com → Sign up
2. Vyber CZK měnu, zem
3. Propoj se Stripe účtem (pro platby)

### Krok 2: Public API klíč
Dashboard → Account → API Keys → zkopíruj **public test key** (`pk_test_xxx`).

### Krok 3: Embed Snipcart v Astru

V layoutu *(např. `KomnataLayout.astro`)* přidat do `<head>`:
```astro
<link rel="preconnect" href="https://app.snipcart.com">
<link rel="preconnect" href="https://cdn.snipcart.com">
<link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css" />
```

A před `</body>`:
```astro
<div hidden id="snipcart" data-api-key="pk_test_xxx" data-config-modal-style="side"></div>
<script async src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js"></script>
```

### Krok 4: Produktové tlačítko

V Komnatě s produkty:
```astro
<button
  class="snipcart-add-item"
  data-item-id="kurz-zaklad"
  data-item-price="1500"
  data-item-url="/produkty"
  data-item-name="Základní kurz harmonizace"
  data-item-description="6-hodinový kurz pro začátečníky"
>
  Koupit za 1 500 Kč
</button>
```

Snipcart automaticky:
- Otevře košík při kliknutí
- Spočítá DPH
- Zpracuje platbu přes Stripe
- Pošle potvrzovací mail

### Krok 5: CSP aktualizace

V Cloudflare Transform Rules → Content-Security-Policy přidej:
```
script-src 'self' 'unsafe-inline' https://cdn.snipcart.com;
style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://cdn.snipcart.com;
connect-src 'self' https://app.snipcart.com https://cdn.snipcart.com;
img-src 'self' data: https://cdn.snipcart.com;
frame-src https://app.snipcart.com;
```

### Krok 6: Test

V test módu (`pk_test_xxx`) zkus celý proces *(klikni Koupit, vyplň údaje, dokonči s testovací kartou)*.

Po přechodu na live: vyměň `pk_test_xxx` za `pk_live_xxx`.

## Alternativy

- **Shopify Lite** *($9/měsíc + kreditní karta fees)* — komplexnější
- **Lemon Squeezy** *(% z transakcí)* — pro digitální produkty
- **Sellix** *(% z transakcí)* — pro digitální + fyzické

## Filozofie

E-shop je **trychtýřová funkce**. Pokud klient chce zachovat klidnou estetiku Morion Light typu, doporuč spíš **„Buy" Komnatu** *(jen jeden produkt, žádné košíky)* místo plnohodnotného e-shopu.
