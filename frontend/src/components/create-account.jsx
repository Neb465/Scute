const CreateAccountBox = ({ profile }) => {
  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-sm bg-black/20"
    >
      <div className="bg-white flex flex-col rounded-lg text-center items-center">
        
        <form className="relative px-6 py-5 flex flex-col gap-3" >
          <div className="flex flex-row justify-center">
            <h1 className="text-[18px] font-semibold">Create Account</h1>
            <button 
              className="absolute top-1 right-1 w-1/12 hover:bg-gray-300 rounded-xl"
              type="button"
              onClick={() => profile.setCreateAcc(false)}
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#5f6368] font-medium">Full name</label>
            <input
              type="text"
              // value={}
              // onChange={}
              placeholder="Enter your full name"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#5f6368] font-medium">Email</label>
            <input
              type="text"
              // value={}
              // onChange={}
              placeholder="Enter your email"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#5f6368] font-medium">Password</label>
            <input
              type="text"
              // value={}
              // onChange={}
              placeholder="Enter your password"
              className="w-full rounded-xl px-3 h-11 bg-[#f1f3f4] text-[14px] text-[#202124] placeholder-[#9aa0a6] transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>

          {/* {isError ? <p></p>} */}

          <button 
            className="w-full rounded-xl h-11 mt-4 bg-blue-500 text-[14px] text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccountBox;