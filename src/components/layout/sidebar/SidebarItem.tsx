'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/common/Button'
import { Hint } from '@/components/ui/elements/Hint'

import { useSidebar } from '@/hooks/useSidebar'

import { cn } from '@/utils/tw-merge'

import { Route } from './route.interface'

interface SidebarItemProps {
	route: Route
}

export function SidebarItem({ route }: SidebarItemProps) {
	const pathname = usePathname()
	const { isCollapsed } = useSidebar()

	const isActive = pathname === route.href

	return isCollapsed ? (
		<Hint label={route.label} side='right' asChild>
			<Button
				className={cn(
					'h-11 w-full justify-center',
					isActive && 'bg-accent'
				)}
				variant='ghost'
				asChild
			>
				<Link href={route.href}>
					<route.icon className='mr-0 size-5' />
				</Link>
			</Button>
		</Hint>
	) : (
		<Button
			className={cn('h-11 w-full justify-start', isActive && 'bg-accent')}
			variant='ghost'
			asChild
		>
			<Link href={route.href} className='flex items-start gap-x-4'>
				<route.icon className='mr-0 size-5' />
				{route.label}
			</Link>
		</Button>
	)
}
