import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

import {
	type FindChannelByUsernameQuery,
	useChangeStreamInfoMutation,
	useFindAllCategoriesQuery
} from '@/graphql/generated/output'

import {
	type TypeChangeStreamInfoSchema,
	changeStreamInfoSchema
} from '@/schemas/stream/change-stream-info.schema'

interface ChangeInfoFormProps {
	stream: FindChannelByUsernameQuery['findChannelByUsername']['stream']
}

export function ChangeInfoForm({ stream }: ChangeInfoFormProps) {
	const t = useTranslations('stream.settings.info')

	const { data } = useFindAllCategoriesQuery()
	const categories = data?.findAllCategories ?? []

	const form = useForm<TypeChangeStreamInfoSchema>({
		resolver: zodResolver(changeStreamInfoSchema),
		values: {
			title: stream?.title ?? '',
			categoryId: stream?.category?.id ?? ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeStreamInfoMutation({
		onCompleted() {
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeChangeStreamInfoSchema) {
		update({ variables: { data } })
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('titleLabel')}</FormLabel>
							<FormControl>
								<Input
									placeholder={t('titlePlaceholder')}
									disabled={isLoadingUpdate}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t('titleDescription')}
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='categoryId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('categoryLabel')}</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={t(
												'categoryPlaceholder'
											)}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent className='p-0'>
									{categories.map(category => (
										<SelectItem
											key={category.id}
											value={category.id}
										>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								{t('categoryDescription')}
							</FormDescription>
						</FormItem>
					)}
				/>

				<div className='flex justify-end pt-5'>
					<Button disabled={!isValid || isLoadingUpdate}>
						{t('submitButton')}
					</Button>
				</div>
			</form>
		</Form>
	)
}
