import type { Platform } from './downloads'

import { releaseRepo, siteLinks } from './site-links'

interface GithubReleaseAuthor {
	login?: string | null
}

interface GithubReleaseAsset {
	id: number
	name: string
	browser_download_url: string
	size: number
	download_count: number
	content_type?: string | null
}

interface GithubRelease {
	id: number
	name: string | null
	tag_name: string
	body: string | null
	html_url: string
	published_at: string
	draft: boolean
	prerelease: boolean
	author?: GithubReleaseAuthor | null
	assets?: GithubReleaseAsset[] | null
}

export interface ReleaseAsset {
	id: number
	name: string
	url: string
	size: number
	downloadCount: number
	contentType: string
	platform: Platform
	packageType: string
	architecture: string | null
}

export interface ReleasePost {
	id: number
	category: string
	title: string
	excerpt: string
	publishedAt: string
	readTimeMinutes: number
	author: string
	body: string
	url: string
	tagName: string
	assets: ReleaseAsset[]
}

export const supportedReleasePlatforms = ['windows', 'linux'] as const

export type SupportedReleasePlatform = (typeof supportedReleasePlatforms)[number]

export function isSupportedReleasePlatform(
	value: string | null | undefined,
): value is SupportedReleasePlatform {
	return value === 'windows' || value === 'linux'
}

function inferPackageType(name: string) {
	const normalized = name.toLowerCase()

	if (normalized.endsWith('.msi')) return 'MSI'
	if (normalized.endsWith('.exe')) return 'EXE'
	if (normalized.endsWith('.appimage')) return 'AppImage'
	if (normalized.endsWith('.deb')) return 'DEB'
	if (normalized.endsWith('.rpm')) return 'RPM'
	if (normalized.endsWith('.pkg.tar.zst')) return 'pkg.tar.zst'
	if (normalized.endsWith('.flatpak')) return 'Flatpak'
	if (normalized.endsWith('.snap')) return 'Snap'
	if (normalized.endsWith('.dmg')) return 'DMG'
	if (normalized.endsWith('.pkg')) return 'PKG'
	if (normalized.endsWith('.tar.gz') || normalized.endsWith('.tgz')) {
		return 'tar.gz'
	}
	if (normalized.endsWith('.zip')) return 'ZIP'

	return 'Binary'
}

function inferAssetPlatform(name: string, packageType: string): Platform {
	const normalized = name.toLowerCase()

	if (
		normalized.includes('windows') ||
		normalized.includes('win32') ||
		normalized.includes('win64') ||
		normalized.includes('mingw') ||
		packageType === 'MSI' ||
		packageType === 'EXE'
	) {
		return 'windows'
	}

	if (
		normalized.includes('linux') ||
		normalized.includes('appimage') ||
		normalized.includes('ubuntu') ||
		normalized.includes('debian') ||
		normalized.includes('fedora') ||
		normalized.includes('rpm') ||
		normalized.includes('flatpak') ||
		normalized.includes('snap') ||
		packageType === 'AppImage' ||
		packageType === 'DEB' ||
		packageType === 'RPM' ||
		packageType === 'Flatpak' ||
		packageType === 'Snap'
	) {
		return 'linux'
	}

	if (
		normalized.includes('macos') ||
		normalized.includes('darwin') ||
		normalized.includes('osx') ||
		normalized.includes('apple-silicon') ||
		normalized.includes('universal') ||
		packageType === 'DMG' ||
		packageType === 'PKG'
	) {
		return 'macos'
	}

	return 'other'
}

function inferArchitecture(name: string) {
	const normalized = name.toLowerCase()

	if (
		normalized.includes('arm64') ||
		normalized.includes('aarch64') ||
		normalized.includes('armv8')
	) {
		return 'ARM64'
	}

	if (
		normalized.includes('x64') ||
		normalized.includes('x86_64') ||
		normalized.includes('amd64')
	) {
		return 'x64'
	}

	if (
		normalized.includes('x86') ||
		normalized.includes('i386') ||
		normalized.includes('i686')
	) {
		return 'x86'
	}

	return null
}

function stripMarkdown(markdown: string) {
	return markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/^>\s?/gm, '')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/^[-*+]\s+/gm, '')
		.replace(/^\d+\.\s+/gm, '')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/__([^_]+)__/g, '$1')
		.replace(/[_*~]/g, '')
		.replace(/\r/g, '')
		.replace(/\n{2,}/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

function createExcerpt(markdown: string, maxLength = 180) {
	const plainText = stripMarkdown(markdown)
	if (!plainText) {
		return 'Release notes are available on GitHub.'
	}
	if (plainText.length <= maxLength) return plainText
	return `${plainText.slice(0, maxLength).trimEnd()}...`
}

function estimateReadTime(markdown: string) {
	const plainText = stripMarkdown(markdown)
	const wordCount = plainText.split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.ceil(wordCount / 220))
}

function mapReleaseToPost(release: GithubRelease): ReleasePost {
	const body = release.body?.trim() || ''
	const assets =
		release.assets?.map((asset) => {
			const packageType = inferPackageType(asset.name)

			return {
				id: asset.id,
				name: asset.name,
				url: asset.browser_download_url,
				size: asset.size,
				downloadCount: asset.download_count,
				contentType: asset.content_type || 'application/octet-stream',
				platform: inferAssetPlatform(asset.name, packageType),
				packageType,
				architecture: inferArchitecture(asset.name),
			}
		}) || []

	return {
		id: release.id,
		category: release.prerelease ? 'Pre-release' : 'Release',
		title: release.name?.trim() || release.tag_name,
		excerpt: createExcerpt(body),
		publishedAt: release.published_at,
		readTimeMinutes: estimateReadTime(body),
		author: release.author?.login || 'HNDB Team',
		body,
		url: release.html_url || siteLinks.releases,
		tagName: release.tag_name,
		assets,
	}
}

export async function getReleasePosts() {
	const token = process.env.GITHUB_TOKEN
	const response = await fetch(
		`https://api.github.com/repos/${releaseRepo.owner}/${releaseRepo.repo}/releases`,
		{
			headers: {
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			next: {
				revalidate: 300,
			},
		},
	)

	if (!response.ok) {
		throw new Error(`GitHub releases request failed: ${response.status}`)
	}

	const releases = (await response.json()) as GithubRelease[]

	return releases
		.filter((release) => !release.draft)
		.map(mapReleaseToPost)
}

export async function getLatestReleasePost() {
	const posts = await getReleasePosts()
	return posts[0] ?? null
}
