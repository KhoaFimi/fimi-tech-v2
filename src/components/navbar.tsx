'use client'

import { logout } from '@/actions/logout'
import { useAuthContext } from '@/contexts/auth-context'

const Navbar = () => {
	const { user, isAuth } = useAuthContext()

	if (!isAuth) return null

	return (
		<div className='flex items-center gap-x-2 divide-x-[2px]'>
			<p className='text-base font-bold text-white'>Chào, {user.fullname}</p>
			<form action={logout}>
				<button
					type='submit'
					className='px-2 text-base font-semibold text-white transition hover:underline'
				>
					Đăng xuất
				</button>
			</form>
		</div>
	)
}

export default Navbar
