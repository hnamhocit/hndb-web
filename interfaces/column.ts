export interface IColumn {
	column_name: string
	data_type: string
	is_nullable: boolean
	column_default: string | null
}
