import { BoxesIcon, GroupIcon, TableIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/config'
import { IQueryMeta } from '@/interfaces'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { getTypeInfo } from '@/utils'
import { Button } from '../ui/button'
import { ButtonGroup } from '../ui/button-group'

type Tab = 'properties' | 'data' | 'diagram'
const tabs: Tab[] = ['properties', 'data', 'diagram']

const TableDetail = () => {
	const { activeTab, contentById, commitContent } = useTabsStore()
	const { currentDatabase, currentTable, schema } = useDataSourcesStore()
	const [currentTab, setCurrentTab] = useState<Tab>('data')
	const [queryMeta, setQueryMeta] = useState<IQueryMeta | null>(null)

	const rows =
		activeTab?.id ?
			contentById[activeTab!.id] ?
				JSON.parse(contentById[activeTab.id])
			:	[]
		:	[]
	const columns = schema[currentTable || ''] || []

	useEffect(() => {
		if (activeTab?.type === 'table' && currentDatabase && currentTable) {
			;(async () => {
				try {
					const { data } = await api.get(
						`/databases/${currentDatabase}/tables/${currentTable}/preview?page=1`,
					)

					commitContent(
						activeTab.id,
						JSON.stringify(data.data, null, 2),
					)
					setQueryMeta(data.meta)
				} catch (error) {
					toast.error('Failed to fetch table preview: ' + error)
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, currentDatabase, currentTable])

	return (
		<div className='relative space-y-7'>
			<div className='flex items-center'>
				<ButtonGroup>
					{tabs.map((tab) => (
						<Button
							key={tab}
							variant={currentTab === tab ? 'default' : 'outline'}
							onClick={() => setCurrentTab(tab)}>
							{tab === 'properties' && <TableIcon />}
							{tab === 'data' && <BoxesIcon />}
							{tab === 'diagram' && <GroupIcon />}
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</Button>
					))}
				</ButtonGroup>
			</div>

			<table className='w-full border-collapse whitespace-nowrap font-mono'>
				<thead>
					<tr>
						<th className='border p-2 text-left select-none'>
							<div className='text-lg font-semibold'>Index</div>
						</th>

						{columns.map((col) => {
							const { icon: Icon, color } = getTypeInfo(
								col.data_type,
							)

							return (
								<th
									key={col.column_name}
									className='border p-2 text-left select-none'>
									<div className='flex items-center gap-4'>
										<Icon
											size={18}
											className={color}
										/>

										<div className='text-lg font-semibold'>
											{col.column_name}
										</div>
									</div>

									{!col.is_nullable && (
										<div className='text-sm uppercase text-red-400'>
											not null
										</div>
									)}
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr
							key={i}
							className='odd:bg-primary/5'>
							<td
								key={`index-${i}`}
								className='border p-2 select-none hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-neutral-500'>
								{i + 1}
							</td>

							{columns.map((col) => (
								<td
									key={col.column_name}
									className='border p-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 select-none text-neutral-500'>
									{row[col.column_name]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{queryMeta && (
				<div className='absolute left-0 bottom-0 h-12 flex items-center gap-4 bg-primary/80 px-4 rounded-tl-lg'>
					{`Fetched at: ${new Date(queryMeta.fetchedAt).toLocaleTimeString()} | Duration: ${queryMeta.durationMs} ms | Row count: ${queryMeta.rowCount}`}
				</div>
			)}
		</div>
	)
}

export default TableDetail
