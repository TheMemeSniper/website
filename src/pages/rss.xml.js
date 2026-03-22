import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

const icon = "icon.png"

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: "k8's blog",
		description: "deranged ramblings by probably the biggest weeb you know",
		site: context.site,
		items: posts.map((post) => ({
			...post.data.metadata,
			link: `/blog/${post.id}/`,
			pubDate: post.data.metadata.date,
			categories: post.data.metadata.tags,
			author: post.data.metadata.authors,
		})),
		/*
			I cannot even begin to explain what is going on here
			I am just copying what KDE's RSS feed does
		*/
		customData: `
			<icon>${context.site + icon}</icon>
			<logo>${context.site + icon}</logo>
		`,
	});
}

