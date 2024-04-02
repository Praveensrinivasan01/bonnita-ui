import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../Styles/Login.css'
import { loginStore } from '../../Zustand/loginStore'
import { UserDetails, setUserData } from '../../Zustand/userDetails'
import { AuthContext } from '../../Context/AuthContext'
import { handleInputValidation } from '../../Helper/validator'

const UserRegister = () => {
  const [email, setEmail] = useState('')
  const [firstname, setfirstName] = useState('')
  const [lastname, setlastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowConfirmPassword] = useState(false)

  const Navigate = useNavigate()
  const state2 = loginStore(state => state.login)

  useEffect(() => {
    if (state2?.id) {
      Navigate('/')
    }
  })

  const { fetchData } = useContext(AuthContext)
  useEffect(() => {
    fetchData()
  }, [])
  const handleSignup = async e => {
    e.preventDefault()
    if (!email || !firstname || !lastname || !mobile) {
      toast.error('Please fill in all the  fields')
      return
    }

    if (mobile?.length < 10) {
      toast.error('Please enter valid mobile number')
      return
    }
    if (mobile?.length >= 10) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/signup`,
          {
            email,
            firstname,
            lastname,
            mobile
          }
        )

        console.log(response, 'test')
        if (password === ConfirmPassword) {
          if (response.data.statusCode === 200) {
            console.log('success')
            setUserData({
              email,
              firstname,
              lastname,
              mobile
            })
            Navigate('/userLogin')
          } else if (response.data.statusCode === 400) {
            console.log('Email already exists')
            toast.error(response.data.message)
          } else {
            console.log('fucked')
          }
        } else {
          toast.error('Password do not match')
        }
      } catch (error) {}
    } else {
      toast.error('Please enter valid mobile number')
    }
  }

  console.log(mobile, 'mobile')

  const [navigateToOtp, setNavigateToOtp] = useState(false)
  return (
    <div>
      <section className=' container-md PaddingTop'>
        <p>
          <Link to='/'>
            <span>Home</span>
          </Link>
          /Account
        </p>
        <h5 className='text-center fs-2 fw-medium mb-4'>Register</h5>

        <div className='row d-flex gap-4 justify-content-center mb-5'>
          <div className='col-md-5 border-1 p-4  order-md-0 order-1'>
            <h4 className='fs-3 fw-medium mb-4'>Login</h4>
            <h5 className='fs-6 fw-medium mb-4'>
              You already have an account please sign in
            </h5>
            <Link to='/UserLogin'>
              <button className='button1 color-2'>Sign in</button>
            </Link>
          </div>

          <div className='col-md-5 border-1 p-4 order-md-1 order-0'>
            <h6 className='fs-5 fw-medium'>Register</h6>
            <form onSubmit={handleSignup} className='mt-8  gap-6'>
              <div className=' mb-3'>
                <label
                  for='FirstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  FirstName *
                </label>

                <input
                  type='text'
                  name='firstname'
                  id=''
                  placeholder='Enter First Name '
                  value={firstname}
                  onChange={e =>
                    handleInputValidation(e.target.value, setfirstName, 0)
                  }
                  className='w-full px-3 py-3  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                  autofocus
                  autocomplete
                />
              </div>
              <div className=' mb-3'>
                <label
                  for='FirstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last Name *
                </label>

                <input
                  type='text'
                  name='LastName'
                  id=''
                  placeholder='Enter Last Name '
                  value={lastname}
                  onChange={e =>
                    handleInputValidation(e.target.value, setlastName, 0)
                  }
                  className='w-full px-3 py-3  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                  autofocus
                  autocomplete
                />
              </div>
              <div className=' mb-3'>
                <label
                  for='FirstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address *
                </label>

                <input
                  type='email'
                  name=''
                  id=''
                  placeholder='Enter Email id'
                  value={email}
                  onChange={e =>
                    handleInputValidation(e.target.value, setEmail, 4)
                  }
                  className='w-full px-3 py-3  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                  autofocus
                  autocomplete
                />
              </div>

              <div className='mb-3'>
                <label
                  for='PhoneNumber'
                  className='block text-sm font-medium text-gray-700'
                >
                  Phone Number *
                </label>

                <input
                  type='tel'
                  name='phoneNumber'
                  id='PhoneNumber'
                  placeholder='Enter Phone Number'
                  value={mobile}
                  onChange={e => {
                    handleInputValidation(e.target.value, setMobile, 2)
                  }}
                  className='w-full px-3 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                  autoFocus
                />
              </div>

              <button type='submit' className='button1 color-2 mt-4 w-100'>
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserRegister
