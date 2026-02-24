import Image from 'next/image'

import { supportDataSources } from '@/constants/supportDataSources'
import { useDataSourcesStore } from '@/stores'
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion'
import Databases from './Databases'

const DataSources = () => {
	const { datasources } = useDataSourcesStore()

	return (
		<Accordion
			type='single'
			collapsible>
			{datasources.map((ds) => {
				const supportDataSource = supportDataSources.find(
					(s) => s.id === ds.type,
				)

				return (
					<AccordionItem
						className='px-4'
						value={ds.type}
						key={ds.type}>
						<AccordionTrigger>
							<div className='flex items-center gap-4'>
								<Image
									src={
										supportDataSource?.photoURL ||
										'/default-datasource.png'
									}
									alt={`${supportDataSource?.name} Logo`}
									width={28}
									height={28}
								/>

								<span className='text-lg font-mono font-medium'>
									{supportDataSource?.name || ds.type}
								</span>
							</div>
						</AccordionTrigger>

						<Databases />
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default DataSources
