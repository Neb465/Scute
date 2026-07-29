import { useCreateAcc } from "../hooks/create-acc-hook";
import { useProfileStore } from "../stores/useProfileStore";

const CreateAccountBox = () => {
  const profileStore = useProfileStore();
  const registerHook = useCreateAcc();
  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-sm bg-black/20"
    >
      <div className="bg-white h-100 w-80 flex flex-col rounded-lg text-center items-center">
        
        <form className="relative h-full w-full px-4 py-5 flex flex-col gap-3">
          <div className="flex flex-row justify-center">
            <h1 className="text-[18px] font-semibold">Create Account</h1>
            <button
              className="absolute top-1 right-0 w-1/12 hover:bg-gray-300 rounded-xl"
              type="button"
              onClick={() => profileStore.handleCreateAcc(false)}
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[12px] text-[#5f6368] font-medium">Full name</label>
            <input
              type="text"
              value={registerHook.nameField}
              onChange={(e) => registerHook.setNameField(e.target.value)}
              placeholder="Enter your full name"
              id="name"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[12px] text-[#5f6368] font-medium">Email</label>
            <input
              type="text"
              value={registerHook.emailField}
              onChange={(e) => registerHook.setEmailField(e.target.value)}
              placeholder="Enter your email"
              id="email"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-[12px] text-[#5f6368] font-medium">Password</label>
            <input
              type="password"
              value={registerHook.passField}
              onChange={(e) => registerHook.setPassField(e.target.value)}
              placeholder="Enter your password"
              id="password"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          {registerHook.isError &&
            <p className="text-red-800 text-[14px]">
              {registerHook.error}
            </p>
          }

          {registerHook.isSuccess &&
            <p className="text-green-800 text-[14px]">
              Account successfully created! Login to continue.
            </p>
          }

          <div className="absolute bottom-5 w-72">
            <button 
              className="w-full rounded-xl h-11 bg-blue-500 text-[14px] text-white"
              type="submit"
              onClick={
                (e) => {
                  e.preventDefault();
                  registerHook.registerUser(registerHook.nameField, registerHook.emailField, registerHook.passField);
                }
              }
            >
              Submit
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default CreateAccountBox;