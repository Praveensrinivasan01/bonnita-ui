import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DeliveryCharges = () => {
  const [modal, setModal] = useState(false)
  const [DelivaryCharges, setDelivaryCharges] = useState()
  const [state, setState] = useState()
  const [Charges, SetCharges] = useState()
  const handleClose = () => {
    setModal(false)
    setEditMode(false)
    SetCharges('')
    setState('')
  }

  useEffect(() => {
    GetDelivaryCharges()
  }, [])

  console.log(modal, 'modal', DelivaryCharges)

  const handleDelivaryCharges = async () => {
    try {
      const body = {
        state: state,
        amount: Charges
      }
      const usersResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/add-delivery-charge`,
        body
      )
      if (usersResponse?.data?.statusCode === 200) {
        toast.success(usersResponse.data.message)
        setModal(false)
        GetDelivaryCharges()
        setState('')
        SetCharges('')
      } else {
        toast.error(usersResponse.data.message)
        setModal(false)
        setState('')
        SetCharges('')
      }
    } catch (error) {
      toast.error(error?.usersResponse.data.message)
      setModal(false)
      setState('')
      SetCharges('')
    }
  }

  const GetDelivaryCharges = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-delivery-charges`
      )
      if (response?.data?.statusCode === 200) {
        setDelivaryCharges(response.data.data)
      }
    } catch (error) {}
  }

  const [editMode, setEditMode] = useState(false)
  const [editID, setEditID] = useState()

  const editDelivary = DelivaryInfo => {
    setEditMode(true)
    setModal(true)
    setState(DelivaryInfo?.state)
    setEditID(DelivaryInfo?.id)
    SetCharges(DelivaryInfo?.amount)
  }

  const handleEditDelivaryCharges = async id => {
    try {
      const body = {
        id: editID,
        state: state,
        amount: Charges
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/update-delivery-charge`,
        body
      )
      if (response?.data?.statusCode === 200) {
        toast.success(response.data.message)
        setModal(false)
        setEditMode(false)
        setState('')
        SetCharges('')
        GetDelivaryCharges()
      } else {
        toast.error(response.data.message)
        setModal(false)
        setState('')
        SetCharges('')
      }
    } catch (error) {
      toast.error(error?.response.data.message)
      setModal(false)
      setState('')
      SetCharges('')
    }
  }

  const handleDelete = async id => {
    try {
      let body = {
        id: id
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/delete-delivery-charge`,
        body
      )
      if (response.data?.statusCode === 200) {
        toast.success(response.data.message)
        GetDelivaryCharges()
      }
    } catch (error) {}
  }

  const indianStates = [
    { name: 'Other States', value: 'Other States' },
    { name: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { name: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { name: 'Assam', value: 'Assam' },
    { name: 'Bihar', value: 'Bihar' },
    { name: 'Chhattisgarh', value: 'Chhattisgarh' },
    { name: 'Goa', value: 'Goa' },
    { name: 'Gujarat', value: 'Gujarat' },
    { name: 'Haryana', value: 'Haryana' },
    { name: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { name: 'Jharkhand', value: 'Jharkhand' },
    { name: 'Karnataka', value: 'Karnataka' },
    { name: 'Kerala', value: 'Kerala' },
    { name: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { name: 'Maharashtra', value: 'Maharashtra' },
    { name: 'Manipur', value: 'Manipur' },
    { name: 'Meghalaya', value: 'Meghalaya' },
    { name: 'Mizoram', value: 'Mizoram' },
    { name: 'Nagaland', value: 'Nagaland' },
    { name: 'Odisha', value: 'Odisha' },
    { name: 'Punjab', value: 'Punjab' },
    { name: 'Rajasthan', value: 'Rajasthan' },
    { name: 'Sikkim', value: 'Sikkim' },
    { name: 'Tamil Nadu', value: 'Tamil Nadu' },
    { name: 'Telangana', value: 'Telangana' },
    { name: 'Tripura', value: 'Tripura' },
    { name: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { name: 'Uttarakhand', value: 'Uttarakhand' },
    { name: 'West Bengal', value: 'West Bengal' }
  ]

  return (
    <div>
      <button
        class='flex items-center justify-center w-1/2 px-3 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-slate-900 shrink-0 sm:w-auto gap-x-2 hover:border-gray-700 border-transparent border-2'
        onClick={() => {
          setModal(true)
          SetCharges('')
          setState('')
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='w-5 h-5'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span>Add Delivery Charges</span>
      </button>
      <div class='flex flex-col mt-6'>
        <div class='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div class='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div class='overflow-hidden border border-gray-200 md:rounded-lg'>
              <>
                <table class='min-w-full divide-y divide-gray-200'>
                  <thead class='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        class='py-3.5 px-4 text-sm font-normal text-left text-gray-500'
                      >
                        Sl.No
                      </th>
                      <th
                        scope='col'
                        class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                      >
                        State
                      </th>
                      <th
                        scope='col'
                        class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                      >
                        Delivary Charges
                      </th>
                      <th
                        scope='col'
                        class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class='bg-white divide-y divide-gray-200'>
                    {DelivaryCharges?.map((user, index) => {
                      return (
                        <>
                          <tr>
                            <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                              <div>
                                <h2 class='font-medium text-gray-800 '>
                                  {index + 1}
                                </h2>
                              </div>
                            </td>

                            <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                              <div>
                                <h2 class='font-medium text-gray-800 '>
                                  {user?.state}
                                </h2>
                              </div>
                            </td>

                            <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                              <div>
                                <h2 class='font-medium text-gray-800 '>
                                  {user?.amount}
                                </h2>
                              </div>
                            </td>
                            <td className='px-4 py-4 text-sm whitespace-nowrap flex gap-2'>
                              <button
                                onClick={() => editDelivary(user)}
                                type='button'
                                className='px-3 py-2 text-sm font-medium text-center text-white border-2 border-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-200'
                              >
                                <svg
                                  width='16'
                                  height='16'
                                  viewBox='0 0 16 16'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M13.968 2.032C13.5207 1.58467 12.914 1.33337 12.2813 1.33337C11.6487 1.33337 11.042 1.58467 10.5947 2.032L2.62667 10C2.35586 10.2708 2.16547 10.6114 2.07667 10.984L1.34667 14.052C1.3269 14.1351 1.32876 14.2219 1.35205 14.3041C1.37535 14.3862 1.41931 14.4611 1.47974 14.5214C1.54018 14.5818 1.61507 14.6257 1.69727 14.6489C1.77948 14.6721 1.86626 14.6739 1.94934 14.654L5.01667 13.9233C5.38946 13.8346 5.73033 13.6442 6.00134 13.3733L13.968 5.40667C14.4153 4.95933 14.6666 4.35262 14.6666 3.72C14.6666 3.08738 14.4153 2.48067 13.968 2.03333V2.032ZM11.3013 2.73867C11.43 2.60997 11.5828 2.50788 11.751 2.43823C11.9191 2.36858 12.0993 2.33274 12.2813 2.33274C12.4633 2.33274 12.6436 2.36858 12.8117 2.43823C12.9799 2.50788 13.1326 2.60997 13.2613 2.73867C13.39 2.86736 13.4921 3.02015 13.5618 3.18829C13.6314 3.35644 13.6673 3.53666 13.6673 3.71867C13.6673 3.90067 13.6314 4.08089 13.5618 4.24904C13.4921 4.41719 13.39 4.56997 13.2613 4.69867L12.6667 5.29267L10.7067 3.33333L11.3013 2.73933V2.73867ZM10 4.04133L11.96 6L5.29334 12.6667C5.15334 12.8067 4.97734 12.9047 4.78467 12.9507L2.50734 13.4933L3.04934 11.216C3.09534 11.0227 3.194 10.8467 3.334 10.7067L10 4.04V4.04133Z'
                                    fill='black'
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={e => {
                                  handleDelete(user?.id)
                                }}
                                type='button'
                                className='px-3 py-2 text-sm font-medium text-center text-white border-2 border-red-200 focus:ring-1 focus:outline-none focus:ring-red-200'
                              >
                                <svg
                                  width='16'
                                  height='16'
                                  viewBox='0 0 16 16'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M4.66666 14C4.29999 14 3.98599 13.8693 3.72466 13.608C3.46332 13.3467 3.33288 13.0329 3.33332 12.6667V4H2.66666V2.66667H5.99999V2H9.99999V2.66667H13.3333V4H12.6667V12.6667C12.6667 13.0333 12.536 13.3473 12.2747 13.6087C12.0133 13.87 11.6995 14.0004 11.3333 14H4.66666ZM11.3333 4H4.66666V12.6667H11.3333V4ZM5.99999 11.3333H7.33332V5.33333H5.99999V11.3333ZM8.66666 11.3333H9.99999V5.33333H8.66666V11.3333Z'
                                    fill='#EE7B7B'
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size='2xl'
        scrollBehavior='inside'
        backdrop='blur'
        isOpen={modal}
        onOpenChange={handleClose}
      >
        <ModalContent>
          {/* <ModalHeader className="flex flex-col gap-1">
            {editmode ? "Edit Category" : "Add Category"}
          </ModalHeader> */}
          <h2 className='pt-4 ps-4 pb-2'>
            {editMode ? 'Edit Delivary Charged' : 'Add Delivary Charged'}{' '}
          </h2>
          <ModalBody>
            <select
              className='h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full'
              id='stateSelect'
              value={state}
              onChange={e => {
                setState(e.target.value)
              }}
              required
            >
              <option value=''>Select a state</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state.value}>
                  {state.name}
                </option>
              ))}
            </select>
            <div className=''>
              <label className='block mb-2 text-sm font-medium text-gray-900'>
                Delivary Charges
              </label>
              <div className='rounded overflow-hidden'>
                <input
                  type='tel'
                  value={Charges}
                  onChange={e => SetCharges(e.target.value)}
                  width={10}
                  className='h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full'
                  placeholder='Charges'
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='button'
              class='px-3 py-2 text-sm font-medium text-center text-white bg-red-400  hover:bg-red-300 '
              onClick={() => {
                editMode ? handleEditDelivaryCharges() : handleDelivaryCharges()
              }}
            >
              Save
            </button>
            <button
              type='button'
              className='px-3 py-2 text-sm font-medium text-center text-red-400 border-2  border-red-400  bg-white  hover:bg-red-300 focus:outline-none'
              onClick={handleClose}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Edit Modal */}
    </div>
  )
}

export default DeliveryCharges
