import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { TypeBaseColor } from '@/libs/constants/colors.constants'

import type { ConfigStore } from './config.types'

export const configStore = create(
	persist<ConfigStore>(
		set => ({
			theme: 'turquoise',
			setTheme: (theme: TypeBaseColor) => set({ theme })
		}),
		{
			name: 'config',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
