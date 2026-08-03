import { create } from "zustand";

const profileInit = {
	createAcc: false,
	login: false,
	authenticated: false,
};

export const useProfileStore = create((set) => ({
	profile: { ...profileInit },

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
