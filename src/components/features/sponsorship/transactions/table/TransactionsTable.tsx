'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import {
	DataTable,
	DataTableSkeleton
} from '@/components/ui/elements/DataTable'
import { Heading } from '@/components/ui/elements/Heading'

import {
	type FindMyTransactionsQuery,
	TransactionStatus,
	useFindMyTransactionsQuery
} from '@/graphql/generated/output'

import { convertPrice } from '@/utils/convert-price'
import { formatDate } from '@/utils/format-date'

export function TransactionsTable() {
	const t = useTranslations('dashboard.transactions')

	const { data, loading: isLoadingTransactions } =
		useFindMyTransactionsQuery()
	const transactions = data?.findMyTransactions ?? []

	const transactionsColumns: ColumnDef<
		FindMyTransactionsQuery['findMyTransactions'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) => formatDate(row.original.createdAt)
		},
		{
			accessorKey: 'status',
			header: t('columns.status'),
			cell: ({ row }) => {
				const status = row.original.status
				let statusColor = ''

				switch (status) {
					case TransactionStatus.Success:
						statusColor = 'text-green-500'
						return (
							<div className={`py-1.5 ${statusColor}`}>
								{t('columns.success')}
							</div>
						)
					case TransactionStatus.Pending:
						statusColor = 'text-yellow-500'
						return (
							<div className={`py-1.5 ${statusColor}`}>
								{t('columns.pending')}
							</div>
						)
					case TransactionStatus.Failed:
						statusColor = 'text-red-600'
						return (
							<div className={`py-1.5 ${statusColor}`}>
								{t('columns.failed')}
							</div>
						)
					case TransactionStatus.Expired:
						statusColor = 'text-purple-500'
						return (
							<div className={`py-1.5 ${statusColor}`}>
								{t('columns.expired')}
							</div>
						)
					default:
						statusColor = 'text-foreground'
						return (
							<div className={`py-1.5 ${statusColor}`}>
								{status}
							</div>
						)
				}
			}
		},
		{
			accessorKey: 'amount',
			header: t('columns.amount'),
			cell: ({ row }) => convertPrice(row.original.amount)
		}
	]

	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
			/>
			<div className='mt-5'>
				{isLoadingTransactions ? (
					<DataTableSkeleton />
				) : (
					<DataTable
						columns={transactionsColumns}
						data={transactions}
					/>
				)}
			</div>
		</div>
	)
}
