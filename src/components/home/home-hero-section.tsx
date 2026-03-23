'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { downloadLinks } from '@/lib/downloads'
import { useLang } from '@/lib/use-lang'
import { usePlatform } from '@/lib/use-platform'
import { BoltIcon, ShieldIcon } from 'lucide-react'

import { osIcons, primaryButtonClass } from './shared'
import { DownloadItem } from './types'

export function HomeHeroSection() {
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

        const preferred = osLinks.find((item) => item.recommended)
        const primaryDownload = {
                label: preferred?.label ?? t('download.autoFallback'),
                href: preferred?.href ?? downloadLinks.latest,
        }
        const downloadHint =
                preferred ? t('download.autoCta') : t('download.availabilityNote')

        return (
                <section className='relative z-[1] mt-10 md:mt-20 flex flex-col items-center justify-center text-center px-4'>
                        <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 mb-6'>
                                <span className='flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse'></span>
                                <p className='font-mono text-xs font-semibold tracking-widest text-primary'>
                                        {t('hero.badge')}
                                </p>
                        </div>

                        <h1 className='max-w-4xl text-3xl font-extrabold leading-[1.15] md:text-5xl 2xl:text-6xl tracking-tight text-foreground'>
                                {t('hero.title')}
                        </h1>
                        <p className='mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed'>
                                {t('hero.description')}
                        </p>

                        <div className='mt-8 flex flex-col sm:flex-row items-center gap-4'>
                                <Link
                                        className={`${primaryButtonClass} w-full sm:w-auto px-8 h-12`}
                                        href={primaryDownload.href}>
                                        <BoltIcon className='w-5 h-5 mr-2' />
                                        {primaryDownload.label}
                                </Link>
                                <a
                                        className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors underline-offset-8 hover:underline ml-0 sm:ml-4'
                                        href='#demo'>
                                        {t('hero.noLoginDemo')}
                                </a>
                        </div>
                        <p className='mt-6 text-xs text-muted-foreground/80 flex items-center'>
                                <ShieldIcon className='w-4 h-4 mr-1 opacity-50' />
                                {downloadHint}
                        </p>
                </section>
        )
}