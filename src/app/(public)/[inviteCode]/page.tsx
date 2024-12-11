import { FC } from 'react'

type Params = Promise<{ inviteCode: string }>

interface InviteCodePageProps {
	params: Params
}

const InviteCodePage: FC<InviteCodePageProps> = async ({ params }) => {
	const { inviteCode } = await params

	return <div>{inviteCode}</div>
}

export default InviteCodePage
