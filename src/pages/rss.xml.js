import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: "k8's blog",
		description: "deranged ramblings by probably the biggest weeb you know",
		site: context.site,
		items: posts.map((post) => ({
			...post.data.metadata,
			link: `/blog/${post.id}/`,
		})),
	});
}