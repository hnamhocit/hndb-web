import clsx from 'clsx'
import {
	BoxesIcon,
	CheckCircle2Icon,
	CircleIcon,
	CopyPlusIcon,
	FileUpIcon,
	GroupIcon,
	HardDriveIcon,
	KeyboardIcon,
	KeyIcon,
	KeyRoundIcon,
	Loader2Icon,
	PenIcon,
	PlayIcon,
	PlusIcon,
	RotateCcwIcon,
	SettingsIcon,
	SignatureIcon,
	TableIcon,
	Trash2Icon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/config'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { formatDataSize, getTypeInfo } from '@/utils'
import { Button } from '../ui/button'

const tabs = [
	{
		id: 'data',
		title: 'Data',
		icon: <BoxesIcon />,
	},
	{
		id: 'structure',
		title: 'Structure',
		icon: <TableIcon />,
	},
	{
		id: 'er-diagram',
		title: 'ER Diagram',
		icon: <GroupIcon />,
	},
]

const TableDetail = () => {
	const { activeTab, commitContent } = useTabsStore()
	const { currentDatabase, currentTable, schema, selectedId } =
		useDataSourcesStore()
	const [currentTab, setCurrentTab] = useState('data')
	const [result, setResult] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const columns = schema[currentTable || ''] || []

	useEffect(() => {
		if (
			activeTab?.type === 'table' &&
			currentDatabase &&
			currentTable &&
			selectedId
		) {
			;(async () => {
				setIsLoading(true)

				try {
					const { data } = await api.get(
						`/data_sources/${selectedId}/databases/${currentDatabase}/tables/${currentTable}/preview?page=1`,
					)

					commitContent(
						activeTab.id,
						JSON.stringify(data.data.rows, null, 2),
					)
					setResult(data.data)
				} catch (error) {
					toast.error('Failed to fetch table preview: ' + error)
				} finally {
					setIsLoading(false)
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, currentDatabase, currentTable, selectedId])

	if (isLoading) {
		return (
			<div className='absolute inset-0 flex items-center justify-center'>
				<Loader2Icon
					size={48}
					className='animate-spin text-primary'
				/>
			</div>
		)
	}

	return (
		<div className='flex flex-col h-[calc(100vh-6rem)]'>
			<div className='flex items-center justify-between px-4 pt-4 border-b shrink-0'>
				<div className='flex gap-4'>
					{tabs.map((tab) => (
						<div
							key={tab.id}
							className={clsx(
								'flex items-center gap-2 cursor-pointer border-b-2 transition-colors duration-300 pb-2 select-none',
								{
									'border-primary text-primary':
										currentTab === tab.id,
									'border-transparent hover:border-gray-300':
										currentTab !== tab.id,
								},
							)}
							onClick={() => setCurrentTab(tab.id)}>
							{tab.icon}
							<div className='font-medium'>{tab.title}</div>
						</div>
					))}
				</div>
			</div>

			<div className='flex items-center justify-between p-4 border-b shrink-0'>
				<div className='flex items-center gap-3'>
					<Button
						size='icon'
						variant='ghost'>
						<PlusIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<PenIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<CopyPlusIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<Trash2Icon />
					</Button>

					<div className='w-0.5 h-8 bg-black'></div>

					<Button
						size='icon'
						variant='ghost'>
						<RotateCcwIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<FileUpIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<SettingsIcon />
					</Button>
				</div>

				<Button>
					<PlayIcon />
					<span>Execute query</span>
				</Button>
			</div>

			<div className='flex-1 overflow-auto min-h-0'>
				<table className='w-full border-collapse whitespace-nowrap'>
					<thead>
						<tr>
							<th className='border p-2 sticky top-0 bg-primary z-10'>
								<CircleIcon className='text-white mx-auto' />
							</th>

							{columns.map((col) => {
								const { icon: Icon } = getTypeInfo(
									col.data_type,
								)
								return (
									<th
										key={col.column_name}
										className='border p-2 text-left select-none sticky top-0 bg-primary text-white z-10'>
										<div className='flex items-center gap-4'>
											{col.is_primary && (
												<KeyIcon className='text-yellow-500' />
											)}

											{col.is_foreign_key && (
												<KeyRoundIcon className='text-neutral-300' />
											)}

											{col.is_unique && (
												<SignatureIcon className='text-green-500' />
											)}

											<div>
												<div className='text-lg font-semibold'>
													{col.column_name}
												</div>

												<div className='flex items-center gap-2'>
													<Icon size={18} />

													<div className='text-sm uppercase text-neutral-300 dark:text-neutral-500'>
														{col.data_type}
													</div>
												</div>
											</div>
										</div>
									</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{result?.rows?.map((row, i) => (
							<tr
								key={i}
								className='odd:bg-primary/5 hover:bg-primary/10 transition-colors duration-150'>
								<td
									key={`index-${i}`}
									className='border p-2 select-none text-neutral-500 font-mono text-center'>
									{i + 1}
								</td>

								{columns.map((col) => (
									<td
										key={col.column_name}
										className='border p-2 select-none text-neutral-600 font-mono'>
										{row[col.column_name] === null ?
											<span className='italic text-neutral-400'>
												[NULL]
											</span>
										:	String(row[col.column_name])}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='shrink-0 p-4 flex items-center justify-between border-t bg-neutral-50'>
				<div className='flex items-center gap-2'>
					<CheckCircle2Icon
						className='text-green-600'
						size={18}
					/>

					<div className='text-sm text-neutral-600'>
						<span className='font-semibold'>
							{result?.rows?.length}
						</span>{' '}
						rows affected in{' '}
						<span className='font-semibold'>
							{result?.durationMs?.toFixed(2)}
						</span>{' '}
						ms
					</div>
				</div>

				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2 text-sm text-neutral-600'>
						<HardDriveIcon />
						<span>
							Memory: {formatDataSize(result?.sizeBytes || 0)}
						</span>
					</div>

					<div className='w-0.5 h-8 bg-neutral-600'></div>

					<div className='flex items-center gap-2 text-sm text-neutral-600'>
						<KeyboardIcon />
						<span>UTF8</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TableDetail
