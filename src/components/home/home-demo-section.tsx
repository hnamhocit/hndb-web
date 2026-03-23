'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

import { useLang } from '@/lib/use-lang'

import { homePanelClass } from './shared'

const demoSlides = [
	{
		image: '/resources/demo-1.png',
		titleVi: 'Giao diện chính & Bảng điều khiển',
		titleEn: 'Main Interface & Dashboard',
		descVi: 'Tổng quan không gian làm việc tối giản, hiển thị các thông tin quan trọng nhất của cơ sở dữ liệu ngay khi khởi động.',
		descEn: 'Minimalist workspace overview, showing the most critical database metrics right upon startup.',
	},
	{
		image: '/resources/demo-7.png',
		titleVi: 'Trình quản lý kết nối',
		titleEn: 'Connection Manager',
		descVi: 'Lưu trữ và tổ chức các Server an toàn, thao tác kết nối nhanh chóng với một cú nhấp chuột.',
		descEn: 'Organize and securely store your servers. Connect quickly with a single click.',
	},
	{
		image: '/resources/demo-5.png',
		titleVi: 'Trình soạn thảo Query (Editor)',
		titleEn: 'Query Editor',
		descVi: 'Trang bị tính năng gợi ý cú pháp thông minh (IntelliSense) và format code tự động.',
		descEn: 'Equipped with smart syntax completion (IntelliSense) and automatic code formatting.',
	},
	{
		image: '/resources/demo-2.png',
		titleVi: 'Trình xem dữ liệu (Data Viewer)',
		titleEn: 'Data Viewer',
		descVi: 'Grid hiển thị dữ liệu mạnh mẽ, cho phép lọc, tìm kiếm và chỉnh sửa trực tiếp giống như Excel.',
		descEn: 'Powerful data grid allowing instant filtering, searching, and inline editing like Excel.',
	},
	{
		image: '/resources/demo-3.png',
		titleVi: 'Thiết kế cấu trúc Schema',
		titleEn: 'Schema Designer',
		descVi: 'Khám phá và chỉnh sửa cấu trúc các bảng, khóa ngoại (Foreign Keys), và Index một cách trực quan.',
		descEn: 'Visually explore and edit table structures, foreign keys, and indexes.',
	},
	{
		image: '/resources/demo-6.png',
		titleVi: 'Nhật ký thực thi (Query History)',
		titleEn: 'Query History',
		descVi: 'Theo dõi và phân tích các truy vấn đã thực thi để tối ưu hiệu suất.',
		descEn: 'Track and analyze executed queries to optimize performance.',
	},
	{
		image: '/resources/demo-4.png',
		titleVi: 'Sơ đồ ER (ER Diagram)',
		titleEn: 'ER Diagram',
		descVi: 'Tự động tạo sơ đồ ER từ cơ sở dữ liệu hiện có để hiểu rõ hơn về mối quan hệ giữa các bảng.',
		descEn: 'Automatically generate ER diagrams from your existing database to better understand table relationships.',
	},
	{
		image: '/resources/demo-8.png',
		titleVi: 'Phân tích Execution Plan',
		titleEn: 'Execution Plan Analysis',
		descVi: 'Tìm ra các đoạn mã gây nghẽn cổ chai với biểu đồ phân tích thực thi truy vấn chi tiết.',
		descEn: 'Find bottlenecks with a detailed query execution plan analysis chart.',
	},
	{
		image: '/resources/demo-9.png',
		titleVi: 'Cài đặt tùy chỉnh & Theme',
		titleEn: 'Settings & Theming',
		descVi: 'Cá nhân hóa mọi thứ: Từ màu sắc, phông chữ đến các phím tắt theo ý thích để làm việc năng suất nhất.',
		descEn: 'Personalize everything: from colors and fonts to custom shortcuts for maximum productivity.',
	},
]

export function HomeDemoSection() {
	const { t, lang } = useLang()
	const [currentIndex, setCurrentIndex] = useState(0)

	const handleNext = () => {
		setCurrentIndex((prev) =>
			prev === demoSlides.length - 1 ? 0 : prev + 1,
		)
	}

	const handlePrev = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? demoSlides.length - 1 : prev - 1,
		)
	}

	return (
		<section
			id='demo'
			className={`relative z-[1] mt-8 md:mt-12 p-6 md:p-12 ${homePanelClass} scroll-mt-28 md:scroll-mt-32`}>
			<div className='text-center max-w-2xl mx-auto mb-10'>
				<p className='font-mono text-xs font-bold tracking-widest text-primary mb-3 uppercase'>
					{t('demo.badge')}
				</p>
				<h2 className='text-3xl md:text-4xl font-extrabold tracking-tight text-foreground'>
					{t('demo.title')}
				</h2>
				<p className='mt-4 text-muted-foreground text-base md:text-lg'>
					{t('demo.description')}
				</p>
			</div>

			{/* Desktop Mockup Section */}
			<div className='max-w-4xl mx-auto relative'>
				<button
					onClick={handlePrev}
					className='absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-10 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg hover:scale-110 transition-transform'>
					<ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
				</button>

				<button
					onClick={handleNext}
					className='absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 z-10 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg hover:scale-110 transition-transform'>
					<ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
				</button>

				{/* Mockup Frame */}
				<div className='relative mx-auto border-gray-900 dark:border-gray-800 bg-gray-900 dark:bg-gray-800 border-[6px] rounded-t-2xl md:border-[16px] md:rounded-t-3xl shadow-2xl overflow-hidden aspect-[16/10] w-full max-w-[1000px]'>
					<div className='relative h-full w-full bg-background overflow-hidden flex items-center justify-center'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 1.02 }}
								transition={{
									duration: 0.4,
									ease: 'easeInOut',
								}}
								className='absolute inset-0'>
								<Image
									src={demoSlides[currentIndex].image}
									alt={`Demo Screen ${currentIndex + 1}`}
									fill
									className='object-cover bg-left'
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
				{/* Mockup Stand/Base */}
				<div className='relative mx-auto bg-gray-800 dark:bg-gray-700/80 rounded-b-xl h-[12px] w-[90%] md:h-[24px]'>
					<div className='absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg w-[30%] h-[4px] md:h-[8px] bg-gray-950 dark:bg-gray-900'></div>
				</div>

				{/* Slide Content Description */}
				<div className='mt-8 max-w-2xl mx-auto text-center px-4 min-h-[100px]'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={`text-${currentIndex}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}>
							<h3 className='text-xl md:text-2xl font-bold text-foreground mb-3'>
								{lang === 'vi' ?
									demoSlides[currentIndex].titleVi
								:	demoSlides[currentIndex].titleEn}
							</h3>
							<p className='text-muted-foreground text-sm md:text-base'>
								{lang === 'vi' ?
									demoSlides[currentIndex].descVi
								:	demoSlides[currentIndex].descEn}
							</p>
						</motion.div>
					</AnimatePresence>

					{/* Pagination Dots */}
					<div className='flex justify-center gap-2 mt-6'>
						{demoSlides.map((_, idx) => (
							<button
								key={idx}
								onClick={() => setCurrentIndex(idx)}
								className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/50'}`}
								aria-label={`Go to slide ${idx + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
