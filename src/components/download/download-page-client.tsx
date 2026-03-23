'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import {
	ArrowUpRight,
	Calendar,
	Cpu,
	Download,
	MonitorCog,
	Package,
	Shield,
} from 'lucide-react'

import type {
	ReleaseAsset,
	ReleasePost,
	SupportedReleasePlatform,
} from '@/lib/github-releases'
import { isSupportedReleasePlatform } from '@/lib/github-releases'
import {
	countHiddenReleaseAssets,
	getPlatformReleaseAssets,
	getSupportedReleaseAssetGroups,
} from '@/lib/release-assets'
import { siteLinks } from '@/lib/site-links'
import { useLang } from '@/lib/use-lang'
import { usePlatform } from '@/lib/use-platform'

function formatPostDate(date: string, locale: string) {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(new Date(date))
}

function formatFileSize(size: number, locale: string) {
	if (size <= 0) return '0 B'

	const units = ['B', 'KB', 'MB', 'GB']
	let value = size
	let unitIndex = 0

	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024
		unitIndex += 1
	}

	return `${new Intl.NumberFormat(locale, {
		maximumFractionDigits: unitIndex === 0 ? 0 : 1,
	}).format(value)} ${units[unitIndex]}`
}

function getPlatformLabel(platform: SupportedReleasePlatform, lang: 'vi' | 'en') {
	if (platform === 'windows') {
		return lang === 'en' ? 'Windows packages' : 'Gói Windows'
	}

	return lang === 'en' ? 'Linux packages' : 'Gói Linux'
}

function getPlatformName(platform: SupportedReleasePlatform) {
	if (platform === 'windows') return 'Windows'
	return 'Linux'
}

function AssetCard({
	asset,
	locale,
	downloadLabel,
}: {
	asset: ReleaseAsset
	locale: string
	downloadLabel: string
}) {
	return (
		<div className='flex flex-col gap-4 rounded-2xl border border-border bg-background/65 p-4 md:flex-row md:items-center md:justify-between'>
			<div className='min-w-0'>
				<div className='flex flex-wrap items-center gap-2'>
					<span className='inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary'>
						{asset.packageType}
					</span>
					{asset.architecture && (
						<span className='inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground'>
							<Cpu className='mr-1 h-3 w-3' />
							{asset.architecture}
						</span>
					)}
				</div>
				<p className='mt-3 truncate text-sm font-semibold text-foreground md:text-base'>
					{asset.name}
				</p>
				<div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground md:text-sm'>
					<span>{formatFileSize(asset.size, locale)}</span>
					<span className='font-mono'>{asset.contentType}</span>
				</div>
			</div>

			<a
				href={asset.url}
				target='_blank'
				rel='noreferrer'
				className='inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'>
				<Download className='h-4 w-4' />
				{downloadLabel}
			</a>
		</div>
	)
}

