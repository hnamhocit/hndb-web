import { AxiosError } from 'axios'
import {
	CheckCircle2Icon,
	CopyPlusIcon,
	FileUpIcon,
	HardDriveIcon,
	KeyboardIcon,
	PenIcon,
	PlayIcon,
	PlusIcon,
	RotateCcwIcon,
	SettingsIcon,
	Trash2Icon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import { api } from '@/config'
import { useTabsStore } from '@/stores'
import { useDataSourcesStore } from '@/stores/datasources.store'
import { formatDataSize } from '@/utils'

const Data = () => {
	const { activeTab, commitContent } = useTabsStore()
	const { currentDatabase, currentTable, schema, selectedId } =
		useDataSourcesStore()
	const [result, setResult] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const columns = schema[currentTable || ''] || []

	useEffect(() => {
		if (activeTab && currentDatabase && currentTable && selectedId) {
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
					if (error instanceof AxiosError) {
						toast.error(error.response?.data.error, {
							position: 'top-center',
						})

						return
					}

					toast.error('Failed to fetch table preview.')
				} finally {
					setIsLoading(false)
				}
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, currentDatabase, currentTable, selectedId])

	if (isLoading) {
		return <div className='p-4'>Loading...</div>
	}

	return (
		<>
			<div className='flex items-center justify-between p-4 border-b'>
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

			<Table
				columns={columns}
				rows={result?.rows || []}
			/>

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
		</>
	)
}

export default Data
