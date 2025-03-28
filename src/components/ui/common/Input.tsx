import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, ...props }, ref) => {
		return (
			<input
				data-state={error ? 'error' : 'default'}
				className={twMerge(
					'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					'data-[state=error]:border-destructive data-[state=error]:ring-destructive',
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
