import { type ComponentProps, forwardRef } from 'react'

import { cn } from '@/utils/tw-merge'

interface InputProps extends Omit<ComponentProps<'input'>, 'error'> {
	error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-background transition-colors',
					'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
					'placeholder:text-muted-foreground',
					'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
					'disabled:cursor-not-allowed disabled:opacity-50',
					error && 'border-destructive focus:ring-destructive',
					className
				)}
				aria-invalid={error ? 'true' : undefined}
				aria-errormessage={error}
				ref={ref}
				{...props}
			/>
		)
	}
)

Input.displayName = 'Input'

export { Input }
