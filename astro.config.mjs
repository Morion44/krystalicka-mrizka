import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// PERSONALIZACE: změň site URL na cílovou doménu nového webu
export default defineConfig({
	site: 'https://nova-domena.cz',
	integrations: [sitemap()],
});
