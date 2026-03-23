'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { downloadLinks } from '@/lib/downloads'
import { useLang } from '@/lib/use-lang'
import { usePlatform } from '@/lib/use-platform'

import {
	homePanelClass,
	iconBadgeClass,
	osIcons,
	primaryButtonClass,
	secondaryButtonClass,
} from './shared'
import { DownloadItem } from './types'

export function HomeDownloadSection() {
	const { t } = useLang()
	const platform = usePlatform()

	const osLinks = useMemo<DownloadItem[]>(
		() => [
			{
				key: 'windows',
				label: t('download.windows'),
				note: t('download.windowsNote'),
				href: downloadLinks.windows,
				recommended: platform === 'windows',
				Icon: osIcons.windows,
			},
			{
				key: 'linux',
				label: t('download.linux'),
				note: t('download.linuxNote'),
				href: downloadLinks.linux,
				recommended: platform === 'linux',
				Icon: osIcons.linux,
			},
		],
		[platform, t],
	)

	return (
		<section
			id='download'
			className={`relative z-[1] mt-8 md:mt-10 p-6 md:p-10 ${homePanelClass} text-center scroll-mt-28 md:scroll-mt-32`}>
			<div className='max-w-2xl mx-auto mb-8'>
				<h2 className='text-2xl md:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-foreground'>
					{t('download.title')}
				</h2>
				<p className='mt-3.5 text-muted-foreground text-sm md:text-base'>
					{t('download.description')}
				</p>
			</div>

			<div className='grid gap-6 sm:grid-cols-2 text-left'>
				{osLinks.map((item) => (
					<article
						key={item.key}
						className={`relative overflow-hidden rounded-3xl border p-6 transition-all ${item.recommended ? 'border-primary/50 bg-primary/10 shadow-xl md:scale-105 z-10' : 'border-border bg-card/50 hover:border-ring/30'}`}>
						{item.recommended && (
							<div className='absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-xl'>
								{t('download.recommended')}
							</div>
						)}
						<div className='flex items-center gap-4 mb-4 mt-2 md:mt-0'>
							<span
								className={`${iconBadgeClass} bg-background`}>
								<item.Icon className='h-[20px] w-[20px]' />
							</span>
							<strong className='text-xl text-foreground'>
								{item.label}
							</strong>
						</div>
						<p className='mb-6 text-sm text-muted-foreground h-10'>
							{item.note}
						</p>
						<Link
							className={`w-full ${item.recommended ? primaryButtonClass : secondaryButtonClass}`}
							href={item.href}>
							{t('download.downloadNow')}
						</Link>
					</article>
				))}
			</div>

			<div className='mt-8 pt-8 border-t border-border flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground'>
				<Link
					className='font-semibold hover:text-foreground transition-colors'
					href={downloadLinks.latest}>
					{t('download.viewInstallers')} &rarr;
				</Link>
			</div>
		</section>
	)
}
