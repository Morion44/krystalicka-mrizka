// ============================================================
// kontakt.ts — KONTAKTNÍ ÚDAJE klienta
//
// ★ Změň jen tato data pro nový web. ★
// Hodnoty se propíšou do MetaTagy, StrukturovanaData, kontaktní
// stránky, patičky, JSON-LD schema.
// ============================================================

export const kontakt = {
	jmeno: 'Jméno klienta',
	titul: '',                          // např. 'Ing.', 'MUDr.', '' (volitelné)
	pozice: 'Profesní pozice',          // např. 'Životní koučka'
	znacka: 'Název značky',             // např. 'Morion Light'

	// Web — čerpá z toho SEO (MetaTagy, StrukturovanaData)
	domena: 'https://example.cz',       // plná adresa bez lomítka na konci
	popis: 'Krátký popis webu (max 160 znaků) s klíčovými slovy pro cílovou skupinu.',

	telefon: '+420000000000',           // E.164 formát (bez mezer)
	telefonDisplay: '+420 000 000 000', // pro zobrazení
	email: 'info@example.cz',

	adresa: {
		ulice: '',                       // úmyslně skryté pro SAB, vyplň jen pokud chceš
		mesto: 'Praha',
		PSC: '110 00',
		kraj: 'Hlavní město Praha',
		zeme: 'CZ',
	},

	socialniSite: {
		facebook: '',                    // např. 'https://www.facebook.com/mojeznacka'
		instagram: '',
		linkedin: '',
		youtube: '',
	},

	bankovniSpojeni: {
		cislo: '0000000000/0000',
		banka: 'Banka',
	},
} as const;
