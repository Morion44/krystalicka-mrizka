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

// ============================================================
// Tři věty stránky 404 (ztracená cesta).
// Objeví se na tmavé Bráně, postupně jako tři věty úvodu.
// ★ Každý web si je upraví ve svém duchu. ★
//   Web 1 (Morion Light) — tišivý, přijímající
//   Web 2 (Open Your Power) — povzbudivý, vykročení
//   Web 3 (InterfaceArchitekt) — tvořivý, beze studu
// ============================================================
export const triVety404 = [
	'Tato cesta nikam nevede.',
	'Stránka, kterou jsi hledal, tu není — nebo už není.',
	'Vrať se k Bráně a najdi cestu znovu.',
];

// Text odkazu, který ze 404 vede zpět na úvodní stranu
export const odkaz404Zpet = 'Zpět k Bráně';
