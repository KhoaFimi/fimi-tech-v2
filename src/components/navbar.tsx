import { logout } from '@/actions/logout'
import { Navmenu, NavmenuMobile } from '@/components/navmenu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { verifySession } from '@/lib/dal'

const Navbar = async () => {
	const { isAuth, fullname } = await verifySession()

	if (!isAuth) return null

	return (
		<>
			<div className='hidden items-center gap-x-2 divide-x-[2px] lg:flex'>
				<Navmenu />

				<div className='flex items-center space-x-2 px-2'>
					<Avatar className='size-8 cursor-pointer text-sm font-bold text-primary antialiased'>
						<AvatarFallback>
							{fullname
								.split(' ')
								[fullname.split(' ').length - 1][0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<form action={logout}>
						<Button
							type='submit'
							size='sm'
							className='bg-white px-2 py-1 text-xs font-semibold text-primary hover:bg-white hover:text-primary'
						>
							Đăng xuất
						</Button>
					</form>
				</div>
			</div>

			<NavmenuMobile fullname={fullname} />
		</>
	)
}

export default Navbar
