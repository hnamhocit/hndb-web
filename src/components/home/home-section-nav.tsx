'use client'

import {
	FocusEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import { useLang } from '@/lib/use-lang'

const homeSectionConfig = [
	{ id: 'overview', labelKey: 'homeToc.overview' },
	{ id: 'backers', labelKey: 'homeToc.backers' },
	{ id: 'stats', labelKey: 'homeToc.stats' },
	{ id: 'features', labelKey: 'homeToc.features' },
	{ id: 'customization', labelKey: 'homeToc.customization' },
	{ id: 'customers', labelKey: 'homeToc.customers' },
	{ id: 'reviews', labelKey: 'homeToc.reviews' },
	{ id: 'demo', labelKey: 'homeToc.demo' },
	{ id: 'download', labelKey: 'homeToc.download' },
] as const

type HomeSectionId = (typeof homeSectionConfig)[number]['id']

const desktopHideDelay = 3000
const desktopHiddenTransform = '-translate-x-[20rem]'
const desktopNavCardClass =
	'rounded-3xl border border-border/80 bg-background/95 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.12)] supports-[backdrop-filter]:bg-background/88'

export function HomeSectionNav({
	variant,
}: {
	variant: 'desktop' | 'mobile'
}) {
	const { t } = useLang()
	const [activeId, setActiveId] = useState<HomeSectionId>(
		homeSectionConfig[0].id,
	)
	const [isDesktopVisible, setIsDesktopVisible] = useState(true)
	const hideTimerRef = useRef<number | null>(null)

	const sections = useMemo(
		() =>
			homeSectionConfig.map((section) => ({
				...section,
				label: t(section.labelKey),
			})),
		[t],
	)

	useEffect(() => {
		const updateFromHash = () => {
			const nextId = window.location.hash.replace('#', '')
			if (!nextId) return
			if (homeSectionConfig.some((section) => section.id === nextId)) {
				setActiveId(nextId as HomeSectionId)
			}
		}

		updateFromHash()

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntry = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

				if (visibleEntry?.target.id) {
					setActiveId(visibleEntry.target.id as HomeSectionId)
				}
			},
			{
				rootMargin: '-18% 0px -62% 0px',
				threshold: [0.15, 0.35, 0.6],
			},
		)

		for (const section of homeSectionConfig) {
			const element = document.getElementById(section.id)
			if (element) observer.observe(element)
		}

		window.addEventListener('hashchange', updateFromHash)

		return () => {
			window.removeEventListener('hashchange', updateFromHash)
			observer.disconnect()
		}
	}, [])

	const handleJump = (
		event: MouseEvent<HTMLAnchorElement>,
		id: HomeSectionId,
	) => {
		event.preventDefault()

		const target = document.getElementById(id)
		if (!target) return

		target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		window.history.replaceState(null, '', `/#${id}`)
		setActiveId(id)
	}

	const clearHideTimer = useCallback(() => {
		if (hideTimerRef.current === null) return
		window.clearTimeout(hideTimerRef.current)
		hideTimerRef.current = null
	}, [])

	const scheduleHide = useCallback(() => {
		if (variant !== 'desktop') return
		clearHideTimer()
		hideTimerRef.current = window.setTimeout(() => {
			setIsDesktopVisible(false)
		}, desktopHideDelay)
	}, [clearHideTimer, variant])

	useEffect(() => {
		if (variant !== 'desktop') return

		scheduleHide()

		return clearHideTimer
	}, [clearHideTimer, scheduleHide, variant])

	const handleDesktopEnter = () => {
		if (variant !== 'desktop') return
		setIsDesktopVisible(true)
		clearHideTimer()
	}

	const handleDesktopLeave = () => {
		if (variant !== 'desktop') return
		scheduleHide()
	}

	const handleDesktopBlur = (event: FocusEvent<HTMLDivElement>) => {
		if (variant !== 'desktop') return
		if (event.currentTarget.contains(event.relatedTarget)) return
		scheduleHide()
	}

	if (variant === 'mobile') {
		return (
			<div className='sticky top-32 z-40 mb-8 rounded-[1.5rem] border border-border bg-background/80 p-3 shadow-sm backdrop-blur-xl md:top-24 lg:hidden'>
				<div className='overflow-x-auto pb-1'>
					<nav
						aria-label={t('homeToc.title')}
						className='flex min-w-max gap-2'>
						{sections.map((section) => {
							const active = section.id === activeId
							return (
								<a
									key={section.id}
									href={`/#${section.id}`}
									onClick={(event) =>
										handleJump(event, section.id)
									}
									className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all ${active ? 'border-primary/30 bg-primary text-primary-foreground shadow-sm' : 'border-border bg-background/80 text-muted-foreground hover:border-primary/20 hover:text-foreground'}`}>
									{section.label}
								</a>
							)
						})}
					</nav>
				</div>
			</div>
		)
	}

	return (
		<aside className='pointer-events-none relative w-72'>
			<div
				aria-hidden='true'
				onMouseEnter={handleDesktopEnter}
				onMouseLeave={handleDesktopLeave}
				className='pointer-events-auto absolute inset-y-0 left-0 z-10 w-8'
			/>

			<div
				onMouseEnter={handleDesktopEnter}
				onMouseLeave={handleDesktopLeave}
				onFocusCapture={handleDesktopEnter}
				onBlurCapture={handleDesktopBlur}
				className={`pointer-events-auto relative w-72 transform-gpu [contain:layout_paint_style] will-change-transform motion-reduce:transition-none transition-transform duration-200 ease-out ${isDesktopVisible ? 'translate-x-0' : desktopHiddenTransform}`}>
				<div className={desktopNavCardClass}>
					<p className='font-mono text-[11px] font-bold tracking-[0.28em] text-primary uppercase'>
						{t('homeToc.badge')}
					</p>
					<h2 className='mt-3 text-lg font-bold tracking-tight text-foreground'>
						{t('homeToc.title')}
					</h2>
					<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
						{t('homeToc.description')}
					</p>

					<nav
						aria-label={t('homeToc.title')}
						className='mt-6 flex flex-col gap-2'>
						{sections.map((section, index) => {
							const active = section.id === activeId
							return (
								<a
									key={section.id}
									href={`/#${section.id}`}
									onClick={(event) =>
										handleJump(event, section.id)
									}
									className={`group flex items-center justify-between rounded-2xl border px-3 py-3 duration-150 ${active ? 'border-primary/30 bg-primary/10 text-foreground shadow-sm' : 'border-transparent bg-transparent text-muted-foreground transition-colors hover:border-border hover:bg-background/70 hover:text-foreground'}`}>
									<span className='text-sm font-medium'>
										{section.label}
									</span>
									<span
										className={`font-mono text-[11px] ${active ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-primary'}`}>
										{String(index + 1).padStart(2, '0')}
									</span>
								</a>
							)
						})}
					</nav>
				</div>
			</div>
		</aside>
	)
}
