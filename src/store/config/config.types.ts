import type { TypeBaseColor } from '@/libs/constants/colors.constants'

export interface ConfigStore {
	theme: TypeBaseColor
	setTheme: (theme: TypeBaseColor) => void
}
