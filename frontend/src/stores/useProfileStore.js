import { create } from "zustand";

const profileInit = {
	createAcc: false,
	login: false,
	authenticated: false,
	nameIsEditing: false,
	emailIsEditing: false,
	passIsEditing: false,
	deleteUserIsEditing: false,
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

	handleNameIsEditing: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], nameIsEditing: bool },
		}));
	},

	handleEmailIsEditing: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], emailIsEditing: bool },
		}));
	},

	handlePassIsEditing: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], passIsEditing: bool },
		}));
	},

	handleDeleteUserIsEditing: (bool) => {
		set((state) => ({
			profile: { ...state["profile"], deleteUserIsEditing: bool },
		}));
	},
}));
