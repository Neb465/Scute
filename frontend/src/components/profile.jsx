import React from "react";
import { useProfileStore } from "../stores/useProfileStore";
import { useProfile } from "../hooks/profile-hook";
import { useFetchUser } from "../api/auth-api";

const Profile = () => {
	//Tanstack query
	const { data } = useFetchUser();

	//Zustand
	const profileAuth = useProfileStore(
		(state) => state["profile"].authenticated,
	);
	const profileNameIsEditing = useProfileStore((state) => state["profile"].nameIsEditing);
	const profileEmailIsEditing = useProfileStore((state) => state["profile"].emailIsEditing);
	const profilePassIsEditing = useProfileStore((state) => state["profile"].passIsEditing);
	const profileDeleteUserIsEditing = useProfileStore((state) => state["profile"].deleteUserIsEditing);

	const profileHandleCreateAcc = useProfileStore(
		(state) => state.handleCreateAcc,
	);
	const profileHandleLogin = useProfileStore((state) => state.handleLogin);

	const profileHandleNameIsEditing = useProfileStore((state) => state.handleNameIsEditing);
	const profileHandleEmailIsEditing = useProfileStore((state) => state.handleEmailIsEditing);
	const profileHandlePassIsEditing = useProfileStore((state) => state.handlePassIsEditing);
	const profileHandleDeleteUserIsEditing = useProfileStore((state) => state.handleDeleteUserIsEditing);

	//useState
	const profileHook = useProfile();

	return (
		<div
			className="relative flex flex-col items-end mx-5 my-5  z-1000"
			style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
		>
			<button
				className={`${profileAuth ? "bg-[#1a73e8]" : "bg-white"} w-11 h-11 rounded-full flex items-center justify-center transition-all hover:ring-2 hover:ring-[#1a73e8]/30 focus:outline-none`}
				onClick={() => profileHook.setToggle(!profileHook.toggle)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke={`${profileAuth ? "#FFFFFF" : "#5f6368"}`}
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
				<div className="flex flex-col">
					<div className="bg-white w-60 h-55 md:w-70 md:h-60 lg:w-80 lg:h-65 my-2 rounded-lg flex flex-col gap-2 px-3 py-3">
						<div className="flex flex-row w-full gap-2">
							{profileNameIsEditing ? (
								<>
									<input
										type="text"
										value={profileHook.nameEditingQuery}
										onChange={(e) =>
											profileHook.setNameEditingQuery(e.target.value)
										}
										placeholder="Enter your new name"
										id="changeName"
										className="w-3/4 rounded-xl px-3 bg-[#f1f3f4] text-[12px] text-[#202124] placeholder-[#9aa0a6] transition-all"
										style={{ fontFamily: "inherit" }}
									/>

									<button
										className="w-1/5 rounded-xl bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors text-[10px] md:text-[12px] lg:text-[13px]"
										onClick={() => {
											profileHandleNameIsEditing(false);
											profileHook.updateNameMutation.mutate({
												fieldQuery: profileHook.nameEditingQuery,
											});
											profileHook.setNameEditingQuery("");
										}}
									>
										Update
									</button>

									<button
										className="w-1/12 rounded-xl bg-[#dedede] text-red-500 hover:bg-[#c9c9c9] transition-colors text-[10px] md:text-[12px] lg:text-[13px]"
										onClick={() => {
											profileHandleNameIsEditing(false);
											profileHook.setNameEditingQuery("");
											profileHook.updateNameMutation.reset();
										}}
									>
										X
									</button>
								</>
							) : (
								<>
									<h1 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium">
										{data.name}
									</h1>

									<button
										className="w-1/5 rounded-xl bg-gray-300 text-[#1a73e8] hover:bg-[#c9c9c9] transition-colors text-[10px] md:text-[12px] lg:text-[13px]"
										onClick={() => {
											profileHandleNameIsEditing(true);
										}}
									>
										Change
									</button>

									{profileHook.updateNameMutation.isError && (
										<p className="text-red-500 text-[11px] md:text-[12px] lg:text-[13px]">
											{profileHook.updateNameMutation.error.message}
										</p>
									)}
								</>
							)}
						</div>

						<p className="text-[10px] md:text-[11px] lg:text-[12px] font-bold">
							{data.email}
						</p>

						<div className="flex flex-col items-center">
							<button
								className="w-4/5 h-3/10 rounded-xl mt-2 py-1 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-gray-300 text-[#1a73e8] hover:bg-[#c9c9c9] transition-colors"
								onClick={() => {
									profileHandleEmailIsEditing(
										!profileEmailIsEditing,
									);
									profileHandlePassIsEditing(false);
									profileHandleDeleteUserIsEditing(false);
									profileHook.updateEmailMutation.reset();
									profileHook.setEmailEditingQuery("");
									profileHook.setConfirmEmailQuery("");
								}}
							>
								Change Email
							</button>

							<button
								className="w-4/5 h-3/10 rounded-xl mt-2 py-1 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-gray-300 text-red-500 hover:bg-[#c9c9c9] transition-colors"
								onClick={() => {
									profileHandlePassIsEditing(
										!profilePassIsEditing,
									);
									profileHandleEmailIsEditing(false);
									profileHandleDeleteUserIsEditing(false);
									profileHook.updatePassMutation.reset();
									profileHook.setPassEditingQuery("");
									profileHook.setConfirmPassQuery("");
								}}
							>
								Change Password
							</button>

							<button
								className="w-4/5 h-3/10 rounded-xl mt-2 py-1 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
								onClick={() => {
									profileHook.logoutMutation.mutate();
									profileHook.setToggle(false);
								}}
							>
								Logout
							</button>
							
							<button
								className="w-4/5 h-3/10 rounded-xl mt-2 py-1 text-[12px] md:text-[13px] lg:text-[14px] font-bold bg-red-500 text-black hover:bg-red-600 transition-colors"
								onClick={() => {
									profileHandleDeleteUserIsEditing(
										!profileDeleteUserIsEditing
									);
									profileHandleEmailIsEditing(false);
									profileHandlePassIsEditing(false);
									profileHook.deleteUserMutation.reset();
									profileHook.setConfirmDeleteQuery("");
								}}
							>
								Delete Account
							</button>
							
						</div>
					</div>

					{profileEmailIsEditing && (
						<div className="relative flex flex-col items-center rounded-xl w-full h-30 gap-2 bg-white">
							<input
								type="text"
								value={profileHook.emailEditingQuery}
								onChange={(e) =>
									profileHook.setEmailEditingQuery(e.target.value)
								}
								placeholder="Enter your new email"
								id="changeEmail"
								className="w-4/5 rounded-xl px-3 mt-3 bg-[#f1f3f4] text-[12px] text-[#202124] placeholder-[#9aa0a6] transition-all"
								style={{ fontFamily: "inherit" }}
							/>

							<input
								type="password"
								value={profileHook.confirmEmailQuery}
								onChange={(e) =>
									profileHook.setConfirmEmailQuery(e.target.value)
								}
								placeholder="Confirm with old password"
								id="confirmEmail"
								className="w-4/5 rounded-xl px-3 bg-[#f1f3f4] text-[12px] text-[#202124] placeholder-[#9aa0a6] transition-all"
								style={{ fontFamily: "inherit" }}
							/>

							{profileHook.updateEmailMutation.isError && 
								<p className="text-red-500 text-[11px]">
									{profileHook.updateEmailMutation.error.message}
								</p>
							}

							{profileHook.updateEmailMutation.isSuccess && 
								<p className="text-green-500 text-[11px]">
									Email updated successfully!
								</p>
							}

							<button
								className="absolute bottom-3 w-2/5 rounded-xl bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
								onClick={() => {
									profileHook.updateEmailMutation.mutate({
										fieldQuery: profileHook.emailEditingQuery,
										password: profileHook.confirmEmailQuery
									});
								}}
							>
								Update
							</button>
						</div>
					)}

					{profilePassIsEditing && (
						<div className="relative flex flex-col items-center rounded-xl w-full h-30 gap-2 bg-white">
							<input
								type="password"
								value={profileHook.passEditingQuery}
								onChange={(e) =>
									profileHook.setPassEditingQuery(e.target.value)
								}
								placeholder="Enter your new password"
								id="changePass"
								className="w-4/5 rounded-xl px-3 mt-3 bg-[#f1f3f4] text-[12px] text-[#202124] placeholder-[#9aa0a6] transition-all"
								style={{ fontFamily: "inherit" }}
							/>

							<input
								type="password"
								value={profileHook.confirmPassQuery}
								onChange={(e) =>
									profileHook.setConfirmPassQuery(e.target.value)
								}
								placeholder="Confirm with old password"
								id="confirmPass"
								className="w-4/5 rounded-xl px-3 bg-[#f1f3f4] text-[12px] text-[#202124] placeholder-[#9aa0a6] transition-all"
								style={{ fontFamily: "inherit" }}
							/>

							{profileHook.updatePassMutation.isError && 
								<p className="text-red-500 text-[11px]">
									{profileHook.updatePassMutation.error.message}
								</p>
							}

							<button
								className="absolute bottom-3 w-2/5 rounded-xl bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
								onClick={() => {
									profileHook.updatePassMutation.mutate({
										newPassword: profileHook.passEditingQuery,
										password: profileHook.confirmPassQuery
									});
								}}
							>
								Update
							</button>
						</div>
					)}

					{profileDeleteUserIsEditing && (
						<div className="relative flex flex-col items-center rounded-xl w-full h-30 bg-white">
							<h1 
								className="mt-1 font-bold"
							>
								FINAL WARNING!
							</h1>

							<h1 
								className="font-bold"	
							>
								DO YOU WANT TO DELETE ACCOUNT?
							</h1>

							<input
								type="password"
								value={profileHook.confirmDeleteQuery}
								onChange={(e) =>
									profileHook.setConfirmDeleteQuery(e.target.value)
								}
								placeholder="Confirm with password"
								id="confirmDelete"
								className="w-4/5 rounded-xl px-3 mt-1 bg-[#f1f3f4] text-[12px] text-[#202124] placeholder-[#9aa0a6] transition-all"
								style={{ fontFamily: "inherit" }}
							/>

							{profileHook.deleteUserMutation.isError && 
								<p className="text-red-500 text-[11px] mt-1">
									{profileHook.deleteUserMutation.error.message}
								</p>
							}

							<button
								className="absolute bottom-3 w-2/5 rounded-xl bg-red-500 text-black hover:bg-red-600 transition-colors"
								onClick={() => {
									profileHook.deleteUserMutation.mutate({
										password: profileHook.confirmDeleteQuery
									});
								}}
							>
								Delete
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Profile;
