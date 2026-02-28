import { api } from '@/config'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import {
	ArrowDownToLineIcon,
	DatabaseIcon,
	HistoryIcon,
	PlayIcon,
	SaveIcon,
	TimerIcon,
	WandSparklesIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { useDataSourcesStore, useTabsStore } from '@/stores'
import { useState } from 'react'
import Table from '../Table'
import { Button } from '../ui/button'
import SQLEditor from './SQLEditor'

const tabs = [
	{
		id: 'results',
		title: 'Results',
	},
	{
		id: 'execution-log',
		title: 'Execution Log',
	},
	{
		id: 'query-plan',
		title: 'Query Plan',
	},
]

const QueryBuilder = () => {
	const { contentById, activeTab } = useTabsStore()
	const { currentDatabase, selectedId, datasources } = useDataSourcesStore()
	const [currentTab, setCurrentTab] = useState('results')
	const [isLoading, setIsLoading] = useState(false)
	const [result, setResult] = useState(null)

	if (!activeTab) return

	const handleRunQuery = async () => {
		setIsLoading(true)

		if (!selectedId) {
			toast.error('No data source selected', {
				position: 'top-center',
			})
			return
		}

		try {
			const query = contentById[activeTab.id] || ''
			const { data } = await api.post(
				`/data_sources/${selectedId}/databases/${currentDatabase}/query`,
				{
					query,
				},
			)

			setResult(data.data)
		} catch (error) {
			if (error instanceof AxiosError) {
				if ('error' in error.response?.data) {
					toast.error(error.response?.data.error, {
						position: 'top-center',
					})
				}

				return
			}

			toast.error('Failed to run query', { position: 'top-center' })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col h-full'>
			<div className='flex items-center justify-between p-4 border-b'>
				<div className='flex items-center gap-4'>
					<Button
						onClick={handleRunQuery}
						disabled={isLoading}>
						<PlayIcon />
						Execute
					</Button>

					<div className='w-0.5 h-6 bg-neutral-400'></div>

					<Button
						size='icon'
						variant='ghost'>
						<SaveIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<WandSparklesIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<HistoryIcon />
					</Button>
				</div>

				<div className='flex items-center gap-4 text-sm'>
					<div className='text-neutral-700'>Dialect:</div>
					<div className='py-2 px-4 rounded bg-primary text-white uppercase font-mono'>
						{datasources.find((ds) => ds.id === selectedId)?.type ||
							'-'}
					</div>
				</div>
			</div>

			<SQLEditor />

			{result && (
				<>
					<div className='flex items-center justify-between py-2 px-4'>
						<div className='flex items-center gap-4'>
							{tabs.map((tab) => (
								<div
									key={tab.id}
									className={clsx(
										'py-2 px-4 cursor-pointer',
										{
											'border-b-2 border-primary text-primary font-bold':
												currentTab === tab.id,
											'text-neutral-600 hover:text-neutral-800 font-semibold':
												currentTab !== tab.id,
										},
									)}
									onClick={() => setCurrentTab(tab.id)}>
									{tab.title}
								</div>
							))}
						</div>

						<div className='flex items-center gap-4 text-neutral-700 dark:text-neutral-700 font-mono font-medium'>
							<div className='flex items-center gap-2'>
								<TimerIcon />
								<div>
									{result.durationMs?.toFixed(2) || 0}ms
								</div>
							</div>

							<div className='flex items-center gap-2'>
								<DatabaseIcon />

								<div>{result.rows.length || 0} rows</div>
							</div>

							<div className='w-0.5 h-6 bg-neutral-400'></div>

							<div className='flex items-center gap-2'>
								<ArrowDownToLineIcon />
								<div>CSV</div>
							</div>
						</div>
					</div>

					<Table
						columns={Object.keys(result.rows[0] || [])}
						rows={result.rows || []}
					/>
				</>
			)}
		</div>
	)
}

export default QueryBuilder
