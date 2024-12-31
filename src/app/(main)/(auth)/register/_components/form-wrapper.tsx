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
		<div className='w-full rounded-lg border p-4 shadow'>
			<div className='pb-4'>
				<h4 className='text-center font-bold uppercase tracking-tight text-primary ~text-lg/xl'>
					{title}
				</h4>
				{description && (
					<p className='text-center text-xs font-medium tracking-tight text-foreground/50'>
						{description}
					</p>
				)}
			</div>
			{children}
		</div>
	)
}
