'use client'

import { useMemo } from 'react'

import { motion } from 'motion/react'
import {
	ArrowUpRight,
	Globe,
	Lightbulb,
	Mail,
	MessageSquareMore,
	Rocket,
	Zap,
} from 'lucide-react'

import {
	homePanelClass,
	iconBadgeClass,
	primaryButtonClass,
	secondaryButtonClass,
} from '@/components/home/shared'
import { repoUrl, siteLinks } from '@/lib/site-links'
import { useLang } from '@/lib/use-lang'

const reveal = {
	initial: { opacity: 0, y: 18 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
}

export default function AboutPage() {
	const { t } = useLang()

	const principles = useMemo(
		() => [
			{
				title: t('about.value1Title'),
				text: t('about.value1Text'),
				Icon: Zap,
			},
			{
				title: t('about.value2Title'),
				text: t('about.value2Text'),
				Icon: Lightbulb,
			},
			{
				title: t('about.value3Title'),
				text: t('about.value3Text'),
				Icon: MessageSquareMore,
			},
		],
		[t],
	)

	const links = useMemo(
		() => [
			{
				label: t('about.linkWebsite'),
				href: siteLinks.website,
				Icon: Globe,
			},
			{
				label: t('about.linkRepo'),
				href: repoUrl,
				Icon: ArrowUpRight,
			},
			{
				label: t('about.linkDocs'),
				href: siteLinks.docs,
				Icon: Rocket,
			},
			{
				label: t('about.linkEmail'),
				href: siteLinks.email,
				Icon: Mail,
			},
		],
		[t],
	)

	return (
		<motion.main
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			className='relative min-h-screen w-full overflow-hidden px-4 pb-24 pt-8 md:px-8 xl:px-16'>
			<div className='relative z-[1] mx-auto max-w-6xl'>
				<motion.section
					{...reveal}
					className='grid gap-6 lg:grid-cols-[1.3fr_0.7fr]'>
					<div className={`p-8 md:p-12 ${homePanelClass}`}>
						<p className='font-mono text-xs font-bold tracking-[0.28em] text-primary uppercase'>
							{t('about.badge')}
						</p>
						<h1 className='mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl'>
							{t('about.title')}
						</h1>
						<p className='mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
							{t('about.description')}
						</p>

						<div className='mt-8 flex flex-wrap gap-3'>
							<a
								href={siteLinks.issues}
								target='_blank'
								rel='noreferrer'
								className={primaryButtonClass}>
								{t('about.ctaIssues')}
							</a>
							<a
								href={siteLinks.featureRequest}
								target='_blank'
								rel='noreferrer'
								className={secondaryButtonClass}>
								{t('about.ctaFeature')}
							</a>
						</div>
					</div>

					<div className={`p-6 md:p-8 ${homePanelClass}`}>
						<h2 className='text-xl font-bold tracking-tight text-foreground'>
							{t('about.introTitle')}
						</h2>
						<p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
							{t('about.introBody')}
						</p>

						<div className='mt-8 border-t border-border pt-6'>
							<h3 className='text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
								{t('about.linksTitle')}
							</h3>
							<div className='mt-4 flex flex-col gap-3'>
								{links.map((link) => (
									<a
										key={link.label}
										href={link.href}
										target='_blank'
										rel='noreferrer'
										className='group flex items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/20 hover:bg-background'>
										<span>{link.label}</span>
										<link.Icon className='h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary' />
									</a>
								))}
							</div>
						</div>
					</div>
				</motion.section>

				<motion.section
					{...reveal}
					className='mt-8'>
					<div className='max-w-2xl'>
						<p className='font-mono text-xs font-bold tracking-[0.24em] text-primary uppercase'>
							{t('about.valuesTitle')}
						</p>
					</div>

					<div className='mt-6 grid gap-4 md:grid-cols-3'>
						{principles.map((principle) => (
							<article
								key={principle.title}
								className={`p-6 ${homePanelClass}`}>
								<span className={iconBadgeClass}>
									<principle.Icon className='h-5 w-5' />
								</span>
								<h3 className='mt-5 text-xl font-bold tracking-tight text-foreground'>
									{principle.title}
								</h3>
								<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
									{principle.text}
								</p>
							</article>
						))}
					</div>
				</motion.section>

				<motion.section
					{...reveal}
					className={`mt-8 flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between ${homePanelClass}`}>
					<div className='max-w-2xl'>
						<h2 className='text-2xl font-bold tracking-tight text-foreground'>
							{t('about.ctaTitle')}
						</h2>
						<p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
							{t('about.ctaDescription')}
						</p>
					</div>

					<div className='flex flex-wrap gap-3'>
						<a
							href={siteLinks.issues}
							target='_blank'
							rel='noreferrer'
							className={secondaryButtonClass}>
							{t('about.ctaIssues')}
						</a>
						<a
							href={siteLinks.featureRequest}
							target='_blank'
							rel='noreferrer'
							className={primaryButtonClass}>
							{t('about.ctaFeature')}
						</a>
					</div>
				</motion.section>
			</div>
		</motion.main>
	)
}
