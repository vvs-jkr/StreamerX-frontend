import { getTranslations } from 'next-intl/server'

import { CategoriesList } from '@/components/features/category/list/CategoriesList'
import { StreamsList } from '@/components/features/stream/list/StreamsList'

import {
	FindRandomCategoriesDocument,
	type FindRandomCategoriesQuery,
	FindRandomStreamsDocument,
	type FindRandomStreamsQuery
} from '@/graphql/generated/output'

import { SERVER_URL } from '@/libs/constants/url.constants'

async function findRandomStreams() {
	try {
		const query = FindRandomStreamsDocument.loc?.source.body

		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query }),
			next: {
				revalidate: 30
			}
		})

		const data = await response.json()

		return {
			streams: data.data
				.findRandomStreams as FindRandomStreamsQuery['findRandomStreams']
		}
	} catch (error) {
		console.log(error)
		throw new Error('Ошибка при получении стримов')
	}
}

async function findRandomCategories() {
	try {
		const query = FindRandomCategoriesDocument.loc?.source.body

		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query }),
			next: {
				revalidate: 30
			}
		})

		const data = await response.json()

		return {
			categories: data.data
				.findRandomCategories as FindRandomCategoriesQuery['findRandomCategories']
		}
	} catch (error) {
		console.log(error)
		throw new Error('Ошибка при получении категорий')
	}
}

export default async function HomePage() {
	const t = await getTranslations('home')

	const { streams } = await findRandomStreams()
	const { categories } = await findRandomCategories()

	return (
		<div className='space-y-10'>
			<StreamsList heading={t('streamsHeading')} streams={streams} />
			<CategoriesList
				heading={t('categoriesHeading')}
				categories={categories}
			/>
		</div>
	)
}
