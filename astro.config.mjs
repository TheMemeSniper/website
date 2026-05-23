import { defineConfig, fontProviders } from "astro/config"

// https://astro.build/config
export default defineConfig({
	site: "https://thememesniper.dev",
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
		},
	]
})
