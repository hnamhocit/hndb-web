import { sql } from '@codemirror/lang-sql'
import * as themes from '@uiw/codemirror-themes-all'
import CodeMirror from '@uiw/react-codemirror'

import { useDataSourcesStore, useTabsStore } from '@/stores'

export default function SQLEditor() {
	const { schema } = useDataSourcesStore()
	const { activeTab, commitContent, contentById } = useTabsStore()
	const value = contentById[activeTab!.id] || ''

	const derivedSchema = Object.entries(schema).reduce(
		(acc, [table, columns]) => {
			acc[table] = columns.map((col) => col.column_name)
			return acc
		},
		{} as Record<string, string[]>,
	)

	return (
		<CodeMirror
			value={value}
			className='text-xl'
			theme={themes.tokyoNight}
			extensions={[
				sql({ schema: derivedSchema, upperCaseKeywords: true }),
			]}
			onChange={(value) => {
				commitContent(activeTab!.id, value)
			}}
		/>
	)
}
