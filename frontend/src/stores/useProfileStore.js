import { create } from "zustand";

const profileInit = {
	name: "",
	email: "",
	createAcc: false,
	login: false,
	authenticated: false,
};

export const useProfileStore = create((set) => ({
	profile: { ...profileInit },

	handleInfo: (info) => {
		set((state) => ({
			profile: { ...state["profile"], name: info.name, email: info.email },
		}));
	},

	handleLogin: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], login: bool },
		}));
	},

	handleCreateAcc: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], createAcc: bool },
		}));
	},

	handleAuthenticated: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], authenticated: bool },
		}));
	},
}));
