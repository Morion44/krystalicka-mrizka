# SESTERSKÉ WEBY — jak propojit weby navzájem

Triumvirát webů (Morion Light → Open Your Power → InterfaceArchitekt) tvoří jednu celostní cestu. Aby se weby navzájem znaly a tiše na sebe odkazovaly v patičce, slouží **jeden manifest**: `src/data/sesterske-weby.ts`.

Princip je stejný jako u `kontakt.ts` — **jeden zdroj pravdy**. Změníš jedno místo a patička se přizpůsobí sama.

## Jak to funguje

1. `src/data/sesterske-weby.ts` drží pole všech webů triumvirátu (`sesterskeWeby`) a klíč webu, na kterém právě jsi (`TENTO_WEB`).
2. Komponenta `src/komponenty/Paticka.astro` si zavolá pomocníka `ostatniWeby()`, který **vynechá `TENTO_WEB`** a vrátí jen ostatní.
3. Patička je vložená v `index.astro`, `KomnataLayout.astro` i `BilaVrstvaLayout.astro` — takže se zobrazuje na celém webu automaticky.

Přibude-li časem čtvrtý web, stačí ho přidat do pole `sesterskeWeby` a objeví se v patičkách všech ostatních webů sám.

## Nastavení pro nový web

Otevři `src/data/sesterske-weby.ts` a uprav dvě věci:

### 1. Řekni webu, kdo je

```ts
// Klíč webu, na kterém tento kód běží:
export const TENTO_WEB = 'open-your-power';   // pro web Open Your Power
```

Hodnota musí přesně sedět s některým `klic` v poli níže. Patička podle ní pozná, který web má v seznamu vynechat (web sám na sebe neodkazuje).

### 2. Zkontroluj / doplň pole webů

```ts
export const sesterskeWeby = [
  { klic: 'morion-light',        nazev: 'Morion Light',        url: 'https://morionlight.com',        motto: 'Najdi sebe' },
  { klic: 'open-your-power',     nazev: 'Open Your Power',     url: 'https://openyourpower.com',      motto: 'Otevři svou sílu' },
  { klic: 'interface-architekt', nazev: 'InterfaceArchitekt',  url: 'https://interfacearchitekt.com', motto: 'Tvoř a vyzařuj' },
];
```

U dosud nespuštěných webů doplň finální doménu, jakmile ji budeš znát.

## Pole jednoho webu

| Pole | Co to je | Příklad |
|---|---|---|
| `klic` | jednoznačný identifikátor (musí sedět s `TENTO_WEB`) | `'morion-light'` |
| `nazev` | zobrazené jméno | `'Morion Light'` |
| `url` | plná adresa včetně `https://` | `'https://morionlight.com'` |
| `motto` | stav vědomí / krátké motto pod názvem | `'Najdi sebe'` |

## Pravidla

- **Patička nikdy neodkazuje na web sám na sebe** — o to se stará `ostatniWeby()` přes `TENTO_WEB`.
- **Pořadí v poli = pořadí v patičce.** Drž triádu v pořadí cesty: Najdi sebe → Otevři a dej → Tvoř a vyzařuj.
- **Odkazy mají `rel="noopener"`** kvůli bezpečnosti otevírání cizích stránek.
- Když není žádný sesterský web (`TENTO_WEB` je jediný), patička sekci sesterských webů jednoduše nezobrazí — zůstane jen řádek `© rok značka`.
