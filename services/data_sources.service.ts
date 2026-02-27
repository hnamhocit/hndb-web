import { api } from '@/config'
import { DataSourceFormData } from '@/schemas'
import { supabaseClient } from '@/utils'

export const dataSourcesService = {
	addDataSource: async (
		dataSource: DataSourceFormData & { userId: string },
	) => {
		return await api.post('/data_sources/new', dataSource)
	},

	getDataSourcesByUserId: async (user_id: string) => {
		return await supabaseClient
			.from('data_sources')
			.select('*')
			.eq('user_id', user_id)
	},
}
