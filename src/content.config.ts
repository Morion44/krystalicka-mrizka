// ============================================================
// content.config.ts
// Astro Content Collections — definuje schéma blog článků
// a případných dalších kolekcí.
// ============================================================

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		nadpis: z.string(),
		popis: z.string(),
		datum: z.coerce.date(),
		autor: z.string().optional(),
	}),
});

export const collections = { blog };
