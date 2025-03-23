import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { CategoriesList } from '@/components/features/category/list/CategoriesList'

import {
	FindAllCategoriesDocument,
	type FindAllCategoriesQuery
} from '@/graphql/generated/output'

import { SERVER_URL } from '@/libs/constants/url.constants'

async function findAllCategories() {
	try {
		const query = FindAllCategoriesDocument.loc?.source.body

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
				.findAllCategories as FindAllCategoriesQuery['findAllCategories']
		}
	} catch (error) {
		console.log(error)
		throw new Error('Ошибка при получении категорий')
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('categories')

	return {
		title: t('heading')
	}
}

export default async function HomePage() {
	const t = await getTranslations('categories')

	const { categories } = await findAllCategories()

	return <CategoriesList heading={t('heading')} categories={categories} />
}
