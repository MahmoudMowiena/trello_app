import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
    <div className="container mx-auto flex items-center justify-between">
      <div className="text-xl font-bold flex items-center">
        Trello
      </div>
      {/* <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Account
        </button>
      </div> */}
    </div>
  </nav>
  )
}
  export default Navbar
