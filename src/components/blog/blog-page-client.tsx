'use client'

import { useMemo, useState } from 'react'

import {
	ArrowLeft,
	ArrowUpRight,
	Calendar,
	ChevronRight,
	Clock,
	Cpu,
	Download,
	Package,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import {
	type ReleaseAsset,
	type ReleasePost,
	type SupportedReleasePlatform,
	isSupportedReleasePlatform,
} from '@/lib/github-releases'
import {
	countHiddenReleaseAssets,
	getPlatformReleaseAssets,
	getSupportedReleaseAssetGroups,
} from '@/lib/release-assets'
import { siteLinks } from '@/lib/site-links'
import { useLang } from '@/lib/use-lang'
import { usePlatform } from '@/lib/use-platform'

import { ReleaseMarkdown } from './release-markdown'

const viewMotion = {
	initial: { opacity: 0, y: 18 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -12 },
	transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
}

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

function AssetCard({
	asset,
	downloadLabel,
	locale,
}: {
	asset: ReleaseAsset
	downloadLabel: string
	locale: string
}) {
	return (
		<div className='flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-4 md:flex-row md:items-center md:justify-between'>
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

export function BlogPageClient({
	posts,
	error,
}: {
	posts: ReleasePost[]
	error?: string | null
}) {
	const { lang } = useLang()
	const platform = usePlatform()
	const [activePost, setActivePost] = useState<ReleasePost | null>(null)
	const locale = lang === 'en' ? 'en-US' : 'vi-VN'

	const copy = useMemo(
		() =>
			lang === 'en' ?
				{
					badge: 'Changelog & Blog',
					title: 'Latest updates',
					description:
						'Live release notes pulled from GitHub so your changelog stays in sync with the real product timeline.',
					readMore: 'Read more',
					back: 'Back to releases',
					thanks: 'Thanks for checking the latest release notes.',
					scrollTop: 'Back to top',
					viewGithub: 'View on GitHub',
					assetsTitle: 'Release assets',
					downloadNow: 'Download',
					noAssets:
						'No binary assets were attached to this release. Open the GitHub release page for more details.',
					assetCount: (count: number) =>
						`${count} ${count === 1 ? 'asset' : 'assets'}`,
					recommendedAssets: 'Recommended packages for your device',
					otherAssets: 'Other supported packages',
					supportedOnly:
						'Only Windows and Linux installers are surfaced here so the download list stays easy to understand.',
					additionalFiles: (count: number) =>
						`${count} additional file${count === 1 ? '' : 's'} are still available on GitHub if you need them.`,
					empty: 'No releases have been published yet. Check back soon.',
					error:
						error ||
						'Unable to load GitHub releases right now. You can still view them directly on GitHub.',
					readTime: (minutes: number) => `${minutes} min read`,
				}
			:	{
					badge: 'Changelog & Blog',
					title: 'Cập nhật mới nhất',
					description:
						'Release notes được lấy trực tiếp từ GitHub để changelog trên web luôn khớp với tiến độ phát hành thật.',
					readMore: 'Đọc tiếp',
					back: 'Quay lại danh sách',
					thanks: 'Cảm ơn bạn đã đọc release notes mới nhất.',
					scrollTop: 'Lên đầu trang',
					viewGithub: 'Xem trên GitHub',
					assetsTitle: 'Tệp phát hành',
					downloadNow: 'Tải xuống',
					noAssets:
						'Release này chưa đính kèm file build. Bạn có thể mở trang GitHub release để xem thêm.',
					assetCount: (count: number) => `${count} tệp`,
					recommendedAssets: 'Gói đề xuất cho thiết bị của bạn',
					otherAssets: 'Các gói hỗ trợ khác',
					supportedOnly:
						'Phần này chỉ hiện gói cài đặt Windows và Linux để người dùng dễ chọn hơn.',
					additionalFiles: (count: number) =>
						`Còn ${count} tệp khác trên GitHub nếu bạn cần xem đầy đủ.`,
					empty: 'Hiện chưa có release nào được phát hành.',
					error:
						error ||
						'Không thể tải GitHub releases lúc này. Bạn vẫn có thể xem trực tiếp trên GitHub.',
					readTime: (minutes: number) => `${minutes} phút đọc`,
				},
		[error, lang],
	)

	const activeSupportedGroups = useMemo(
		() =>
			activePost ? getSupportedReleaseAssetGroups(activePost.assets) : [],
		[activePost],
	)
	const selectedPlatform = isSupportedReleasePlatform(platform) ? platform : null
	const preferredAssets = useMemo(
		() =>
			activePost && selectedPlatform ?
				getPlatformReleaseAssets(activePost.assets, selectedPlatform)
			:	[],
		[activePost, selectedPlatform],
	)
	const secondaryAssetGroups =
		selectedPlatform ?
			activeSupportedGroups.filter(
				(group) => group.platform !== selectedPlatform,
			)
		:	[]
	const hiddenAssetCount =
		activePost ? countHiddenReleaseAssets(activePost.assets) : 0

	const openPost = (post: ReleasePost) => {
		setActivePost(post)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<motion.main
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			className='relative min-h-screen w-full overflow-hidden px-4 pb-24 pt-8 md:px-8 xl:px-16'>
			<div className='pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-30 [background-image:radial-gradient(var(--tw-gradient-stops))] from-primary/5 to-transparent bg-[length:16px_16px] [background-image:radial-gradient(rgba(170,186,242,0.3)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(170,186,242,0.1)_1px,transparent_1px)]' />

			<AnimatePresence mode='wait'>
				{!activePost && (
					<motion.div
						key='blog-list'
						{...viewMotion}
						className='relative z-10 mx-auto mt-12 max-w-5xl'>
						<div className='mb-16'>
							<p className='mb-3 font-mono text-xs font-bold tracking-widest text-primary uppercase'>
								{copy.badge}
							</p>
							<h1 className='text-4xl font-extrabold tracking-tight text-foreground md:text-5xl'>
								{copy.title}
							</h1>
							<p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
								{copy.description}
							</p>
						</div>

						{posts.length === 0 && (
							<div className='rounded-3xl border border-border bg-card/40 p-8 text-center'>
								<p className='text-base text-muted-foreground'>
									{error ? copy.error : copy.empty}
								</p>
								<a
									href={siteLinks.releases}
									target='_blank'
									rel='noreferrer'
									className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors'>
									{copy.viewGithub}
									<ArrowUpRight className='h-4 w-4' />
								</a>
							</div>
						)}

						{posts.length > 0 && (
							<div className='grid gap-8 md:grid-cols-2'>
								{posts.map((post, index) => (
									<motion.article
										key={post.id}
										initial={{ opacity: 0, y: 18 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.35,
											delay: index * 0.06,
											ease: [0.22, 1, 0.36, 1],
										}}
										whileHover={{ y: -4 }}
										className='group flex cursor-pointer flex-col items-start justify-between rounded-3xl border border-border bg-card/40 p-8 transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]'
										onClick={() => openPost(post)}>
										<div className='w-full'>
											<div className='mb-5 flex items-center gap-3'>
												<span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
													{post.category}
												</span>
												<span className='flex items-center gap-1.5 font-mono text-xs text-muted-foreground'>
													<Calendar className='h-3.5 w-3.5' />
													{formatPostDate(
														post.publishedAt,
														locale,
													)}
												</span>
												{post.assets.length > 0 && (
													<span className='flex items-center gap-1.5 font-mono text-xs text-muted-foreground'>
														<Package className='h-3.5 w-3.5' />
														{copy.assetCount(
															post.assets.length,
														)}
													</span>
												)}
											</div>
											<h2 className='mb-3 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary'>
												{post.title}
											</h2>
											<p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
												{post.excerpt}
											</p>
										</div>

										<div className='mt-8 flex items-center text-sm font-semibold text-foreground transition-colors group-hover:text-primary'>
											{copy.readMore}
											<ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
										</div>
									</motion.article>
								))}
							</div>
						)}
					</motion.div>
				)}

				{activePost && (
					<motion.div
						key={`blog-detail-${activePost.id}`}
						{...viewMotion}
						className='relative z-10 mx-auto mt-8 max-w-3xl'>
						<motion.button
							whileHover={{ x: -2 }}
							onClick={() => setActivePost(null)}
							className='group mb-12 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
							<ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
							{copy.back}
						</motion.button>

						<header className='mb-14'>
							<div className='mb-6 flex flex-wrap items-center gap-3'>
								<span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
									{activePost.category}
								</span>
								<a
									href={activePost.url}
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground'>
									{activePost.tagName}
									<ArrowUpRight className='h-3.5 w-3.5' />
								</a>
							</div>

							<h1 className='mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground md:text-5xl'>
								{activePost.title}
							</h1>
							<div className='flex flex-wrap items-center gap-6 border-y border-border py-4 font-mono text-sm text-muted-foreground'>
								<div className='flex items-center gap-2'>
									<div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary'>
										{activePost.author.charAt(0)}
									</div>
									<span>{activePost.author}</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<Calendar className='h-4 w-4 opacity-70' />
									{formatPostDate(
										activePost.publishedAt,
										locale,
									)}
								</div>
								<div className='flex items-center gap-1.5'>
									<Clock className='h-4 w-4 opacity-70' />
									{copy.readTime(activePost.readTimeMinutes)}
								</div>
							</div>
						</header>

						<motion.article
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.05 }}
							className='prose prose-slate dark:prose-invert max-w-none prose-p:text-[17px] prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-primary prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:text-foreground prose-blockquote:font-medium prose-blockquote:not-italic'>
							<ReleaseMarkdown markdown={activePost.body} />
						</motion.article>

						<section className='mt-10 rounded-3xl border border-border bg-card/40 p-6 md:p-8'>
							<div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
								<div>
									<p className='font-mono text-xs font-bold tracking-[0.24em] text-primary uppercase'>
										{copy.assetsTitle}
									</p>
									<p className='mt-2 text-sm text-muted-foreground'>
										{copy.assetCount(activePost.assets.length)}
									</p>
								</div>
								<a
									href={activePost.url}
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary'>
									{copy.viewGithub}
									<ArrowUpRight className='h-4 w-4' />
								</a>
							</div>

							{activePost.assets.length > 0 ?
								<div className='mt-6 grid gap-8'>
									<div className='rounded-2xl border border-primary/20 bg-primary/8 p-4 text-sm text-muted-foreground'>
										{copy.supportedOnly}
									</div>

									{selectedPlatform && preferredAssets.length > 0 && (
										<section>
											<div className='mb-4 flex items-center justify-between gap-3'>
												<h3 className='text-lg font-semibold text-foreground'>
													{copy.recommendedAssets}
												</h3>
												<span className='text-xs text-muted-foreground uppercase tracking-[0.18em]'>
													{getPlatformLabel(
														selectedPlatform,
														lang,
													)}
												</span>
											</div>
											<div className='grid gap-4'>
												{preferredAssets.map((asset) => (
													<AssetCard
														key={asset.id}
														asset={asset}
														downloadLabel={
															copy.downloadNow
														}
														locale={locale}
													/>
												))}
											</div>
										</section>
									)}

									{secondaryAssetGroups.length > 0 && (
										<section className='border-t border-border pt-8'>
											<h3 className='text-lg font-semibold text-foreground'>
												{copy.otherAssets}
											</h3>
											<div className='mt-5 grid gap-6'>
												{secondaryAssetGroups.map(
													(group) => (
														<div
															key={group.platform}
															className='rounded-2xl border border-border bg-background/40 p-4 md:p-5'>
															<div className='mb-4 flex items-center justify-between gap-3'>
																<h4 className='text-sm font-semibold tracking-wide text-foreground uppercase'>
																	{getPlatformLabel(
																		group.platform,
																		lang,
																	)}
																</h4>
																<span className='text-xs text-muted-foreground'>
																	{
																		group
																			.assets
																			.length
																	}
																</span>
															</div>
															<div className='grid gap-4'>
																{group.assets.map(
																	(asset) => (
																		<AssetCard
																			key={
																				asset.id
																			}
																			asset={
																				asset
																			}
																			downloadLabel={
																				copy.downloadNow
																			}
																			locale={
																				locale
																			}
																		/>
																	),
																)}
															</div>
														</div>
													),
												)}
											</div>
										</section>
									)}

									{!selectedPlatform && activeSupportedGroups.length > 0 && (
										<section className='grid gap-6'>
											{activeSupportedGroups.map((group) => (
												<div
													key={group.platform}
													className='rounded-2xl border border-border bg-background/40 p-4 md:p-5'>
													<div className='mb-4 flex items-center justify-between gap-3'>
														<h4 className='text-sm font-semibold tracking-wide text-foreground uppercase'>
															{getPlatformLabel(
																group.platform,
																lang,
															)}
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
																downloadLabel={
																	copy.downloadNow
																}
																locale={locale}
															/>
														))}
													</div>
												</div>
											))}
										</section>
									)}

									{hiddenAssetCount > 0 && (
										<p className='text-sm text-muted-foreground'>
											{copy.additionalFiles(
												hiddenAssetCount,
											)}
										</p>
									)}
								</div>
							:	<div className='mt-6 rounded-2xl border border-dashed border-border bg-background/40 p-4 text-sm text-muted-foreground'>
									{copy.noAssets}
								</div>
							}
						</section>

						<div className='mt-20 flex items-center justify-between border-t border-border pt-8'>
							<p className='text-sm text-muted-foreground'>
								{copy.thanks}
							</p>
							<button
								onClick={() =>
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									})
								}
								className='text-sm font-semibold text-foreground transition-colors hover:text-primary'>
								{copy.scrollTop} ↑
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.main>
	)
}
