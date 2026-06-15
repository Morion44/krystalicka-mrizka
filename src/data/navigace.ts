// ============================================================
// navigace.ts — POLOŽKY MENU
//
// ★ Změň pořadí a obsah pro nový web. ★
// Položky se zobrazí v Dodekaedr-Menu.
// ============================================================

export const polozkyMenu = [
	// Komnaty (samostatné podstránky) → přímé odkazy
	{ nadpis: 'Proč značka',           odkaz: '/proc-znacka' },

	// Sekce v Síni → anchor odkazy (z Komnaty vedou zpět na hlavní stranu + scroll)
	{ nadpis: 'Kdo jsem',              odkaz: '/#kdo-jsem' },
	{ nadpis: 'Co dělám — služba 1',   odkaz: '/#sluzba-1' },
	{ nadpis: 'Co dělám — služba 2',   odkaz: '/#sluzba-2' },
	{ nadpis: 'Reference',             odkaz: '/#reference' },
	{ nadpis: 'Kontakt',               odkaz: '/#kontakt' },

	// Blog (volitelné)
	{ nadpis: 'Blog',                  odkaz: '/#blog' },
] as const;
