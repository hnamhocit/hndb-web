import { DatabaseIcon, DatabaseZapIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { api } from '@/config'
import { useDataSourcesStore } from '@/stores'
import Tables from './Tables'

const Databases = () => {
	const {
		databases,
		setDatabases,
		isDatabaseLoading,
		setIsDatabaseLoading,
		currentDatabase,
		setCurrentDatabase,
		setSchema,
		setIsSchemaLoading,
	} = useDataSourcesStore()

	useEffect(() => {
		;(async () => {
			setIsDatabaseLoading(true)

			try {
				const { data } = await api.get('/databases')
				setDatabases(data.data)
			} catch (error) {
				toast.error('Failed to fetch databases: ' + error)
			} finally {
				setIsDatabaseLoading(false)
			}
		})()
	}, [])

	useEffect(() => {
		if (!currentDatabase) return

		setIsSchemaLoading(true)
		;(async () => {
			try {
				const { data } = await api.get(
					`/databases/${currentDatabase}/schema`,
				)
				setSchema(data.data)
			} catch (error) {
				toast.error('Failed to fetch schema: ' + error)
			} finally {
				setIsSchemaLoading(false)
			}
		})()
	}, [currentDatabase])

	return (
		<AccordionContent>
			{isDatabaseLoading ?
				<div className='text-center text-gray-500'>
					Loading databases...
				</div>
			:	<Accordion
					type='single'
					collapsible>
					{databases.length === 0 ?
						<div className='text-center text-gray-500'>
							No databases found.
						</div>
					:	databases.map((database) => (
							<AccordionItem
								value={database}
								key={database}
								onClick={() => setCurrentDatabase(database)}>
								<AccordionTrigger>
									<div className='flex items-center gap-4 font-mono text-lg font-medium'>
										{database === currentDatabase ?
											<DatabaseZapIcon />
										:	<DatabaseIcon />}
										{database}
									</div>
								</AccordionTrigger>

								<Tables database={database} />
							</AccordionItem>
						))
					}
				</Accordion>
			}
		</AccordionContent>
	)
}

export default Databases
