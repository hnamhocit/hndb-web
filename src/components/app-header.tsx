'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent } from 'react'

import { ThemeToggle } from '@/components/theme-toggle'
import { useLang } from '@/lib/use-lang'
import { siteLinks } from '@/lib/site-links'

interface NavItem {
	key:
	| 'home'
	| 'blog'
	| 'issues'
	| 'about'
	| 'featureRequest'
	href: string
	mode: 'external' | 'path'
}

const navItems: NavItem[] = [
	{ key: 'home', href: '/', mode: 'path' },
	{ key: 'blog', href: siteLinks.blog, mode: 'path' },
	{ key: 'issues', href: siteLinks.issues, mode: 'external' },
	{ key: 'about', href: siteLinks.about, mode: 'path' },
	{
		key: 'featureRequest',
		href: siteLinks.featureRequest,
		mode: 'external',
	},
]

function LangSwitcher({
	lang,
	setLang,
}: {
	lang: 'vi' | 'en'
	setLang: (lang: 'vi' | 'en') => void
}) {
	return (
		<div
			role='group'
			aria-label='Language switch'
			className='inline-flex rounded-full border border-border bg-muted/50 p-1 font-semibold text-xs'>
			<button
				type='button'
				onClick={() => setLang('vi')}
				className={`h-7 min-w-9 rounded-full px-2 md:px-3 transition-all ${lang === 'vi' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
				VI
			</button>
			<button
				type='button'
				onClick={() => setLang('en')}
				className={`h-7 min-w-9 rounded-full px-2 md:px-3 transition-all ${lang === 'en' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
				EN
			</button>
		</div>
	)
}

export function AppHeader() {
	const pathname = usePathname()
	const { lang, setLang, t } = useLang()

	const handleNavClick = (
		event: MouseEvent<HTMLAnchorElement>,
		item: NavItem,
	) => {
		if (item.key !== 'home' || pathname !== '/') return

		event.preventDefault()
		window.scrollTo({ top: 0, behavior: 'smooth' })

		if (window.location.hash) {
			window.history.replaceState(null, '', '/')
		}
	}

	const isActive = (item: NavItem) => {
		if (item.mode !== 'path') return false
		if (item.href === '/') return pathname === '/'
		return pathname === item.href || pathname.startsWith(`${item.href}/`)
	}

	return (
		<div className='mx-auto w-full max-w-[1120px] px-4 pt-5 md:px-7 xl:max-w-[1240px] xl:px-10'>
			<header className='sticky top-4 z-50 flex flex-col md:flex-row items-center justify-between gap-3 rounded-[2rem] md:rounded-full border border-border bg-background/70 px-4 py-2.5 backdrop-blur-xl shadow-sm transition-all'>
				<div className='flex w-full md:w-auto items-center justify-between'>
					<Link
						className='inline-flex items-center gap-3 font-bold tracking-wider'
						href='/'>
						<Image
							src='/logo.png'
							alt='HNDB'
							width={24}
							height={24}
							className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg'
						/>
						<span className='text-foreground'>{t('brand')}</span>
					</Link>
					<div className='flex md:hidden items-center gap-2'>
						<ThemeToggle />
						<LangSwitcher
							lang={lang}
							setLang={setLang}
						/>
					</div>
				</div>

				<nav className='flex w-full overflow-x-auto pb-1 md:pb-0 md:w-auto md:flex-wrap gap-x-6 gap-y-2 text-sm font-medium whitespace-nowrap scrollbar-hide'>
					{navItems.map((item) => {
						const active = isActive(item)
						const className = `transition-colors ${active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`

						if (item.mode === 'external') {
							return (
								<a
									key={item.key}
									href={item.href}
									target='_blank'
									rel='noreferrer'
									className={className}>
									{t(`nav.${item.key}`)}
								</a>
							)
						}

						return (
							<Link
								key={item.key}
								href={item.href}
								onClick={(event) => handleNavClick(event, item)}
								aria-current={active ? 'page' : undefined}
								className={className}>
								{t(`nav.${item.key}`)}
							</Link>
						)
					})}
				</nav>

				<div className='hidden md:flex items-center gap-3'>
					<ThemeToggle />
					<LangSwitcher
						lang={lang}
						setLang={setLang}
					/>
				</div>
			</header>
		</div>
	)
}
