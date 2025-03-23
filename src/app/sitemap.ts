import type { MetadataRoute } from 'next'

import {
	FindAllCategoriesDocument,
	type FindAllCategoriesQuery
} from '@/graphql/generated/output'

import { APP_URL, SERVER_URL } from '@/libs/constants/url.constants'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { categories } = await findAllCategories()

	const routes: MetadataRoute.Sitemap = [
		{
			url: APP_URL,
			lastModified: new Date().toISOString(),
			priority: 1.0
		},
		{
			url: APP_URL + '/streams',
			lastModified: new Date().toISOString(),
			priority: 0.8
		},
		{
			url: APP_URL + '/categories',
			lastModified: new Date().toISOString(),
			priority: 0.7
		}
	]

	categories.forEach(category =>
		routes.push({
			url: APP_URL + `/categories/${category.slug}`,
			lastModified: category.updatedAt,
			priority: 0.6
		})
	)

	return routes
}
