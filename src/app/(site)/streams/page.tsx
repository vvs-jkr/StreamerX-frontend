import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { StreamsContent } from '@/components/features/stream/list/StreamsContent'

import {
	FindAllStreamsDocument,
	type FindAllStreamsQuery
} from '@/graphql/generated/output'

import { SERVER_URL } from '@/libs/constants/url.constants'

async function findAllStreams() {
	try {
		const query = FindAllStreamsDocument.loc?.source.body
		const variables = {
			filters: {}
		}

		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables }),
			next: {
				revalidate: 30
			}
		})

		const data = await response.json()

		return {
			streams: data.data
				.findAllStreams as FindAllStreamsQuery['findAllStreams']
		}
	} catch (error) {
		console.log(error)
		throw new Error('Ошибка при получении стримов')
	}
}

export async function generateMetadata(props: {
	searchParams: Promise<{ searchTerm: string }>
}): Promise<Metadata> {
	const t = await getTranslations('streams')

	const searchParams = await props.searchParams

	return {
		title: searchParams.searchTerm
			? `${t('searchHeading')} "${searchParams.searchTerm}"`
			: t('heading')
	}
}

export default async function StreamsPage() {
	const { streams } = await findAllStreams()

	return <StreamsContent streams={streams} />
}
