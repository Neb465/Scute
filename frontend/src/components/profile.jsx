import React from "react";
import { useProfileStore } from "../stores/useProfileStore";
import { useProfile } from "../hooks/profile-hook";
import { useFetchUser } from "../api/auth-api";


const Profile = () => {
	//Tanstack query
	const { data } = useFetchUser();

	//Zustand
	const profileAuth = useProfileStore((state) => state["profile"].authenticated)
	const profileHandleCreateAcc = useProfileStore((state) => state.handleCreateAcc);
	const profileHandleLogin = useProfileStore((state) => state.handleLogin);

	//useState
	const profileHook = useProfile();

	return (
		<div
			className="relative flex flex-col items-end mx-5 my-5  z-1000"
			style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
		>
			<button
				className="bg-white w-11 h-11 rounded-full flex items-center justify-center transition-all hover:ring-2 hover:ring-[#1a73e8]/30 focus:outline-none"
				onClick={() => profileHook.setToggle(!profileHook.toggle)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#5f6368"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="8" r="4" />
					<path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
				</svg>
			</button>

			{profileHook.toggle && !profileAuth && (
				<div className="bg-gray-50 w-40 h-35 md:w-50 md:h-45 lg:w-60 lg:h-55 my-2 rounded-lg flex flex-col">
					<div className="flex flex-col w-full px-5 my-2 md:my-3 lg:my-4">
						<h1 className="text-[12px] md:text-[13px] lg:text-[14px] font-medium">
							You're not signed in
						</h1>
						<p className="text-gray-500 text-[10px] md:text-[11px] lg:text-[12px] font-thin">
							Sign in to access your profile
						</p>
					</div>

					<div className="flex flex-col w-full items-center gap-2 md:gap-3 lg:gap-4">
						<button 
							className="w-5/6 md:h-4/10 lg:h-1/2 rounded-xl py-1 md:py-2 lg:py-3 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
							onClick={() => {
								profileHandleLogin(true);
								profileHook.setToggle(false);
							}}
						>
							Sign in
						</button>

						<button 
							className="w-5/6 md:h-4/10 lg:h-1/2 rounded-xl py-1 md:py-2 lg:py-3 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#dedede] text-[#1a73e8] hover:bg-[#c9c9c9] transition-colors"
							onClick={() => {
								profileHandleCreateAcc(true);
								profileHook.setToggle(false);
							}}
						>
							Create Account
						</button>
					</div>
				</div>
			)}

			{profileHook.toggle && profileAuth && data && (
				<div className="bg-gray-50 w-40 h-35 md:w-50 md:h-45 lg:w-60 lg:h-55 my-2 rounded-lg flex flex-col items-center justify-center px-3">
					<h1 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium">
						Hi {data.name}!
					</h1>

					<p className="text-[10px] md:text-[11px] lg:text-[12px] text-center font-bold">
						Your email is: {data.email}.
					</p>

					<button
						className="w-4/5 h-1/5 rounded-xl mt-2 py-1 md:py-2 lg:py-3 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
						onClick={() => {
							profileHook.logoutMutation.mutate();
							profileHook.setToggle(false);
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Profile;
