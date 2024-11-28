import { FC, PropsWithChildren } from 'react'

const PolicyButton: FC<
	PropsWithChildren<{
		onOpen: () => void
	}>
> = ({ children, onOpen }) => {
	return (
		<span
			className='text-primary hover:underline'
			onClick={e => {
				e.preventDefault()
				onOpen()
			}}
		>
			{children}
		</span>
	)
}

export default PolicyButton
