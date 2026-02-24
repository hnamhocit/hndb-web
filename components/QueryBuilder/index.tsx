import { api } from '@/config'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { AxiosError } from 'axios'
import {
	EraserIcon,
	PlayIcon,
	Redo2Icon,
	TargetIcon,
	Undo2Icon,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import SQLEditor from './SQLEditor'

const QueryBuilder = () => {
	const { contentById, activeTab } = useTabsStore()
	const { currentDatabase } = useDataSourcesStore()

	if (!activeTab) return

	const handleRunQuery = async () => {
		try {
			const query = contentById[activeTab.id] || ''
			const { data } = await api.post(
				`/databases/${currentDatabase}/query`,
				{
					query,
				},
			)

			console.log('Query result:', data)
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
		}
	}

	return (
		<div className='p-4 h-full'>
			<div className='flex h-full'>
				<div className='shrink-0 w-12 space-y-4'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								onClick={handleRunQuery}>
								<PlayIcon />
							</Button>
						</TooltipTrigger>

						<TooltipContent side='right'>Run Query</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								variant='outline'>
								<TargetIcon />
							</Button>
						</TooltipTrigger>

						<TooltipContent side='right'>
							Run selected lines
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								variant='outline'>
								<Undo2Icon />
							</Button>
						</TooltipTrigger>

						<TooltipContent side='right'>Undo</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								variant='outline'>
								<Redo2Icon />
							</Button>
						</TooltipTrigger>

						<TooltipContent side='right'>Redo</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								variant='outline'>
								<EraserIcon />
							</Button>
						</TooltipTrigger>

						<TooltipContent side='right'>
							Clear editor
						</TooltipContent>
					</Tooltip>
				</div>

				<SQLEditor />
			</div>
		</div>
	)
}

export default QueryBuilder
