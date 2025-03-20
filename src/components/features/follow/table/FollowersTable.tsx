'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/components/ui/common/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar'
import { ChannelVerified } from '@/components/ui/elements/ChannelVerified'
import {
	DataTable,
	DataTableSkeleton
} from '@/components/ui/elements/DataTable'
import { Heading } from '@/components/ui/elements/Heading'

import {
	type FindMyFollowersQuery,
	useFindMyFollowersQuery
} from '@/graphql/generated/output'

import { formatDate } from '@/utils/format-date'

export function FollowersTable() {
	const t = useTranslations('dashboard.followers')

	const { data, loading: isLoadingFollowers } = useFindMyFollowersQuery()
	const followers = data?.findMyFollowers ?? []

	const followersColumns: ColumnDef<
		FindMyFollowersQuery['findMyFollowers'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) => formatDate(row.original.createdAt)
		},
		{
			accessorKey: 'follower',
			header: t('columns.user'),
			cell: ({ row }) => (
				<div className='flex items-center gap-x-2'>
					<ChannelAvatar channel={row.original.follower} size='sm' />
					<h2>{row.original.follower.username}</h2>
					{row.original.follower.isVerified && (
						<ChannelVerified size='sm' />
					)}
				</div>
			)
		},
		{
			accessorKey: 'actions',
			header: t('columns.actions'),
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='size-8 p-0'>
							<MoreHorizontal className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side='right'>
						<Link
							href={`/${row.original.follower.username}`}
							target='_blank'
						>
							<DropdownMenuItem>
								<User className='mr-2 size-4' />
								{t('columns.viewChannel')}
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	]

	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			<div className='mt-5'>
				{isLoadingFollowers ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={followersColumns} data={followers} />
				)}
			</div>
		</div>
	)
}
