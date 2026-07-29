import { useLogin } from "../hooks/login-hook";
import { useProfileStore } from "../stores/useProfileStore";

const LoginBox = () => {
  const loginHook = useLogin();
  const profileHandleLogin = useProfileStore((state) => state.handleLogin);

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-sm bg-black/20"
    >
      <div className="bg-white h-90 w-80 flex flex-col rounded-lg text-center items-center">
        
        <form className="relative h-full w-full px-4 py-5 flex flex-col gap-3">
          <div className="flex flex-row justify-center">
            <h1 className="text-[18px] font-semibold">Login</h1>
            <button
              className="absolute top-1 right-0 w-1/12 hover:bg-gray-300 rounded-xl"
              type="button"
              onClick={() => profileHandleLogin(false)}
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[12px] text-[#5f6368] font-medium">Email</label>
            <input
              type="text"
              value={loginHook.emailField}
              onChange={(e) => loginHook.setEmailField(e.target.value)}
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
              value={loginHook.passField}
              onChange={(e) => loginHook.setPassField(e.target.value)}
              placeholder="Enter your password"
              id="password"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          <div className="flex flex-row gap-3">
            <button 
              className="text-blue-800 font-extrabold text-[12px]"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                loginHook.forgotPassMutation.mutate({ email: loginHook.emailField });
              }}
            >
              Forgot Password
            </button>

            {loginHook.forgotPassMutation.isSuccess && 
              <p className="text-green-800 text-[12px] font-semibold">{loginHook.forgotPassMutation.data}</p>
            }

            {loginHook.forgotPassMutation.isError && 
              <p className="text-red-800 text-[12px] font-semibold">{loginHook.forgotPassMutation.error.message}</p>
            }
          </div>

          {loginHook.loginMutation.isError &&
            <p className="text-red-800 text-[14px]">
              {loginHook.loginMutation.error.message}
            </p>
          }

          {loginHook.loginMutation.isSuccess && (
              <p className="text-green-800 text-[14px]">
                Account logged in!
              </p>
            )
          }

          <div className="absolute bottom-5 w-72">
            <button 
              className="w-full rounded-xl h-11 bg-blue-500 text-[14px] text-white"
              type="submit"
              onClick={
                (e) => {
                  e.preventDefault();
                  loginHook.loginMutation.mutate({ email: loginHook.emailField, password: loginHook.passField });
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

export default LoginBox;