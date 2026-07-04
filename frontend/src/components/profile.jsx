import React from 'react'
import "../styles/profile.css"

const Profile = () => {
  return (
    <div className="relative mx-5 my-5 z-[1000]" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
      <button className="bg-white w-11 h-11 rounded-full flex items-center justify-center transition-all hover:ring-2 hover:ring-[#1a73e8]/30 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>
    </div>
    
  )
}

export default Profile