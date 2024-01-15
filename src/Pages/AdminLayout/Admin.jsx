 import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="flex h-full bg-gray-200 overflow-y-scroll">
        <Sidebar/>
        <div className='flex flex-col flex-1 '>
            <main class="flex-1  bg-gray-200">
                <div class="container px-6 py-8 mx-auto">
                    <Outlet/>
                </div>
            </main>        
        </div>
    </div>
  )
}

export default Admin