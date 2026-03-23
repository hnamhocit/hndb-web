import { DownloadPageClient } from '@/components/download/download-page-client'
import { getLatestReleasePost, type ReleasePost } from '@/lib/github-releases'

export const revalidate = 300

export default async function DownloadPage({
	searchParams,
}: {
	searchParams?: Promise<{
		platform?: string | string[] | undefined
	}>
}) {
	let release: ReleasePost | null = null
	let error: string | null = null
	const resolvedSearchParams = await searchParams
	const requestedPlatform = Array.isArray(resolvedSearchParams?.platform) ?
			resolvedSearchParams.platform[0]
		:	resolvedSearchParams?.platform || null

	try {
		release = await getLatestReleasePost()
	} catch (loadError) {
		console.error(
			'Failed to load GitHub releases for download page',
			loadError,
		)
		error = 'Không thể tải danh sách gói cài đặt lúc này.'
	}

	return (
		<DownloadPageClient
			release={release}
			error={error}
			requestedPlatform={requestedPlatform}
		/>
	)
}
