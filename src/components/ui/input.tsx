'use client'

import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState<boolean>(false)

		const toggleShowPassword = () => setShowPassword(!showPassword)

		return (
			<div className='relative'>
				<input
					type={showPassword ? 'text' : type}
					className={cn(
						'flex h-7 w-full rounded-md border border-input bg-transparent px-2 py-1 text-xs shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>
				{type === 'password' && (
					<button
						onClick={e => {
							e.preventDefault()
							toggleShowPassword()
						}}
						className='absolute right-2 top-1/2 -translate-y-1/2'
					>
						{showPassword ? (
							<Eye className='size-4 text-foreground/50 transition duration-200 ease-out hover:text-foreground/80 active:text-foreground' />
						) : (
							<EyeOff className='size-4 text-foreground/50 transition duration-200 ease-out hover:text-foreground/80 active:text-foreground' />
						)}
					</button>
				)}
			</div>
		)
	}
)
Input.displayName = 'Input'

export { Input }
