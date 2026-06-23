// ============================================================
// sesterske-weby.ts — MANIFEST SESTERSKÝCH WEBŮ
//
// Jeden zdroj pravdy o celém triumvirátu webů. Patička (Paticka.astro)
// si odtud sama vytáhne ostatní weby a zobrazí na ně tiché odkazy.
//
// ★ NASTAVENÍ PRO KAŽDÝ WEB ★
//   1. Změň TENTO_WEB na klíč webu, na kterém právě jsi.
//   2. Doplň/uprav pole sesterskeWeby (přibude-li další web).
//
// Patička pak automaticky vynechá TENTO_WEB a zobrazí jen ty ostatní.
// ============================================================

// Klíč webu, na kterém tento kód běží. Změň pro každý web.
//   'morion-light' | 'open-your-power' | 'interface-architekt'
export const TENTO_WEB = 'morion-light';

export interface SesterskyWeb {
	klic: string;       // jednoznačný identifikátor (musí sedět s TENTO_WEB)
	nazev: string;      // zobrazené jméno
	url: string;        // plná adresa včetně https://
	motto: string;      // stav vědomí / krátké motto
}

// Triumvirát — celostní cesta člověka:
//   Najdi sebe → Otevři a dej → Tvoř a vyzařuj
export const sesterskeWeby: SesterskyWeb[] = [
	{
		klic: 'morion-light',
		nazev: 'Morion Light',
		url: 'https://morionlight.com',
		motto: 'Najdi sebe',
	},
	{
		klic: 'open-your-power',
		nazev: 'Open Your Power',
		url: 'https://openyourpower.com',   // doplň finální doménu
		motto: 'Otevři svou sílu',
	},
	{
		klic: 'interface-architekt',
		nazev: 'InterfaceArchitekt',
		url: 'https://interfacearchitekt.com', // doplň finální doménu
		motto: 'Tvoř a vyzařuj',
	},
];

// Pomocník: vrátí jen sesterské weby kromě toho, na kterém právě jsme.
export function ostatniWeby(): SesterskyWeb[] {
	return sesterskeWeby.filter((web) => web.klic !== TENTO_WEB);
}
