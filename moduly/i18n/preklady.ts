// ============================================================
// preklady.ts — SLOVNÍK PŘEKLADŮ (modul i18n)
//
// Jeden zdroj pravdy pro všechny texty rozhraní ve více jazycích.
// Poetické texty Brány/Vrcholu zůstávají v src/data/obsah.ts —
// tady jsou texty UI (menu, tlačítka, patička, popisky).
//
// Po zkopírování modulu do projektu umísti tento soubor do:
//   src/data/preklady.ts
// ============================================================

export const JAZYKY = ['cs', 'en'] as const;
export type Jazyk = (typeof JAZYKY)[number];

export const VYCHOZI_JAZYK: Jazyk = 'cs';

// Slovník: pro každý klíč text ve všech jazycích.
export const preklady = {
	cs: {
		'menu.kdoJsem': 'Kdo jsem',
		'menu.kontakt': 'Kontakt',
		'menu.blog': 'Blog',
		'paticka.sesterskeWeby': 'Sesterské weby',
		'404.zpet': 'Zpět k Bráně',
		'prepinac.jazyk': 'Jazyk',
	},
	en: {
		'menu.kdoJsem': 'About me',
		'menu.kontakt': 'Contact',
		'menu.blog': 'Blog',
		'paticka.sesterskeWeby': 'Sister sites',
		'404.zpet': 'Back to the Gate',
		'prepinac.jazyk': 'Language',
	},
} as const;

// Typ klíče překladu (našeptávač i kontrola překlepů v editoru).
export type KlicPrekladu = keyof (typeof preklady)['cs'];

// Vrátí text pro daný jazyk a klíč. Když chybí, spadne na výchozí jazyk.
export function t(jazyk: Jazyk, klic: KlicPrekladu): string {
	return preklady[jazyk]?.[klic] ?? preklady[VYCHOZI_JAZYK][klic] ?? klic;
}
