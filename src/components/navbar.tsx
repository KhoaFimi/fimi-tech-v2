import { logout } from '@/actions/logout'
import { Navmenu, NavmenuMobile } from '@/components/navmenu'
import { verifySession } from '@/lib/dal'

const Navbar = async () => {
	const { isAuth, fullname } = await verifySession()

	if (!isAuth) return null

	return (
		<>
			<div className='hidden items-center gap-x-2 divide-x-[2px] lg:flex'>
				<Navmenu />

				<p className='pl-2 text-base font-bold text-white'>Chào, {fullname}</p>
				<form action={logout}>
					<button
						type='submit'
						className='px-2 text-base font-semibold text-white transition hover:underline'
					>
						Đăng xuất
					</button>
				</form>
			</div>

			<NavmenuMobile fullname={fullname} />
		</>
	)
}

export default Navbar
