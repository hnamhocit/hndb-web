import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ITab } from '@/interfaces'

type ContentById = Record<string, string>

type TabsState = {
	tabs: ITab[]
	setTabs: (tabs: ITab[]) => void

	activeTab: ITab | null
	setActiveTab: (tab: ITab | null) => void

	contentById: ContentById
	commitContent: (id: string, content: string) => void

	queryLength: number
	setQueryLength: (length: number) => void
}

export const useTabsStore = create<TabsState>()(
	persist(
		(set) => ({
			tabs: [],
			setTabs: (tabs) => set({ tabs }),

			activeTab: null,
			setActiveTab: (activeTab) => set({ activeTab }),

			contentById: {},
			commitContent: (id, content) =>
				set((s) => ({
					contentById: { ...s.contentById, [id]: content },
				})),

			queryLength: 0,
			setQueryLength: (length) => set({ queryLength: length }),
		}),
		{
			name: 'tabs-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (s) => ({
				tabs: s.tabs,
				activeTab: s.activeTab,
				contentById: s.contentById,
				queryLength: s.queryLength,
			}),
		},
	),
)
