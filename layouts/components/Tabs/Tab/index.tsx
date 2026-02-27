import { XIcon } from 'lucide-react'
import { FC } from 'react'

import { ITab } from '@/interfaces'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { clsx } from 'clsx'

const Tab: FC<ITab> = (props) => {
	const { id, title, type } = props
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

	const handleClickTab = () => {
		setActiveTab(props)

		if (type === 'table') {
			const database = id.replace(`-${title}`, '')
			setCurrentTable(title)
			setCurrentDatabase(database)
		}
	}

	return (
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
	)
}

export default Tab
