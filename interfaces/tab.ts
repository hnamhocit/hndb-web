export type TabType = 'query' | 'table' | 'database'

export interface ITab {
	id: string
	type: TabType
	title: string
}
