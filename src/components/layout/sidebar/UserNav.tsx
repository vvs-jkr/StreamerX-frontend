import { Folder, Home, Radio } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { RecommededChannels } from './RecommededChannels'
import { SidebarItem } from './SidebarItem'
import type { Route } from './route.interface'

export function UserNav() {
	const t = useTranslations('layout.sidebar.userNav')

	const routes: Route[] = [
		{
			label: t('home'),
			href: '/',
			icon: Home
		},
		{
			label: t('categories'),
			href: '/categories',
			icon: Folder
		},
		{
			label: t('streams'),
			href: '/streams',
			icon: Radio
		}
	]

	return (
		<div className='space-y-2 px-2 pt-4 lg:pt-0'>
			{routes.map((route, index) => (
				<SidebarItem key={index} route={route} />
			))}
			<RecommededChannels />
		</div>
	)
}
