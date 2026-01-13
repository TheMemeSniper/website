// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)
const img = z.object({
	type: z.literal('img'),
	data: z.object({
		src: z.string(),
		alt: z.string()
	})
})

const vid = z.object({
	type: z.literal('vid'),
	data: z.object({
		src: z.string(),
		fallback: z.string()
	})
})

const richtext = z.object({
	type: z.literal("richtext"),
	data: z.string()
})

const blog = defineCollection({
	type: 'data',
	schema: z.object({
        "nano-cms": z.object({
            version: z.number()
        }),
		metadata: z.object({
			title: z.string(),
			description: z.string(),
			authors: z.string(),
			tags: z.array(z.string()),
			date: z.string()
		}),
		content: z.array(
			z.union([
				z.string(),
				img,
				vid,
				richtext
			])
		)
	})
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { blog };