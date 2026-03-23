import {
	type ReleaseAsset,
	type SupportedReleasePlatform,
	supportedReleasePlatforms,
} from './github-releases'

function getPackagePriority(asset: ReleaseAsset) {
	switch (asset.packageType) {
		case 'MSI':
			return 0
		case 'EXE':
			return 1
		case 'AppImage':
			return 0
		case 'DEB':
			return 1
		case 'RPM':
			return 2
		case 'Flatpak':
			return 3
		case 'Snap':
			return 4
		case 'ZIP':
			return 5
		case 'tar.gz':
			return 6
		default:
			return 10
	}
}

function compareAssets(a: ReleaseAsset, b: ReleaseAsset) {
	const packageOrder = getPackagePriority(a) - getPackagePriority(b)
	if (packageOrder !== 0) return packageOrder

	if (a.architecture && !b.architecture) return -1
	if (!a.architecture && b.architecture) return 1

	return a.name.localeCompare(b.name)
}

export function getPlatformReleaseAssets(
	assets: ReleaseAsset[],
	platform: SupportedReleasePlatform,
) {
	return assets
		.filter((asset) => asset.platform === platform)
		.sort(compareAssets)
}

export function getSupportedReleaseAssetGroups(assets: ReleaseAsset[]) {
	return supportedReleasePlatforms
		.map((platform) => ({
			platform,
			assets: getPlatformReleaseAssets(assets, platform),
		}))
		.filter((group) => group.assets.length > 0)
}

export function countHiddenReleaseAssets(assets: ReleaseAsset[]) {
	return assets.filter(
		(asset) => asset.platform !== 'windows' && asset.platform !== 'linux',
	).length
}
