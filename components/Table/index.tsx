import { CircleIcon } from 'lucide-react'

import { IColumn } from '@/interfaces'
import { getTypeInfo } from '@/utils'

interface TableProps {
	columns: IColumn[] | string[]
	rows: Record<string, unknown>[]
}

const Table = ({ columns, rows }: TableProps) => {
	return (
		<div className='flex-1 overflow-auto min-h-0'>
			<table className='w-full border-collapse whitespace-nowrap'>
				<thead>
					<tr>
						<th className='border p-2 sticky top-0 bg-primary z-10'>
							<CircleIcon className='text-white mx-auto' />
						</th>

						{columns.map((col) => {
							if (typeof col === 'string') {
								return (
									<th
										key={col}
										className='border p-2 text-left select-none sticky top-0 bg-primary text-white z-10'>
										<div className='text-lg font-semibold'>
											{col}
										</div>
									</th>
								)
							}

							const { icon: Icon } = getTypeInfo(col.data_type)

							return (
								<th
									key={col.column_name}
									className='border p-2 text-left select-none sticky top-0 bg-primary text-white z-10'>
									<div className='text-lg font-semibold'>
										{col.column_name}
									</div>

									<div className='flex items-center gap-2'>
										<Icon size={18} />

										<div className='text-sm uppercase text-neutral-300 dark:text-neutral-500'>
											{col.data_type}
										</div>
									</div>
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>
					{rows?.map((row, i) => (
						<tr
							key={i}
							className='odd:bg-primary/5 hover:bg-primary/10 transition-colors duration-150'>
							<td
								key={`index-${i}`}
								className='border p-2 select-none text-neutral-500 font-mono text-center'>
								{i + 1}
							</td>

							{columns.map((col) => {
								if (typeof col === 'string') {
									return (
										<td
											key={col}
											className='border p-2 select-none text-neutral-600 font-mono'>
											{row[col] === null ?
												<span className='italic text-neutral-400'>
													[NULL]
												</span>
											:	String(row[col])}
										</td>
									)
								}

								return (
									<td
										key={col.column_name}
										className='border p-2 select-none text-neutral-600 font-mono'>
										{row[col.column_name] === null ?
											<span className='italic text-neutral-400'>
												[NULL]
											</span>
										:	String(row[col.column_name])}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
