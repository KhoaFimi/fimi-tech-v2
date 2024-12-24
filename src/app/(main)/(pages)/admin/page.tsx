import { redirect } from 'next/navigation'

import { verifySession } from '@/lib/dal'

const AdminPage = async () => {
	const session = await verifySession()

	if (session.role !== 'admin') redirect('/campaign')

	return <div className='pt-8'>AdminPage</div>
}

export default AdminPage
