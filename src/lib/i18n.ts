export type Lang = 'vi' | 'en'

interface MessageTree {
	[key: string]: string | MessageTree
}

export const defaultLang: Lang = 'vi'

export const messages: Record<Lang, MessageTree> = {
	vi: {
		brand: 'HNDB',
		nav: {
			home: 'Trang chủ',
			features: 'Tính năng',
			customization: 'Tùy chỉnh',
			demo: 'Giao diện',
			download: 'Tải app',
			blog: 'Blog',
			issues: 'Báo lỗi',
			about: 'Về mình',
			featureRequest: 'Yêu cầu tính năng',
		},
		homeToc: {
			badge: 'Điều hướng nhanh',
			title: 'Mục lục trang Home',
			description:
				'Nhảy nhanh tới từng phần nội dung mà không cần kéo tìm thủ công.',
			overview: 'Tổng quan',
			backers: 'Hậu thuẫn',
			stats: 'Điểm nhấn',
			features: 'Tính năng',
			customization: 'Tùy chỉnh',
			customers: 'Được tin dùng',
			reviews: 'Đánh giá',
			demo: 'Demo',
			download: 'Tải app',
		},
		hero: {
			badge: 'HNDB • MODERN RDBMS CLIENT',
			title: 'Desktop SQL Client tối giản. Tập trung vào trải nghiệm của bạn.',
			description:
				'Không cồng kềnh, không tính năng thừa. HNDB mang lại trải nghiệm truy vấn cơ sở dữ liệu siêu tốc với giao diện gọn gàng và khả năng tùy biến thông số sâu sắc.',
			noLoginDemo: 'Xem giao diện demo',
		},
		stats: {
			firstLabel: '< 50ms',
			firstText:
				'Độ trễ phản hồi giao diện, đảm bảo trải nghiệm gõ code mượt mà',
			secondLabel: '100%',
			secondText:
				'Quyền kiểm soát thuộc về bạn với hàng tá thông số tùy chỉnh',
			thirdLabel: 'Native',
			thirdText:
				'Tối ưu hóa tài nguyên phần cứng, không ngốn RAM như Electron',
		},
		features: {
			title1: 'Giao diện tối giản',
			text1: 'Bỏ đi các thanh menu rườm rà. Chỉ hiển thị những gì bạn thực sự cần để tập trung vào việc viết Query.',
			title2: 'Khả năng tùy chỉnh sâu',
			text2: 'Từ Editor, Theme, Keybindings cho đến Fetch Size và Connection Timeout, mọi thứ đều có thể tinh chỉnh.',
			title3: 'Trình quản lý kết nối thông minh',
			text3: 'Quản lý nhiều RDBMS dễ dàng, hỗ trợ kết nối qua SSH Tunnel và SSL với cấu hình chi tiết.',
		},
		customization: {
			badge: 'TÙY BIẾN KHÔNG GIỚI HẠN',
			title: 'Kiểm soát mọi thông số',
			description:
				'HNDB được thiết kế để phục vụ thói quen của riêng bạn, chứ không bắt bạn phải làm quen với nó.',
			item1Title: 'SQL Editor',
			item1Text:
				'Tùy chỉnh Font chữ, Ligatures, Auto-completion, và Snippets cá nhân hóa.',
			item2Title: 'Data Grid',
			item2Text:
				'Thiết lập định dạng hiển thị cho từng kiểu dữ liệu, giới hạn số dòng (Limit/Offset) mặc định.',
			item3Title: 'Themes & Layout',
			item3Text:
				'Chuyển đổi linh hoạt giữa Light/Dark mode, tùy chỉnh màu sắc syntax và vị trí các panel.',
			item4Title: 'Advanced Parameters',
			item4Text:
				'Can thiệp sâu vào Driver Properties, Transaction isolation level và Keep-alive interval.',
		},
		demo: {
			badge: 'GIAO DIỆN THỰC TẾ',
			title: 'Đẹp mắt và Dễ nhìn',
			description:
				'Thiết kế chuẩn mực giúp mắt bạn không bị mỏi khi phải làm việc với dữ liệu trong nhiều giờ liền.',
		},
		download: {
			title: 'Trải nghiệm HNDB ngay hôm nay',
			description:
				'Nhẹ, nhanh và cài đặt chỉ trong vài giây. Chọn phiên bản phù hợp với hệ điều hành của bạn.',
			recommended: 'Khuyên dùng cho thiết bị của bạn',
			latest: 'Xem tất cả phiên bản',
			windows: 'Windows',
			macos: 'macOS',
			linux: 'Linux',
			windowsNote: 'Bản cài đặt .msi (x64 / ARM64)',
			macosNote: 'Bản cài đặt .dmg (Apple Silicon & Intel)',
			linuxNote: 'AppImage / .deb / .rpm',
			autoCta:
				'Đã tự động chọn phiên bản phù hợp nhất với máy tính của bạn.',
			availabilityNote: 'Hiện tại HNDB mới có bản cho Windows và Linux.',
			autoFallback: 'Tải bản mới nhất',
			viewInstallers: 'Tùy chọn tải xuống khác',
			downloadNow: 'Tải ngay',
		},
		about: {
			badge: 'ABOUT ME',
			title: 'Mình đang xây HNDB theo hướng gọn, nhanh và thực dụng.',
			description:
				'Một SQL client tập trung vào trải nghiệm dùng hằng ngày: ít nhiễu, phản hồi nhanh và đủ linh hoạt cho workflow riêng của bạn.',
			introTitle: 'Điều mình đang làm',
			introBody:
				'HNDB được phát triển để việc làm việc với database bớt nặng nề hơn. Mình ưu tiên hiệu năng, sự rõ ràng trong giao diện và khả năng tùy biến sâu cho những ai sống cùng query mỗi ngày.',
			valuesTitle: 'Ba nguyên tắc cốt lõi',
			value1Title: 'Nhanh trước',
			value1Text:
				'Tương tác phải nhẹ, phản hồi sớm và không cản nhịp làm việc.',
			value2Title: 'Gọn nhưng không nông',
			value2Text:
				'Bớt menu thừa, giữ lại đúng những chỗ cần sức mạnh và khả năng kiểm soát.',
			value3Title: 'Build cùng người dùng',
			value3Text:
				'Bug report và feature request là đầu vào trực tiếp cho thứ tự ưu tiên của sản phẩm.',
			linksTitle: 'Liên kết',
			linkWebsite: 'Website cá nhân',
			linkRepo: 'Source code',
			linkDocs: 'Tài liệu',
			linkEmail: 'Email',
			ctaTitle: 'Muốn góp ý hoặc theo dõi tiến độ?',
			ctaDescription:
				'Mở issue khi bạn gặp lỗi, hoặc gửi feature request nếu có workflow bạn muốn HNDB hỗ trợ tốt hơn.',
			ctaIssues: 'Xem issues',
			ctaFeature: 'Gửi feature request',
		},
		footer: {
			tagline:
				'A fast, highly customizable database client for modern developers.',
			help: 'Tài liệu hướng dẫn',
			support: 'Báo lỗi & Góp ý',
			contact: 'Liên hệ',
			legal: 'Quyền riêng tư',
			rights: 'All rights reserved.',
		},
		authCallback: {
			badge: 'AUTH CALLBACK',
			title: 'Xác thực thành công',
			description:
				'Web đang chuyển bạn về ứng dụng HNDB để hoàn tất đăng nhập.',
			autoAttempt: 'Đang thử mở ứng dụng tự động...',
			openApp: 'Mở app thủ công',
			backHome: 'Về trang chủ',
			closeHint: 'Bạn có thể đóng tab trình duyệt này ngay bây giờ.',
		},
		social: {
			sponsors: 'ĐƯỢC HỖ TRỢ BỞI CÁC QUỸ HÀNG ĐẦU',
			customers: 'Tin dùng bởi các engineering team tại',
			reviewsBadge: 'WALL OF LOVE',
			reviewsTitle: 'Cộng đồng nói gì về HNDB?',
			reviewsDescription:
				'Đừng chỉ nghe từ chúng tôi. Hãy xem các lập trình viên khác đánh giá thế nào sau khi chuyển sang sử dụng HNDB.',
			review1Text:
				'"Chuyển từ DataGrip sang HNDB là quyết định đúng đắn nhất năm nay của tôi. Nó nhẹ gọn hơn rất nhiều và tốc độ query thì không phải bàn cãi."',
			review1Name: 'Nguyễn Văn A',
			review1Title: 'Senior Backend Engineer',
			review2Text:
				'"Cuối cùng cũng có một SQL Client hiểu ý Developer. Tôi thích cách HNDB cho phép tùy biến mọi thứ bằng phím tắt."',
			review2Name: 'Trần B',
			review2Title: 'Database Administrator',
			review3Text:
				'"Không Electron, không ngốn RAM. Chạy hàng triệu rows mà app vẫn mượt mà. Đội ngũ phát triển đã làm việc rất tuyệt vời!"',
			review3Name: 'Lê Hoàng C',
			review3Title: 'CTO @ TechFlow',
		},
	},
	en: {
		brand: 'HNDB',
		authCallback: {
			badge: 'AUTH CALLBACK',
			title: 'Authentication successful',
			description:
				'We are redirecting you back to the HNDB app to finish sign-in.',
			autoAttempt: 'Trying to open the app automatically...',
			openApp: 'Open app manually',
			backHome: 'Back to home',
			closeHint: 'You can close this browser tab now.',
		},
		nav: {
			home: 'Home',
			features: 'Features',
			customization: 'Customization',
			demo: 'Interface',
			download: 'Download',
			blog: 'Blog',
			issues: 'Issues',
			about: 'About Me',
			featureRequest: 'Feature Request',
		},
		homeToc: {
			badge: 'Quick Nav',
			title: 'On This Page',
			description:
				'Jump between landing sections without hunting through the page.',
			overview: 'Overview',
			backers: 'Backers',
			stats: 'Highlights',
			features: 'Features',
			customization: 'Customization',
			customers: 'Adoption',
			reviews: 'Reviews',
			demo: 'Demo',
			download: 'Download',
		},
		hero: {
			badge: 'HNDB • MODERN RDBMS CLIENT',
			title: 'A minimalist SQL Client. Built for your workflow.',
			description:
				'No bloat, no unnecessary features. HNDB delivers a lightning-fast database querying experience with a clean UI and deep parameter customizability.',
			noLoginDemo: 'View interface demo',
		},
		stats: {
			firstLabel: '< 50ms',
			firstText:
				'UI response latency, ensuring a buttery smooth typing experience.',
			secondLabel: '100%',
			secondText:
				'Control is in your hands with dozens of customizable parameters.',
			thirdLabel: 'Native',
			thirdText:
				'Hardware resource optimized. Say goodbye to memory-hungry clients.',
		},
		features: {
			title1: 'Minimalist Interface',
			text1: 'Stripped away the clunky menus. We only show what you truly need so you can focus on writing queries.',
			title2: 'Deep Customizability',
			text2: 'From the Editor, Themes, and Keybindings to Fetch Size and Connection Timeouts, everything is tweakable.',
			title3: 'Smart Connection Manager',
			text3: 'Manage multiple RDBMS effortlessly, with full support for SSH Tunnels and detailed SSL configurations.',
		},
		customization: {
			badge: 'LIMITLESS TWEAKS',
			title: 'Take control of every parameter',
			description:
				'HNDB is designed to adapt to your specific habits, rather than forcing you to adapt to it.',
			item1Title: 'SQL Editor',
			item1Text:
				'Customize Fonts, Ligatures, Auto-completion behavior, and personal Snippets.',
			item2Title: 'Data Grid',
			item2Text:
				'Set display formats for specific data types and configure default Limit/Offset behaviors.',
			item3Title: 'Themes & Layout',
			item3Text:
				'Switch seamlessly between modes, tweak syntax highlighting colors, and adjust panel placements.',
			item4Title: 'Advanced Parameters',
			item4Text:
				'Deep dive into Driver Properties, Transaction isolation levels, and Keep-alive intervals.',
		},
		demo: {
			badge: 'ACTUAL FOOTAGE',
			title: 'Clean and Easy on the Eyes',
			description:
				'A standard-setting design that reduces eye strain when staring at data arrays for hours on end.',
		},
		download: {
			title: 'Experience HNDB today',
			description:
				'Lightweight, fast, and installs in seconds. Select the version tailored for your OS.',
			recommended: 'Recommended for your device',
			latest: 'View all releases',
			windows: 'Windows',
			macos: 'macOS',
			linux: 'Linux',
			windowsNote: '.msi installer (x64 / ARM64)',
			macosNote: '.dmg installer (Apple Silicon & Intel)',
			linuxNote: 'AppImage / .deb / .rpm',
			autoCta:
				'Automatically selected the best version for your current system.',
			availabilityNote:
				'HNDB is currently available for Windows and Linux only.',
			autoFallback: 'Download latest release',
			viewInstallers: 'Other download options',
			downloadNow: 'Download now',
		},
		about: {
			badge: 'ABOUT ME',
			title: "I'm building HNDB to feel fast, calm, and practical.",
			description:
				'A SQL client focused on everyday usability: less noise, quick feedback, and enough flexibility to match your own workflow.',
			introTitle: "What I'm building",
			introBody:
				'HNDB is being shaped to make database work feel lighter. I care about performance, interface clarity, and deep customization for people who live inside queries every day.',
			valuesTitle: 'Three product principles',
			value1Title: 'Speed first',
			value1Text:
				'Interactions should stay lightweight, responsive, and never interrupt your momentum.',
			value2Title: 'Minimal, not shallow',
			value2Text:
				'Remove the clutter, but keep the control where advanced workflows actually need it.',
			value3Title: 'Built with users',
			value3Text:
				'Bug reports and feature requests directly influence what gets prioritized next.',
			linksTitle: 'Links',
			linkWebsite: 'Personal Website',
			linkRepo: 'Source code',
			linkDocs: 'Documentation',
			linkEmail: 'Email',
			ctaTitle: 'Want to help shape the roadmap?',
			ctaDescription:
				'Open an issue when something breaks, or send a feature request when there is a workflow you want prioritized.',
			ctaIssues: 'Browse issues',
			ctaFeature: 'Send feature request',
		},
		footer: {
			tagline:
				'A fast, highly customizable database client for modern developers.',
			help: 'Documentation',
			support: 'Report an Issue',
			contact: 'Contact Us',
			legal: 'Privacy Policy',
			rights: 'All rights reserved.',
		},

		social: {
			sponsors: 'BACKED BY TOP TIER INVESTORS',
			customers: 'Trusted by engineering teams at',
			reviewsBadge: 'WALL OF LOVE',
			reviewsTitle: 'What developers are saying',
			reviewsDescription:
				"Don't just take our word for it. See how other engineers feel after switching to HNDB.",
			review1Text:
				'"Switching from DataGrip to HNDB was the best decision I made this year. It\'s incredibly lightweight and the query speed is unmatched."',
			review1Name: 'Alex Nguyen',
			review1Title: 'Senior Backend Engineer',
			review2Text:
				'"Finally, an SQL Client that gets it. I absolutely love how HNDB is fully keyboard-driven and highly customizable."',
			review2Name: 'Brian T.',
			review2Title: 'Database Administrator',
			review3Text:
				'"No Electron, no memory leaks. I can fetch millions of rows and the app stays buttery smooth. Incredible work by the team!"',
			review3Name: 'Chris L.',
			review3Title: 'CTO @ TechFlow',
		},
	},
}

export function normalizeLang(value: string | null | undefined): Lang {
	return value === 'en' ? 'en' : 'vi'
}

export function getMessage(lang: Lang, path: string): string {
	const parts = path.split('.')
	let current: string | MessageTree | undefined = messages[lang]

	for (const key of parts) {
		if (typeof current !== 'object' || current === null) {
			return path
		}
		current = current[key]
	}

	return typeof current === 'string' ? current : path
}
