import { clsx } from 'clsx'
import { XIcon } from 'lucide-react'
import { FC } from 'react'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ITab } from '@/interfaces'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { menuItems } from './menuItems'

interface TabProps {
	tab: ITab
	index: number
}

const Tab: FC<TabProps> = (props) => {
	const { tab, index } = props
	const { id, title, type } = tab
	const {
		tabs,
		setTabs,
		queryLength,
		setQueryLength,
		activeTab,
		setActiveTab,
	} = useTabsStore()
	const { setCurrentTable, setCurrentDatabase } = useDataSourcesStore()

	const handleRemoveTab = () => {
		const newTabs = tabs.filter((tab) => tab.id !== id)

		if (type === 'query') {
			setQueryLength(queryLength - 1)
		}

		setTabs(newTabs)
	}

	const handleContextMenuAction = (actionId: string) => {
		switch (actionId) {
			case 'close':
				handleRemoveTab()
				break
			case 'close-others':
				setTabs(tabs.filter((tab) => tab.id === id))
				break
			case 'close-right':
				setTabs(
					tabs.filter((_, index) => {
						const activeIndex = tabs.findIndex((t) => t.id === id)
						return index <= activeIndex
					}),
				)
				break
			case 'close-left':
				setTabs(
					tabs.filter((_, index) => {
						const activeIndex = tabs.findIndex((t) => t.id === id)
						return index >= activeIndex
					}),
				)
				break
			case 'close-all':
				setTabs([])
				break
			default:
				break
		}
	}

	const handleClickTab = () => {
		setActiveTab(tab)

		if (type === 'table') {
			const database = id.replace(`-${title}`, '')
			setCurrentTable(title)
			setCurrentDatabase(database)
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<div
					className={clsx(
						'h-full cursor-pointer relative shrink-0 min-w-1/10 hover:text-primary transition-colors duration-300 hover:border-primary flex items-center justify-between border-r px-4 gap-4 select-none',
						id === activeTab?.id ?
							'text-primary border-primary'
						:	'text-gray-400',
					)}
					onClick={handleClickTab}>
					<div className='font-mono font-medium'>{title}</div>

					<button
						title='Close'
						className='block cursor-pointer'
						onClick={handleRemoveTab}>
						<XIcon size={20} />
					</button>
				</div>
			</ContextMenuTrigger>

			<ContextMenuContent>
				{menuItems.map((item) => (
					<ContextMenuItem
						key={item.id}
						onClick={() => handleContextMenuAction(item.id)}>
						{item.title}
					</ContextMenuItem>
				))}
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default Tab
