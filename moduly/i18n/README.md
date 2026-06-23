# Modul: i18n (dvojjazyčnost CS / EN)

Volitelný modul pro weby, které potřebují víc jazyků. **Morion Light ho nepotřebuje** (tichý český web). **Open Your Power a InterfaceArchitekt ho budou chtít** — míří i na zahraniční publikum.

Princip: výchozí jazyk (čeština) běží **bez prefixu** (`/kdo-jsem`), ostatní jazyky **s prefixem** (`/en/kdo-jsem`). Texty rozhraní drží jeden slovník, poetické texty Brány/Vrcholu zůstávají v `src/data/obsah.ts`.

## Co modul obsahuje

| Soubor | Kam zkopírovat | Co dělá |
|---|---|---|
| `preklady.ts` | `src/data/preklady.ts` | slovník textů rozhraní + funkce `t()` |
| `jazyk.ts` | `src/utils/jazyk.ts` | pomocníci: poznání jazyka z URL, překlad odkazů, hreflang |
| `PrepinacJazyka.astro` | `src/komponenty/PrepinacJazyka.astro` | tichý přepínač CS / EN |

## Instalace — krok za krokem

### Krok 1: Zkopíruj soubory

Přesuň tři soubory z `moduly/i18n/` na místa z tabulky výše. (Vytvoř složku `src/utils/`, pokud ještě není.)

### Krok 2: Zapni i18n routing v Astru

V `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://nova-domena.cz',
  i18n: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
    routing: {
      prefixDefaultLocale: false,   // čeština bez /cs/ prefixu
    },
  },
  integrations: [sitemap()],
});
```

### Krok 3: Vytvoř jazykové verze stránek

Astro mapuje jazyky na složky uvnitř `src/pages/`:

```
src/pages/
  index.astro            → čeština (/)
  kdo-jsem.astro         → čeština (/kdo-jsem)
  en/
    index.astro          → angličtina (/en)
    kdo-jsem.astro       → angličtina (/en/kdo-jsem)
```

Anglické stránky mají stejnou strukturu, jen jiné texty. Texty rozhraní ber přes `t()`, ať je nemusíš psát dvakrát.

### Krok 4: Použij překlady v komponentě

```astro
---
import { t } from '../data/preklady';
import { jazykZCesty } from '../utils/jazyk';

const jazyk = jazykZCesty(Astro.url.pathname);
---

<a href="/#kontakt">{t(jazyk, 'menu.kontakt')}</a>
```

### Krok 5: Vlož přepínač jazyka

Do layoutu (např. vedle záhlaví v `KomnataLayout.astro`):

```astro
import PrepinacJazyka from '../komponenty/PrepinacJazyka.astro';
...
<PrepinacJazyka />
```

### Krok 6: hreflang do hlavičky (SEO)

Aby Google věděl, že stránky jsou jazykové verze téže stránky, přidej do `<head>` (ideálně v `MetaTagy.astro`):

```astro
---
import { hreflangOdkazy } from '../utils/jazyk';
import { kontakt } from '../data/kontakt';

const odkazy = hreflangOdkazy(Astro.url.pathname, kontakt.domena);
---
{odkazy.map((o) => (
  <link rel="alternate" hreflang={o.jazyk} href={o.url} />
))}
<link rel="alternate" hreflang="x-default" href={odkazy[0].url} />
```

## Přidání dalšího jazyka

1. Přidej kód jazyka do `JAZYKY` v `preklady.ts` (např. `'de'`).
2. Doplň překlady pro `de` do slovníku.
3. Přidej `'de'` do `locales` v `astro.config.mjs`.
4. Vytvoř složku `src/pages/de/` s příslušnými stránkami.

Přepínač, hreflang i překlad odkazů se přizpůsobí samy.

## Pravidla

- **Výchozí jazyk bez prefixu.** Čistší URL pro hlavní publikum, lepší pro SEO.
- **Texty rozhraní jen ve slovníku.** Nikdy nepiš anglický text natvrdo do komponenty — přidej klíč do `preklady.ts`.
- **Poetika zůstává v `obsah.ts`.** Tři věty Brány a Vrcholu jsou příběh, ne UI — pro vícejazyčnost si je rozšiř na verze podle jazyka zvlášť, ne přes `t()`.
