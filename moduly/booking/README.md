# Modul: Booking (rezervace + platba)

Pro weby, které **prodávají čas** (koučink, terapie, konzultace). Klient si vybere termín, způsob kontaktu a rovnou zaplatí — vše v jednom okně. Stojí na **Cal.com** (rezervace, open-source, GDPR friendly) + **Stripe** (platba, napojený přímo v Cal.com) + **Google Calendar** (jeden kalendář pro všechny termíny).

Kompletní návod krok za krokem je v kořenovém **`BOOKING.md`**. Tady je rychlý přehled modulu.

## Co modul obsahuje

| Soubor | Kam zkopírovat | Co dělá |
|---|---|---|
| `RezervaceCal.astro` | `src/komponenty/RezervaceCal.astro` | vloží inline rezervační kalendář Cal.com |

Použití v Komnatě:

```astro
---
import RezervaceCal from '../komponenty/RezervaceCal.astro';
---
<RezervaceCal calLink="blanka/konzultace" />
```

`calLink` je tvůj odkaz z Cal.com (`uzivatel/slug-eventu`).

## Cesta zákazníka (vše řeší Cal.com + Stripe nativně)

1. Klikne na CTA → objeví se rezervační kalendář *(komponenta výše)*
2. Vybere **datum a čas** → Cal.com
3. Vybere **způsob kontaktu** (telefon / Google Meet) → „Location" u eventu
4. U Google Meet se **termín i odkaz** vytvoří přes propojený Google Calendar
5. Vyplní **kontaktní údaje** → rezervační formulář Cal.com
6. Je naveden na **platební bránu** → Stripe (event je označený jako placený)
7. **Zaplatí** → Stripe potvrdí rezervaci
8. Dostane **mail s potvrzením** termínu, způsobu kontaktu a **dokladem o platbě** → Cal.com + Stripe
9. **Ty dostaneš oznámení** o blokaci termínu, kontaktu i platbě → Cal.com + Stripe

## Klíč: jeden kalendář, žádné kolize

OYP rezervace se v kalendáři **potkávají s termíny, které domluvíš ručně** (např. z Morion Light). Řešení = **jeden Google Calendar jako jediný zdroj pravdy**:

- Cal.com **čte** zaneprázdněné časy z Google Calendar → automaticky **nenabídne** obsazené sloty (i ty, co sis zapsala ručně). To je „conflict checking".
- Cal.com **zapisuje** OYP rezervace zpět do Google Calendar.
- Ty dál ručně zapisuješ Morion termíny do téhož kalendáře → Cal je respektuje.

Výsledek: nikdy se dva termíny nepřekryjí, ať přišly odkudkoli. Detailní nastavení v `BOOKING.md`.

## Cal.com vs Calendly

| | Cal.com | Calendly |
|---|---|---|
| Cena | zdarma (placené rezervace přes Stripe v plánu zdarma) | zdarma s omezeními |
| Open source | ano | ne |
| GDPR | excelentní | dobrý |
| Platby (Stripe) | ano, nativně | ano (vyšší plán) |
| Embed | iframe / inline widget | iframe |

**Doporučení: Cal.com.**

## CSP (Cloudflare Transform Rules → Content-Security-Policy)

```
script-src 'self' 'unsafe-inline' https://app.cal.com;
frame-src https://app.cal.com https://cal.com;
connect-src 'self' https://app.cal.com;
```

## Filozofie

Booking je pro weby, které prodávají čas. Pro klienty „napište mi, domluvíme se" stačí kontaktní formulář. Pro prodej **produktů/kurzů** (ne schůzek) použij samostatný modul `platby` (Stripe Checkout) — viz `BOOKING.md`, sekce „Kdy booking a kdy platby".
