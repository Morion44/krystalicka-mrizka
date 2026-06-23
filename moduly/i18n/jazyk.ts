// ============================================================
// jazyk.ts — POMOCNÍCI PRO JAZYKY (modul i18n)
//
// Drobné funkce pro práci s jazykem v URL. Počítá s Astro i18n
// routingem, kde výchozí jazyk (cs) běží bez prefixu a ostatní
// s prefixem (/en/...). Viz README.md, sekce „Astro config".
//
// Po zkopírování modulu umísti do: src/utils/jazyk.ts
// ============================================================

import { JAZYKY, VYCHOZI_JAZYK, type Jazyk } from '../data/preklady';

// Z cesty (Astro.url.pathname) pozná aktuální jazyk.
//   '/en/kdo-jsem' → 'en'
//   '/kdo-jsem'    → 'cs' (výchozí, bez prefixu)
export function jazykZCesty(pathname: string): Jazyk {
	const prvni = pathname.split('/').filter(Boolean)[0];
	return (JAZYKY as readonly string[]).includes(prvni) ? (prvni as Jazyk) : VYCHOZI_JAZYK;
}

// Sestaví odkaz na stejnou stránku v jiném jazyce.
//   prelozOdkaz('/kdo-jsem', 'en')        → '/en/kdo-jsem'
//   prelozOdkaz('/en/kdo-jsem', 'cs')     → '/kdo-jsem'
export function prelozOdkaz(pathname: string, cilovyJazyk: Jazyk): string {
	// odstraníme stávající jazykový prefix (pokud je)
	const casti = pathname.split('/').filter(Boolean);
	if ((JAZYKY as readonly string[]).includes(casti[0])) casti.shift();
	const zbytek = casti.join('/');

	// výchozí jazyk je bez prefixu, ostatní s prefixem
	if (cilovyJazyk === VYCHOZI_JAZYK) return '/' + zbytek;
	return '/' + cilovyJazyk + (zbytek ? '/' + zbytek : '');
}

// Pomocník pro hreflang odkazy v <head> — vrátí dvojice jazyk/URL.
export function hreflangOdkazy(pathname: string, domena: string): { jazyk: Jazyk; url: string }[] {
	const base = domena.replace(/\/$/, '');
	return JAZYKY.map((j) => ({ jazyk: j, url: base + prelozOdkaz(pathname, j) }));
}
