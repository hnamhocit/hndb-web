import { BlogPageClient } from '@/components/blog/blog-page-client'
import { getReleasePosts, type ReleasePost } from '@/lib/github-releases'

export const revalidate = 300

export default async function BlogPage() {
	let posts: ReleasePost[] = []
	let error: string | null = null

	try {
		posts = await getReleasePosts()
	} catch (loadError) {
		console.error(
			'Failed to load GitHub releases for blog page',
			loadError,
		)
		error = 'Không thể tải GitHub releases lúc này.'
	}

	return (
		<BlogPageClient
			posts={posts}
			error={error}
		/>
	)
}
