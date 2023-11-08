 import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-200">
        <Sidebar/>
        <div className='flex flex-col flex-1 overflow-hidden'>
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container px-6 py-8 mx-auto">
                    <Outlet/>
                </div>
            </main>        
        </div>
    </div>
  )
}

export default Admin