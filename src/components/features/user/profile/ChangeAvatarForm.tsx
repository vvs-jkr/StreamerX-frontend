'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type ChangeEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import { Form, FormField } from '@/components/ui/common/Form'
import { Skeleton } from '@/components/ui/common/Skeleton'
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar'
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal'
import { FormWrapper } from '@/components/ui/elements/FormWrapper'

import {
	useChangeProfileAvatarMutation,
	useRemoveProfileAvatarMutation
} from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	type TypeUploadFileSchema,
	uploadFileSchema
} from '@/schemas/upload-file.schema'

export function ChangeAvatarForm() {
	const t = useTranslations('dashboard.settings.profile.avatar')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const inputRef = useRef<HTMLInputElement>(null)

	const form = useForm<TypeUploadFileSchema>({
		resolver: zodResolver(uploadFileSchema),
		values: {
			file: user?.avatar!
		}
	})

	const [update, { loading: isLoadingUpdate }] =
		useChangeProfileAvatarMutation({
			onCompleted() {
				refetch()
				toast.success(t('successUpdateMessage'))
			},
			onError() {
				toast.error(t('errorUpdateMessage'))
			}
		})

	const [remove, { loading: isLoadingRemove }] =
		useRemoveProfileAvatarMutation({
			onCompleted() {
				refetch()
				toast.success(t('successRemoveMessage'))
			},
			onError() {
				toast.error(t('errorRemoveMessage'))
			}
		})

	function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]

		if (file) {
			form.setValue('file', file)
			update({ variables: { avatar: file } })
		}
	}

	return isLoadingProfile ? (
		<ChangeAvatarFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<div className='px-5 pb-5'>
							<div className='w-full items-center space-x-6 lg:flex'>
								<ChannelAvatar
									channel={{
										username: user?.username!,
										avatar:
											field.value instanceof File
												? URL.createObjectURL(
														field.value
													)
												: field.value
									}}
									size='xl'
								/>
								<div className='space-y-3'>
									<div className='flex items-center gap-x-3'>
										<input
											className='hidden'
											type='file'
											ref={inputRef}
											onChange={handleImageChange}
										/>
										<Button
											variant='secondary'
											onClick={() =>
												inputRef.current?.click()
											}
											disabled={
												isLoadingUpdate ||
												isLoadingRemove
											}
										>
											{t('updateButton')}
										</Button>
										{user?.avatar && (
											<ConfirmModal
												heading={t(
													'confirmModal.heading'
												)}
												message={t(
													'confirmModal.message'
												)}
												onConfirm={() => remove()}
											>
												<Button
													variant='ghost'
													size='lgIcon'
													disabled={
														isLoadingUpdate ||
														isLoadingRemove
													}
												>
													<Trash className='size-4' />
												</Button>
											</ConfirmModal>
										)}
									</div>
									<p className='text-sm text-muted-foreground'>
										{t('info')}
									</p>
								</div>
							</div>
						</div>
					)}
				/>
			</Form>
		</FormWrapper>
	)
}

export function ChangeAvatarFormSkeleton() {
	return <Skeleton className='h-52 w-full' />
}
