import { useResetPass } from "../hooks/reset-pass-hook";

function ResetPass() {
  const resetPassHook = useResetPass();

  return (
    <div className="w-screen h-screen">
      {resetPassHook.token ? (
        <form className="relative h-full w-full px-4 py-5 flex flex-col gap-3 items-center">
          <h2>Create New Password</h2>
          <input 
            className="rounded-xl px-3 w-1/3 h-11 bg-[#f1f3f4]"
            type="password"
            placeholder="New Password" 
            value={resetPassHook.newPass}
            onChange={(e) => resetPassHook.setNewPass(e.target.value)}
          />

          {resetPassHook.isError && 
            <p className="text-red-500">
              {resetPassHook.error}
            </p>
          }

          <div className="absolute top-40 w-1/3">
            <button 
              type="submit"
              className="rounded-xl px-3 h-11 w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={(e) => {
                e.preventDefault();
                resetPassHook.resetPass();
              }}
            >
              Update Password
            </button>
          </div>
          
        </form>
      ) : (
        <p>Invalid or missing security token.</p>
      )}
    </div>    
  );
}

export default ResetPass;