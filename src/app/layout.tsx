import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { AppHeader } from '@/components/app-header'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const themeInitScript = `
(() => {
	try {
		const storedTheme = localStorage.getItem('hndb_theme')
		const theme = storedTheme === 'dark' ? 'dark' : 'light'
		const root = document.documentElement
		root.classList.toggle('dark', theme === 'dark')
		root.style.colorScheme = theme
	} catch {
		document.documentElement.classList.remove('dark')
		document.documentElement.style.colorScheme = 'light'
	}
})()
`

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'HNDB',
		template: '%s | HNDB',
	},
	description:
		'A knowledge graph database management system built on top of PostgreSQL, designed to help you manage and query your data with ease.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{ __html: themeInitScript }}
				/>
			</head>
			<body
				className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>
				<AppHeader />
				{children}
				<ScrollToTopButton />
			</body>
		</html>
	)
}