export function DownloadPageClient({
	release,
	error,
	requestedPlatform,
}: {
	release: ReleasePost | null
	error?: string | null
	requestedPlatform?: string | null
}) {
	const { lang } = useLang()
	const detectedPlatform = usePlatform()
	const locale = lang === 'en' ? 'en-US' : 'vi-VN'
	const selectedPlatform =
		isSupportedReleasePlatform(requestedPlatform) ? requestedPlatform
		: isSupportedReleasePlatform(detectedPlatform) ? detectedPlatform
		: null

	const copy = useMemo(
		() =>
			lang === 'en' ?
				{
					badge: 'Smart Download',
					title: 'Download the right HNDB package for your machine',
					description:
						'We detect the platform first, then surface only the packages that make sense for that operating system.',
					supportNote:
						'HNDB currently ships official builds for Windows and Linux only.',
					detected: (platform: string) =>
						`Detected platform: ${platform}`,
					fallbackDetected:
						"Your current device doesn't have a dedicated build yet, so we've highlighted the supported platforms below.",
					recommendedTitle: 'Recommended packages for this device',
					recommendedEmpty:
						'No matching package was attached for this platform in the latest release yet.',
					otherTitle: 'Other supported packages',
					releaseMeta: 'Latest downloadable release',
					viewGithub: 'View release on GitHub',
					downloadNow: 'Download',
					additionalFiles: (count: number) =>
						`${count} additional file${count === 1 ? '' : 's'} remain on GitHub for advanced/manual use.`,
					windowsLink: 'Windows',
					linuxLink: 'Linux',
					error:
						error ||
						'Unable to load release assets right now. You can still open the GitHub releases page directly.',
				}
			:	{
					badge: 'Tải xuống thông minh',
					title: 'Tải đúng gói HNDB cho máy của bạn',
					description:
						'Web sẽ ưu tiên nhận diện hệ điều hành trước, sau đó chỉ hiện những gói cài đặt hợp với máy đó.',
					supportNote:
						'Hiện tại HNDB mới phát hành bản chính thức cho Windows và Linux.',
					detected: (platform: string) =>
						`Hệ điều hành đang được ưu tiên: ${platform}`,
					fallbackDetected:
						'Thiết bị hiện tại chưa có bản riêng, nên mình đang hiện các gói hỗ trợ chính bên dưới.',
					recommendedTitle: 'Gói đề xuất cho thiết bị này',
					recommendedEmpty:
						'Release mới nhất hiện chưa có gói phù hợp trực tiếp với hệ điều hành này.',
					otherTitle: 'Các gói hỗ trợ khác',
					releaseMeta: 'Bản phát hành có thể tải ngay',
					viewGithub: 'Xem release trên GitHub',
					downloadNow: 'Tải xuống',
					additionalFiles: (count: number) =>
						`Còn ${count} tệp khác trên GitHub dành cho trường hợp nâng cao / tải thủ công.`,
					windowsLink: 'Windows',
					linuxLink: 'Linux',
					error:
						error ||
						'Không thể tải danh sách tệp release lúc này. Bạn vẫn có thể mở trang GitHub releases.',
				},
		[error, lang],
	)

	const preferredAssets = useMemo(
		() =>
			release && selectedPlatform ?
				getPlatformReleaseAssets(release.assets, selectedPlatform)
			:	[],
		[release, selectedPlatform],
	)
	const supportedGroups = useMemo(
		() => (release ? getSupportedReleaseAssetGroups(release.assets) : []),
		[release],
	)
	const secondaryGroups = supportedGroups.filter(
		(group) => group.platform !== selectedPlatform,
	)
	const hiddenAssetCount = release ? countHiddenReleaseAssets(release.assets) : 0

	return (
		<main className='relative min-h-screen overflow-hidden px-4 pb-24 pt-8 md:px-8 xl:px-16'>
			<div className='pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-30 [background-image:radial-gradient(var(--tw-gradient-stops))] from-primary/5 to-transparent bg-[length:16px_16px] [background-image:radial-gradient(rgba(170,186,242,0.3)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(170,186,242,0.1)_1px,transparent_1px)]' />

			<div className='relative z-10 mx-auto mt-12 max-w-5xl'>
				<div className='max-w-3xl'>
					<p className='mb-3 font-mono text-xs font-bold tracking-widest text-primary uppercase'>
						{copy.badge}
					</p>
					<h1 className='text-4xl font-extrabold tracking-tight text-foreground md:text-5xl'>
						{copy.title}
					</h1>
					<p className='mt-4 text-lg text-muted-foreground'>
						{copy.description}
					</p>
				</div>

				<div className='mt-8 flex flex-wrap items-center gap-3'>
					<Link
						href='/download?platform=windows'
						className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
							selectedPlatform === 'windows' ?
								'border-primary/40 bg-primary/10 text-primary'
							:	'border-border text-muted-foreground hover:text-foreground'
						}`}>
						<MonitorCog className='mr-2 h-4 w-4' />
						{copy.windowsLink}
					</Link>
					<Link
						href='/download?platform=linux'
						className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
							selectedPlatform === 'linux' ?
								'border-primary/40 bg-primary/10 text-primary'
							:	'border-border text-muted-foreground hover:text-foreground'
						}`}>
						<Package className='mr-2 h-4 w-4' />
						{copy.linuxLink}
					</Link>
				</div>

				<div className='mt-6 rounded-3xl border border-primary/20 bg-primary/8 p-5 text-sm text-muted-foreground backdrop-blur-sm'>
					<div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
						<p className='flex items-center gap-2 text-foreground'>
							<Shield className='h-4 w-4 text-primary' />
							{copy.supportNote}
						</p>
						<p className='font-mono text-xs uppercase tracking-[0.22em] text-primary'>
							{selectedPlatform ?
								copy.detected(getPlatformName(selectedPlatform))
							:	copy.fallbackDetected}
						</p>
					</div>
				</div>

				{!release && (
					<div className='mt-10 rounded-3xl border border-border bg-card/40 p-8 text-center'>
						<p className='text-base text-muted-foreground'>
							{copy.error}
						</p>
						<a
							href={siteLinks.releases}
							target='_blank'
							rel='noreferrer'
							className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary'>
							{copy.viewGithub}
							<ArrowUpRight className='h-4 w-4' />
						</a>
					</div>
				)}

				{release && (
					<>
						<section className='mt-10 rounded-3xl border border-border bg-card/40 p-6 md:p-8'>
							<div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
								<div>
									<p className='font-mono text-xs font-bold tracking-[0.24em] text-primary uppercase'>
										{copy.releaseMeta}
									</p>
									<h2 className='mt-3 text-3xl font-bold tracking-tight text-foreground'>
										{release.title}
									</h2>
									<div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
										<span className='inline-flex items-center gap-2'>
											<Calendar className='h-4 w-4' />
											{formatPostDate(release.publishedAt, locale)}
										</span>
										<span className='font-mono'>{release.tagName}</span>
									</div>
								</div>

								<a
									href={release.url}
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary'>
									{copy.viewGithub}
									<ArrowUpRight className='h-4 w-4' />
								</a>
							</div>

							<div className='mt-8 grid gap-8'>
								{selectedPlatform && (
									<section>
										<div className='mb-4'>
											<h3 className='text-xl font-semibold text-foreground'>
												{copy.recommendedTitle}
											</h3>
											<p className='mt-2 text-sm text-muted-foreground'>
												{getPlatformLabel(
													selectedPlatform,
													lang,
												)}
											</p>
										</div>

										{preferredAssets.length > 0 ?
											<div className='grid gap-4'>
												{preferredAssets.map((asset) => (
													<AssetCard
														key={asset.id}
														asset={asset}
														locale={locale}
														downloadLabel={
															copy.downloadNow
														}
													/>
												))}
											</div>
										:	<div className='rounded-2xl border border-dashed border-border bg-background/40 p-4 text-sm text-muted-foreground'>
												{copy.recommendedEmpty}
											</div>
										}
									</section>
								)}

								{secondaryGroups.length > 0 && (
									<section className='border-t border-border pt-8'>
										<h3 className='text-xl font-semibold text-foreground'>
											{copy.otherTitle}
										</h3>

										<div className='mt-5 grid gap-6'>
											{secondaryGroups.map((group) => (
												<div
													key={group.platform}
													className='rounded-2xl border border-border bg-background/40 p-4 md:p-5'>
													<div className='mb-4 flex items-center justify-between gap-3'>
														<h4 className='text-sm font-semibold tracking-wide text-foreground uppercase'>
															{getPlatformLabel(group.platform, lang)}
														</h4>
														<span className='text-xs text-muted-foreground'>
															{group.assets.length}
														</span>
													</div>
													<div className='grid gap-4'>
														{group.assets.map((asset) => (
															<AssetCard
																key={asset.id}
																asset={asset}
																locale={locale}
																downloadLabel={
																	copy.downloadNow
																}
															/>
														))}
													</div>
												</div>
											))}
										</div>
									</section>
								)}
							</div>

							{hiddenAssetCount > 0 && (
								<p className='mt-6 text-sm text-muted-foreground'>
									{copy.additionalFiles(hiddenAssetCount)}
								</p>
							)}
						</section>
					</>
				)}
			</div>
		</main>
	)
}
