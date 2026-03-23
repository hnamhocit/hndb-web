export type Platform = 'windows' | 'macos' | 'linux' | 'other'

function createDownloadPageUrl(platform?: Exclude<Platform, 'macos' | 'other'>) {
	if (!platform) return '/download'
	return `/download?platform=${platform}`
}

export const downloadLinks = {
	windows: createDownloadPageUrl('windows'),
	macos: createDownloadPageUrl(),
	linux: createDownloadPageUrl('linux'),
	latest: createDownloadPageUrl(),
}

export function detectPlatform(userAgent: string): Platform {
	const ua = userAgent.toLowerCase()

	if (ua.includes('win')) return 'windows'
	if (ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) {
		return 'macos'
	}
	if (ua.includes('linux') || ua.includes('x11')) return 'linux'
	return 'other'
}
