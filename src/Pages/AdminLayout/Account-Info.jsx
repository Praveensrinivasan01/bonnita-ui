import React from 'react'
import { Link } from 'react-router-dom'

const AccountInfo = () => {
  return (
    <div>
    <Link to="/admin/forgot-Password">
        <button className='btn btn-primary pt-2 pb-2'>Click to Change Password</button>
    </Link>
    </div>
  )
}

export default AccountInfo