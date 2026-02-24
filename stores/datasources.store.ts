import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IColumn } from '@/interfaces'
import { DataSourceFormData } from '@/schemas'

interface DataSourcesStore {
	datasources: DataSourceFormData[]
	setDatasources: (datasources: DataSourceFormData[]) => void

	databases: string[]
	setDatabases: (databases: string[]) => void

	isDatabaseLoading: boolean
	setIsDatabaseLoading: (isLoading: boolean) => void

	schema: Record<string, IColumn[]>
	setSchema: (schema: Record<string, IColumn[]>) => void

	isSchemaLoading: boolean
	setIsSchemaLoading: (isLoading: boolean) => void

	currentDatabase: string | null
	setCurrentDatabase: (db: string | null) => void

	currentTable: string | null
	setCurrentTable: (table: string | null) => void
}

export const useDataSourcesStore = create<DataSourcesStore>()(
	persist(
		(set) => ({
			datasources: [],
			setDatasources: (datasources) => set({ datasources }),

			databases: [],
			setDatabases: (databases) => set({ databases }),

			isDatabaseLoading: false,
			setIsDatabaseLoading: (isDatabaseLoading) =>
				set({ isDatabaseLoading }),

			schema: {},
			setSchema: (schema) => set({ schema }),

			isSchemaLoading: false,
			setIsSchemaLoading: (isSchemaLoading) => set({ isSchemaLoading }),

			currentDatabase: null,
			setCurrentDatabase: (currentDatabase) => set({ currentDatabase }),

			currentTable: null,
			setCurrentTable: (currentTable) => set({ currentTable }),
		}),
		{
			name: 'datasources-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				datasources: state.datasources,
				databases: state.databases,
				currentDatabase: state.currentDatabase,
				currentTable: state.currentTable,
				schema: state.schema,
			}),
		},
	),
)
