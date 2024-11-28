import { create } from 'zustand'

interface IRegisterState {
	fullname: string
	code: string
	email: string
	phone: string
}

interface IRegisterSuccess {
	data: IRegisterState
	setData: (data: IRegisterState) => void
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useRegisterSuccess = create<IRegisterSuccess>()(set => ({
	data: {
		fullname: '',
		code: '',
		email: '',
		phone: ''
	},
	setData: data =>
		set(state => ({ ...state, data: { ...state.data, ...data } })),
	open: false,
	onOpen: () => set(state => ({ ...state, open: true })),
	onClose: () => set(state => ({ ...state, open: false }))
}))
