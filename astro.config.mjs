import { defineConfig, fontProviders } from "astro/config"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
	site: "https://thememesniper.dev",
	integrations: [mdx()],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
		},
	],
})
