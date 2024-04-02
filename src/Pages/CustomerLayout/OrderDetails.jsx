import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrencyStore } from "../../Zustand/currency";
import { Modal } from 'flowbite-react';
import Upload from "../../Components/Upload";
import OrderTracking from "../../Components/OrderTrack";
import { loginStore } from "../../Zustand/loginStore";
import PaymentInformation from "./PaymentInformation";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
// import {
//   Modal,
// } from "@nextui-org/modal";
export const CustomerOrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [payment, setPayment] = useState({})
  const currencyType = useCurrencyStore((state) => state?.currencyCode)
  const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)
  const [isDeleteModel, setDeleteModel] = useState(false)

  useEffect(() => {
    getAllOrders()
  }, [])

  const { fetchData } = useContext(AuthContext);
  useEffect(() => {
    fetchData();
  }, []);

  const getOrderDetails = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/get-order-items/${id}`
      );
      if (response?.data?.statusCode === 200) {
        console.log(response?.data?.payment, "paymet")
        setOrderDetails(response?.data?.data);
        if (response?.data?.payments.length) {
          setPayment(response?.data?.payments[0])
        }

      }
    } catch (error) { }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const CancleOrder = async (id) => {
    try {
      console.log(id)
    } catch (error) {

    }
  }
  console.log(orderDetails, "orderDetails");
  const userId = loginStore((state) => state.login);
  console.log(userId, "userId")
  const [otherReason, setOtherReason] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [refundReason, setRefundReason] = useState('');

  const handleRadioChange = (type, reason) => {
    if (type === 'RETURN') {
      setReturnReason(reason);
      setOtherReason('');
    } else if (type === 'REFUND') {
      setRefundReason(reason);
      setOtherReason('');
    }
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
    // setReturnReason('');
  };

  console.log(orderDetails[0]?.status, "orderDetails.status")
  const [selectedFile, setSelectedFile] = useState(null)
  const [ReturnModel, setReturnModel] = useState(false)
  const [type, setType] = useState()
  const [selectedFileName, setSelectedFileName] = useState(null)
  const [orderStatus, setOrderStatus] = useState([])
  console.log(orderStatus, "orderStatus")

  const getAllOrders = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/get-complaints/${id}`)
      console.log(res?.data?.compaints, "responseGell")
      setOrderStatus(res?.data?.compaints)
    } catch (error) {

    }
  }

  console.log(orderStatus, "orderStatus")

  const handleReturn = async (type) => {
    // e.prevetDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    const isFormDataValid = !Array.from(formData.values()).some(
      (value) => value === null || value === undefined
    );
    console.warn(formData);
    if (isFormDataValid) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/product/upload-image`,
          formData
        );
        if (response?.data?.statusCode === 200) {
          console.log(response, "response")
          const body = {
            order_id: id,
            reason: otherReason ? otherReason : returnReason,
            image_id: response?.data?.image?.id,
            complaint_type: type,
            user_id: userId?.id,
            status: "RAISEDAREQUEST "
          }

          const url = `${process.env.REACT_APP_API_URL}/order/raise-complaint`

          const res = await axios.post(url, body)
          console.log(res, "responsePost")
          if (response.data.statusCode === 200) {
            console.log(response, "in if")
            toast.success(res.data.message);
            setReturnModel(false);
            setSelectedFile('')
            setSelectedFileName('')
            getOrderDetails()
          } else {
            // toast.error(response.data.message)
            console.log(res.data.message, "in else")
          }
        }
        console.log(response, "response")
      } catch (error) {

      }
    }
  }


  const handleCancelOrder = async () => {
    try {
      const body = {
        order_id: id,
        status: "CANCELLED"
      }
      const usersResponse = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change-order-status`, body)
      if (usersResponse?.data?.statusCode === 200) {
        console.log(usersResponse)
        setDeleteModel(false);
        getOrderDetails();
        toast.success(usersResponse.data.message)
        // getAllOrders();
      }
    } catch (error) {

    }
  }




  const refundOptions = [
    { value: 'WrongCharge', description: 'Incorrect amount charged on my Bonnita order.' },
    { value: 'CancelledOrder', description: 'Order was cancelled, but I was still charged by Bonnnita.' },
    { value: 'DoubleCharge', description: 'Charged twice for the same Bonnita order.' },
    { value: 'RefundPolicy', description: 'Not satisfied with Bonnita\'s refund policy.' },
    { value: 'OtherRefund', description: 'Other reason for refund on my Bonnita order' },
  ];

  const [ComplaintDetails, setComplaintDetails] = useState(false)


  const returnOptions = [
    { value: 'Damaged', description: 'Product arrived damaged.' },
    { value: 'WrongItem', description: 'Received the wrong item.' },
    { value: 'ChangedMind', description: 'Changed my mind about the purchase.' },
    { value: 'SizeIssue', description: 'Size doesn\'t fit as expected.' },
    { value: 'NotAsExpected', description: 'Product doesn\'t meet expectations.' },
    // { value: 'DuplicateOrder', description: 'Accidentally placed a duplicate order.' },
    // { value: 'Defective', description: 'Product has a manufacturing defect.' },
    { value: 'Other', description: 'Other reason' },
  ];

  console.log(orderStatus, "payment?.discount + payment?.bounus")
  return (
    <div className=" container-md">
      <h1 className="md:pt-32 pt-20 font-semibold pb-10">
        <Link to={-1} className="text-gray-600">
          OrderDetails
        </Link>
        /<span>id</span>
      </h1>

      {/* <div className="max-w-sm rounded overflow-hidden shadow-md ">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Address</div>
          <p className="text-gray-700 text-base"></p>
        </div>
      </div> */}
      <OrderTracking orderStatus={orderDetails[0]?.status} orderDetails={orderDetails.length ? orderDetails[0] : {}} />
      <PaymentInformation data={orderDetails.length ? orderDetails[0] : {}} paymentDetails={payment ? payment : {}} />
      <div className="flex justify-between items-center ">
        <div className="font-bold text-xl">Product Info</div>
        {(
          orderDetails[0]?.status === "PENDING" ||
          orderDetails[0]?.status === "READYTOSHIP" ||
          orderDetails[0]?.status === "PACKED" ||
          orderDetails[0]?.status === "ONTHEWAY"
        ) && (
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-red-900"
              onClick={() => setDeleteModel(true)}
            >
              Cancel Order
            </button>
          )}

        {
          (orderDetails[0]?.status === "DELIVERED" || orderDetails[0]?.status === "RAISEDAREQUEST") &&
          <div className="flex gap-3 items-center">
            {
              orderStatus &&
                orderStatus?.complaint_type ?
                <>
                  {
                    orderStatus?.complaint_type === "RETURN" ?
                      <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={() => (setComplaintDetails(true))}
                      >
                        View Complaint Details</button>
                      :
                      <button class="text-white bg-[#FF9119] hover:bg-[#FF9119]/95 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                        onClick={() => (setComplaintDetails(true))}
                      >
                        View Complaint Details
                      </button>
                  }
                </>
                :
                <>
                  <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    onClick={() => (setReturnModel(true), setType("RETURN"))}
                  >
                    Raise A Request To Return</button>
                  <button class="text-white bg-[#FF9119] hover:bg-[#FF9119]/95 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                    onClick={() => (setReturnModel(true), setType("REFUND"))}
                  >
                    Raise A Request To Refund
                  </button>
                </>
            }
          </div>
        }
      </div>



      <div className="title pb-4">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 ps-0 text-sm font-normal text-left text-gray-500"
                      >
                        Order Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {orderDetails?.map((item) => {
                      return (
                        <>
                          <tr style={{ cursor: "pointer" }}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap flex item-center">
                              <img src={item.front_side} alt="#" className="w-32" />
                              <div className="flex flex-col">
                                <p className="text-gray-700 text-base lg:mt-10 lg:ms-3">{item.name}</p>
                                <p className="text-gray-700 text-base  lg:ms-3">{item.created_date}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <p>{item.quantity}</p>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 className="font-medium text-gray-800 ">
                                  <p>{currencyType.symbol}{currencyConversion(item.price)}</p>
                                </h2>
                              </div>
                            </td>
                            <td>
                              <p className={`text-capitalize text-sm ${item?.status === "CANCELLED" ? "text-red-500" : "text-green-500"}`} >{item.status === "PENDING" ? "Order Placed" : item.status === "READYTOSHIP" ? "Shipped" : item.status}</p>
                            </td>
                          </tr>
                        </>

                      )
                    })}

                  </tbody>
                  {payment ?
                    <>
                      <tr className="text-center ">
                        Order Summary
                      </tr>
                      <tr className="first-tr-style mx-auto ">
                        <td className="text-center pt-2">
                          SUB TOTAL
                        </td>
                        <td >
                          {currencyType.symbol}{currencyConversion(payment?.order_total)}
                        </td>

                      </tr>
                      <tr className="tr-style">

                        <td className="text-center pt-2" >
                          DISCOUNT/REDEEM
                        </td>
                        <td >
                          {currencyType.symbol}{currencyConversion(payment?.discount ? payment?.discount : payment?.bonus ?? 0)}
                        </td>
                      </tr>
                      <tr className="tr-style">
                        <td className="text-center pt-2">
                          SHIPPING CHARGES
                        </td>
                        <td >
                          {currencyType.symbol}{currencyConversion(payment?.shipping_amount)}
                        </td>
                      </tr>
                      <tr className="tr-style">
                        <td className="text-center pt-2" >
                          TOTAL
                        </td>
                        <td >
                          {currencyType.symbol}{currencyConversion(payment?.total)}
                        </td>
                      </tr></> : ""}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>




      <Modal show={isDeleteModel} onClose={() => setDeleteModel(false)}>
        <Modal.Body>
          <div class="p-4 md:p-5 text-center">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Cancel this product?</h3>
            <button data-modal-hide="popup-modal" type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              onClick={(e) => handleCancelOrder(e)}
              on>
              Yes, I'm sure
            </button>
            <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setDeleteModel(false)}
            >No, cancel</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={ComplaintDetails} onClose={() => setComplaintDetails(false)}>
        <Modal.Body>
          <div class="p-4 md:p-5 text-center">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {
              <>
                <h3 class="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">Reason - <span>{orderStatus?.reason}</span></h3>
                <h3 class="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">Status - <span>{orderStatus?.status}</span></h3>
                <h3 class=" mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">Complaint Type - <span>{orderStatus?.complaint_type}</span></h3>
                {
                  orderStatus?.response &&
                  <h3 class="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">Response - <span>{orderStatus?.response}</span></h3>
                }
              </>

            }
            <button data-modal-hide="popup-modal" type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              onClick={(e) => setComplaintDetails(false)}
              on>
              Cancel
            </button>
            {/* <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setDeleteModel(false)}
            >No, cancel</button> */}
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={ReturnModel} onClose={() => { setReturnModel(false); setSelectedFile(null) }} className="pt-36">
        <Modal.Body className=''>
          <div>
            <form>
              <div>
                <div>
                  <div>
                    {
                      selectedFile ? (
                        <div className='flex justify-center '>
                          <div>
                            <div className='flex flex-col justify-center items-center'>
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected File Preview" id="imageFile"
                                className='img-fluid '
                              />
                              <div className='flex items-center gap-3 pt-3'>
                                <p className=' font-semibold text-lg text-listing'><span className='text-black' >File Name :</span> {selectedFileName}</p>
                                <img src="https://pro-manage.s3.ap-south-1.amazonaws.com/PostMedia.svg" alt='ProfileDelete' className='cursor-pointer' onClick={() => setSelectedFile(null)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                        :
                        <>
                          <Upload setSelectedFileName={setSelectedFileName} setSelectedFile={setSelectedFile} />
                        </>
                    }
                    <div className="space-y-4 mt-3">
                      {type === 'RETURN' ?
                        returnOptions.map((option) => (
                          <label key={option.value} className="flex items-center gap-3">
                            <input
                              type="radio"
                              className="form-radio text-blue-500"
                              name="returnReason"
                              value={option.value}
                              checked={returnReason === option.value}
                              onChange={() => handleRadioChange('RETURN', option.value)}
                            />

                            <strong>{option.value}</strong> - {option.description}
                          </label>
                        )) :
                        refundOptions.map((option) => (
                          <label key={option.value} className="flex items-center gap-3">
                            <input
                              type="radio"
                              className="form-radio text-blue-500"
                              name="refundReason"
                              value={option.value}
                              checked={refundReason === option.value}
                              onChange={() => handleRadioChange('REFUND', option.value)}
                            />

                            <strong>{option.value}</strong> - {option.description}
                          </label>
                        ))
                      }

                      {((type === 'RETURN' && returnReason === 'Other') || (type === 'REFUND' && refundReason === 'OtherRefund')) && (
                        <label className="block">
                          <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            value={otherReason}
                            onChange={handleOtherReasonChange}
                          ></textarea>
                        </label>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className='pt-0 justify-end'>
          <div className="flex justify-end gap-3 mt-4">
            <button
              color="gray"
              onClick={() => { setReturnModel(false); setSelectedFile(null) }}
              className="px-4 py-2 text-md font-medium text-center border-1 text-gray  rounded-lg focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-md font-medium text-center text-white bg-red-400 rounded-lg hover:bg-listing focus:outline-none"
              onClick={() => handleReturn(type)}
            >
              Upload
            </button>
          </div>
        </Modal.Footer>
      </Modal>



    </div>
  );
};
