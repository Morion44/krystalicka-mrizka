// ============================================================
// obsah.ts — POETICKÉ TEXTY Brány a Vrcholu
//
// ★ Klient si tyto texty napíše sám — jsou součástí jeho příběhu. ★
// Šablona dává jen rámec; obsah musí přijít zevnitř.
//
// Doporučení: tři věty Brány = otevření, čtyři věty Vrcholu = uzavření.
// Rytmus: krátké, čistě, bez balastu.
// ============================================================

// Tři věty, které se postupně objeví v Bráně (fade-in v 1s, 3s, 5s)
export const triVetyBrany = [
	'První věta…',
	'Druhá věta…',
	'Třetí věta… ti zde poslední slovo náleží.',
];

// Úvodní vzkaz, který se objeví hned pod Bránou v Síni
// Použij <br /> pro odřádkování uvnitř jednoho odstavce
export const uvodniVzkaz = `
	Vítej poutníku na cestě.
	Pojď a překroč to, co ti již dávno neslouží.
	Pojď a najdi svou cestu k plnému a klidnému bytí.
	A objev sám sebe, neboť cesta je cíl.
`.trim();

// Čtyři věty Vrcholu (zrcadlo k třem větám Brány)
export const ctyriVetyVrcholu = [
	'Došel jsi poutníku sem, na konec své cesty?',
	'Ohlédni se zpět, čím vším jsi se stal.',
	'A věz, že zde, je jen další začátek.',
	'Neboť cesta je cíl.',
];
