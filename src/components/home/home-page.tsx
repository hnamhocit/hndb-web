'use client'

import { useEffect } from 'react'

import { motion } from 'motion/react'

import { HomeCustomizationSection } from './home-customization-section'
import { HomeCustomersSection } from './home-customers-section'
import { HomeDemoSection } from './home-demo-section'
import { HomeDownloadSection } from './home-download-section'
import { HomeFeaturesSection } from './home-features-section'
import { HomeFooter } from './home-footer'
import { HomeHeroSection } from './home-hero-section'
import { HomeMetricsSection } from './home-metrics-section'
import { HomeReviewsSection } from './home-reviews-section'
import { HomeSectionNav } from './home-section-nav'
import { HomeSponsorsSection } from './home-sponsors-section'

const reveal = {
	initial: { opacity: 0, y: 22 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
}

export default function HomePage() {
	useEffect(() => {
		if (typeof window === 'undefined' || !window.location.hash) return

		const id = window.location.hash.replace('#', '')
		if (!id) return

		requestAnimationFrame(() => {
			document.getElementById(id)?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		})
	}, [])

	return (
		<motion.main
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			className='relative mx-auto w-full max-w-[1120px] overflow-hidden px-4 pb-20 pt-5 md:px-7 xl:max-w-[1240px] xl:px-10'>
			<div className='relative z-[1]'>
				<section
					id='overview'
					className='scroll-mt-28 md:scroll-mt-32'>
					<motion.div {...reveal}>
						<HomeHeroSection />
					</motion.div>
				</section>

				<HomeSectionNav variant='mobile' />

				<section
					id='backers'
					className='scroll-mt-28 md:scroll-mt-32'>
					<motion.div {...reveal}>
						<HomeSponsorsSection />
					</motion.div>
				</section>

				<section
					id='stats'
					className='scroll-mt-28 md:scroll-mt-32'>
					<motion.div {...reveal}>
						<HomeMetricsSection />
					</motion.div>
				</section>

				<motion.div {...reveal}>
					<HomeFeaturesSection />
				</motion.div>

				<motion.div {...reveal}>
					<HomeCustomizationSection />
				</motion.div>

				<section
					id='customers'
					className='scroll-mt-28 md:scroll-mt-32'>
					<motion.div {...reveal}>
						<HomeCustomersSection />
					</motion.div>
				</section>

				<section
					id='reviews'
					className='scroll-mt-28 md:scroll-mt-32'>
					<motion.div {...reveal}>
						<HomeReviewsSection />
					</motion.div>
				</section>

				<motion.div {...reveal}>
					<HomeDemoSection />
				</motion.div>

				<motion.div {...reveal}>
					<HomeDownloadSection />
				</motion.div>

				<motion.div {...reveal}>
					<HomeFooter />
				</motion.div>
			</div>

			<div className='pointer-events-none fixed left-4 top-32 z-[45] hidden min-[1680px]:block md:left-8 xl:left-16'>
				<HomeSectionNav variant='desktop' />
			</div>
		</motion.main>
	)
}
