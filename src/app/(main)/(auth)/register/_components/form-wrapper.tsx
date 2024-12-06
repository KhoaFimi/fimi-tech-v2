import { FC, PropsWithChildren } from 'react'

type FormWrapper = PropsWithChildren<{
	title: string
	description?: string
}>

export const FormWrapper: FC<FormWrapper> = ({
	title,
	children,
	description
}) => {
	return (
		<div>
			<div className='pb-4'>
				<h4 className='text-center text-3xl font-bold uppercase tracking-tight text-primary'>
					{title}
				</h4>
				{description && (
					<p className='text-center text-sm font-semibold tracking-tight text-foreground/50'>
						{description}
					</p>
				)}
			</div>
			{children}
		</div>
	)
}
