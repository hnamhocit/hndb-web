import { ITab } from '@/interfaces'
import { useTabsStore } from '@/stores'
import Tab from './Tab'

const Tabs = () => {
	const {
		tabs,
		setTabs,
		queryLength,
		setQueryLength,
		setActiveTab,
		commitContent,
	} = useTabsStore()

	const handleNewQueryTab = () => {
		const id = Date.now().toString()
		const newTab: ITab = {
			id,
			title: `Query ${queryLength}`,
			type: 'query',
		}
		commitContent(id, '\n\n\n\n\n\n\n\n\n\n\n')

		setTabs([...tabs, newTab])
		setQueryLength(queryLength + 1)
		setActiveTab(newTab)
	}

	return (
		<div className='h-12 border-b flex items-end overflow-x-scroll'>
			<div
				className='h-full cursor-pointer relative shrink-0 min-w-1/10 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 select-none flex items-center justify-center border-r'
				onClick={handleNewQueryTab}>
				<div className='font-medium font-mono'>New</div>
			</div>

			{tabs.map((tab) => (
				<Tab
					key={tab.id}
					{...tab}
				/>
			))}
		</div>
	)
}

export default Tabs
