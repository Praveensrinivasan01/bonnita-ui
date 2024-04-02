import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import download from '../../Assets/Icons/Download.svg'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import html2pdf from 'html2pdf.js'
import logoImage from '../../Assets/Logo/LogoForBonnita.jpg'

const OrderDetails = () => {
  const [data, setData] = useState([])
  // const [Status, setStatus] = useState()
  const { id } = useParams()

  console.log(id, 'id')

  useEffect(() => {
    getAllOrders()
  }, [id])

  useEffect(() => {
    getOrdersDetails()
  }, [id])
  const getOrdersDetails = async () => {
    const usersResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/get-order-details/${id}`
    )
    if (usersResponse?.data?.statusCode === 200) {
      console.log(usersResponse, 'usersResponse')
      console.log(usersResponse?.data?.customers[0]?.compaints?.firstname)
      setData(usersResponse?.data?.customers)
    }
  }
  const PostStatus = async Status => {
    const body = {
      order_id: id,
      status: Status
    }
    const usersResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/change-order-status`,
      body
    )
    if (usersResponse?.data?.statusCode === 200) {
      console.log(usersResponse)
      toast.success('Order Status Updated')
      // setData(usersResponse.data.customers)
    }
  }

  const [orderStatus, setOrderStatus] = useState([])
  const getAllOrders = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/get-complaints/${id}`
      )
      console.log(res, 'responseGell')
      if (res?.data?.statusCode === 200) {
        setOrderStatus(res?.data)
      } else {
        setOrderStatus([])
      }
    } catch (error) {}
  }

  const handleAccept = async e => {
    try {
      const body = {
        status: 'APPROVED',
        order_id: id,
        response: ''
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/update-complaint`,
        body
      )
      console.log(response)
    } catch (error) {}
  }

  const handleReject = async () => {
    try {
      const body = {
        status: 'REJECTED',
        order_id: id,
        response: ''
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/update-complaint`,
        body
      )
      console.log(response)
    } catch (error) {}
  }

  console.log(orderStatus?.image?.imageData, 'orderStatus')

  // const downloadInvoice = () => {
  //   const doc = new jsPDF()

  //   // Tailwind CSS classes
  //   const tw = {
  //     container: 'container mx-auto',
  //     text: 'text-base',
  //     bold: 'font-bold',
  //     italic: 'italic',
  //     underline: 'underline',
  //     bgBlue: 'bg-blue-500',
  //     textWhite: 'text-white',
  //     textGray: 'text-gray-700',
  //     border: 'border border-gray-400',
  //     p: 'p-2',
  //     mt: 'mt-2',
  //     ml: 'ml-2',
  //     mr: 'mr-2'
  //   }

  //   const logoHeight = 20
  //   const logoWidth = 20
  //   doc.addImage(logoImage, 'PNG', 10, 10, logoWidth, logoHeight)

  //   doc.setFontSize(12)
  //   doc.setFont('', 'normal')

  //   const addressSpacing = 10
  //   const fromAddressY = 10 + logoHeight + addressSpacing
  //   const toAddressY = fromAddressY + 30

  //   doc.text('From:', 10, fromAddressY)
  //   doc.text('Your Address Line 1', 10, fromAddressY + 10)
  //   doc.text('Your Address Line 2', 10, fromAddressY + 20)
  //   doc.text('City, State, Postal Code', 10, fromAddressY + 30)

  //   doc.text('To:', 120, fromAddressY)
  //   doc.text('Customer Address Line 1', 120, fromAddressY + 10)
  //   doc.text('Customer Address Line 2', 120, fromAddressY + 20)
  //   doc.text('City, State, Postal Code', 120, fromAddressY + 30)

  //   // Billing Details
  //   doc.text('Billing Details:', 10, toAddressY + 20)
  //   doc.text('Bill To: Customer Name', 10, toAddressY + 30)
  //   doc.text('Invoice Date: 12 Oct 2023', 10, toAddressY + 40)
  //   doc.text('GSTIN: ABCDE12345FGH', 10, toAddressY + 50)

  //   const columns = ['#', 'Product', 'Quantity', 'Price']
  //   const rows = [
  //     [1, 'Vegan Leather Bag', 'x1', '₹ 300.00']
  //     // Add more rows as needed
  //   ]

  //   doc.autoTable({
  //     head: [columns],
  //     body: rows,
  //     startY: toAddressY + 60,
  //     margin: { top: toAddressY + 60 },
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 3,
  //       fillColor: [200, 200, 200],
  //       textColor: [0, 0, 0],
  //       halign: 'center',
  //       valign: 'middle',
  //       fontStyle: 'normal',
  //       lineWidth: 0.1
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 10 }
  //     },
  //     alternateRowStyles: {
  //       fillColor: [255, 255, 255]
  //     },
  //     headerStyles: {
  //       fillColor: [51, 122, 183],
  //       textColor: [255, 255, 255],
  //       halign: 'center',
  //       fontStyle: 'bold'
  //     }
  //   })

  //   doc.save(`${data[0]?.username} invoice.pdf`)
  // }

  const generatePDF = (htmlContent, outputPath) => {
    html2pdf().from(htmlContent).toPdf().save(outputPath)
  }

  const htmlContent = ` 
  <style>
  body{
    font-family: Arial, Helvetica, sans-serif !important; 
  font-size: 14px !important; 
  line-height: 1.5 !important;
  }
  table{
    border-collapse: collapse !important;
    width:100% !important;
  }
  table tr td{
padding:20px !important;
  }
.productdetails td{
  border: 1px solid #cccccc !important;
}
.productdetails th{
  border: 1px solid #cccccc !important;
  text-align:center;
}
  </style>
  
  <body >
    <table cellspacing="2" cellpadding="2" ">

    <tr>
    <td colspan="2" style="border-bottom: 1px solid #cccccc;">
        <img src="${logoImage}" alt="Bonnita-logo">
    </td>
    <td colspan="1" style="border-bottom: 1px solid #cccccc; text-align: right;">
        <strong>TAX INVOICE</strong>
    </td>
</tr>

<tr>
 <td colspan="2" style="border-bottom: 1px solid #cccccc; text-align: right;"></td>
    <td colspan="1" style="border-bottom: 1px solid #cccccc; text-align: right;">
        <ul style="list-style: none;">
            <li>
                <strong>Invoice no:</strong> <span>${
                  data[0]?.invoice_num
                }</span>
            </li>
            <li>
                <strong>Order no:</strong> <span>${data[0]?.order_id}</span>
            </li>
            <li>
                <strong>Order Date:</strong> <span>${data[0]?.createdat}</span>
            </li>
            <li>
                <strong>Place Of Supply:</strong> <span>${data[0]?.state}</span>
            </li>
        </ul>
       
    </td>
</tr>
<tr valign="baseline" >
    <td  colspan="1" style="border-bottom: 1px solid #cccccc;">
        <ul style="list-style: none;">
            <li style="text-transform:uppercase;">
              <h4>
                Billed from <strong>BONNITA </strong>
              </h4>
            </li>
            <li>
            No.4. Noombal Main Road, ICL Home Town,
            Noombal, Velappanchavadi Chennai - 600 077 <br> Tamil Nadu | IN.
            </li>
            <li>
                <strong>Phone no:</strong> <span>+91-8220773182</span>
            </li>
            <li style="text-transform:uppercase;">
                <strong>GSTIN:</strong> <span>33ALRPR6315H1ZT</span>
            </li>
        </ul>
       
    </td>
    <td  colspan="1" style="border-bottom: 1px solid #cccccc;">
        <ul style="list-style: none;">
            <li style="text-transform:uppercase;">
              <h4>
                Billed to <strong>${data[0]?.username} </strong>
              </h4>
            </li>
            <li>
            ${data[0]?.room_no} 
            ${data[0]?.address_line1}<br>
            ${data[0]?.address_line2}<br>
            ${data[0]?.city} <span>${data[0]?.zip_code}</span> <br>
            ${data[0]?.state} | IN. 
            </li>
          
           
        </ul>
       
    </td>
    <td  colspan="1" style="border-bottom: 1px solid #cccccc;">
        <ul style="list-style: none;">
            <li style="text-transform:uppercase;">
              <h4>
                Billed to <strong>${data[0]?.username} </strong>
              </h4>
            </li>
            <li>
            ${data[0]?.room_no} 
            ${data[0]?.address_line1}<br>
            ${data[0]?.address_line2}<br>
            ${data[0]?.city} <span>${data[0]?.zip_code}</span> <br>
            ${data[0]?.state} | IN. 
            </li>
          
           
        </ul>
       
    </td>
</tr>
    </table >
   
    <table class="productdetails" style="border-collapse: collapse; width: 100%; margin-top: 20px;" cellspacing="4" cellpadding="10" style="width: 100%;" border="1">
   
<tr>
    <th rowspan="2">Product</th>
    <th rowspan="2">Unit Price</th>
    <th rowspan="2">Discount</th>
    <th rowspan="2">Qty</th>
    <th rowspan="2">Taxable Amount</th>
    <th colspan="3">Tax</th>
    <th rowspan="2">
        Total
    </th>
</tr>
<tr>
    <th>Name</th>
    <th>Rate</th>
    <th>Amount</th>
</tr>
${data.map(
  item => `
<tr>

    <td>
    ${item?.name}
    </td>
    <td style="text-align: center;">
    ₹${item?.total}
    </td>
    <td style="text-align: center;">
    ${item?.dicsount ? item?.dicsount : 0}
        </td>
        <td style="text-align: center;">
        ${item?.quantity}
        </td>
        <td style="text-align: center;">
        ₹${item?.price - item?.tax}
            </td>
            <td style="text-align: center;">
                IGST (inclusive)
                </td>  
                <td style="text-align: center;">
               ${((item?.tax / item?.price) * 100).toFixed(2)}%
                </td> 
                <td style="text-align: center;">₹${item?.tax}</td>
                <td style="text-align: center;">₹${item?.price + item?.tax}</td>
             
</tr>
`
)}




    </table>
    
</body>
  
  `

  const outputPath = `${data[0]?.username} Invoice.pdf`

  return (
    <>
      <div class='bg-white group grid w-full grid-cols-12 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto'>
        <div class='col-span-11 flex flex-col pr-8 text-left sm:pl-4'>
          {/* <h3 class="text-sm text-gray-600">User Name</h3> */}

          <p class='overflow-hidden pr-7 text-lg font-semibold sm:text-xl'>
            {' '}
            {data && data[0]?.username}
          </p>

          <p class='overflow-hidden pr-7 pt-2 text-base'>
            {data && data[0]?.address_line1}, {data && data[0]?.address_line2},
          </p>
          <p class='overflow-hidden pr-7 text-base'>
            {data && data[0]?.city} , {data && data[0]?.state},
          </p>
          <p class='overflow-hidden pr-7 text-base'>
            {data && data[0]?.country},{data && data[0]?.zip_code}
          </p>

          <div class='mt-4 flex flex-col  space-y-3 text-base font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2'>
            <div class=''>
              Items:
              <span class='ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900'>
                {' '}
                {data[0]?.total_quantity}{' '}
              </span>
            </div>
          </div>
          <div class='mt-4 flex flex-col  space-y-3 text-base font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2'>
            <div class=''>
              Price:
              <span class='ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900'>
                {data[0]?.total}
              </span>
            </div>
          </div>

          <div class='relative flex items-center mt-2 md:mt-0'>
            <label
              for='countries'
              class='block mb-2 text-sm font-medium text-gray-900'
            >
              Status
            </label>
            <select
              id='countries'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-2 p-2.5'
              onChange={e => PostStatus(e.target.value)}
            >
              <option selected>Change Status</option>
              <option value='PENDING'>Pending</option>
              <option value='PACKED'>Packed</option>
              <option value='READYTOSHIP'>Ready To Ship</option>
              <option value='ONTHEWAY'>On The Way</option>
              <option value='DELIVERED'>Delivered</option>
              <option value='RETURN'>Returned</option>
              <option value='REFUNDED'>REFUNDED</option>
              {/* <option value="CANCELLED">CANCELLED</option> */}
            </select>
          </div>
        </div>
      </div>
      {orderStatus?.statusCode === 200 ? (
        <div class='bg-white group  mt-3 w-full flex flex-col  rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto'>
          <div class=' flex flex-col justify-center  items-center ps-5'>
            <h3 class='text-sm text-gray-600'>Complaints</h3>
            <p>Complain Type : {orderStatus?.compaints?.complaint_type}</p>
            <p>Reason :{orderStatus?.compaints?.reason}</p>
            {/* <p>{`${orderStatus?.image?.imageData}`} </p> */}
            <img
              src={orderStatus?.image?.imageData}
              alt=''
              className='img-fluid w-[300px] '
            />
          </div>

          {orderStatus?.compaints?.status === 'PENDING' && (
            <div className='flex justify-center items-center  mt-3'>
              <button
                type='button'
                class='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                onClick={e => handleAccept()}
              >
                Accept
              </button>
              <button
                type='button'
                class='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={e => handleReject()}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ) : (
        ''
      )}

      <div
        className='flex gap-2 cursor-pointer text-center items-center justify-center mt-3 bg-white rounded-md col-2  p-2'
        onClick={() => generatePDF(htmlContent, outputPath)}
        // onClick={() => downloadInvoice()}
      >
        <img src={download} alt='downloadIcon' />
        <p className='font-semibold text-center' style={{ color: '#EE7B7B' }}>
          Download Invoice
        </p>
      </div>

      <div class='flex flex-col mt-6'>
        <div class='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div class='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div class='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table class='min-w-full divide-y divide-gray-200'>
                <thead class='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      class='py-3.5 px-4 text-sm font-normal text-left text-gray-500'
                    >
                      Product Name
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Quantity
                    </th>

                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      Image
                    </th>

                    {/* <th
                      scope='col'
                      class='px-4 py-3.5 text-sm font-normal text-left text-gray-500'
                    >
                      <th scope='col' class='px-6 py-3 font-medium'>
                        <div
                          className='flex gap-2 cursor-pointer'
                          onClick={() => downloadInvoice()}
                        >
                          <img src={download} alt='downloadIcon' />
                          <p
                            className='font-semibold'
                            style={{ color: '#EE7B7B' }}
                          >
                            Download
                          </p>
                        </div>
                      </th>
                    </th> */}
                  </tr>
                </thead>
                <tbody class='bg-white divide-y divide-gray-200'>
                  {data?.map(item => (
                    <tr>
                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {item?.name}
                          </h2>
                          <p class='text-sm font-normal text-gray-600'>
                            {item?.features}
                          </p>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {item?.quantity}
                          </h2>
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <h2 class='font-medium text-gray-800 '>
                            {item?.price}
                          </h2>
                          {/* <p class="text-sm font-normal text-gray-600">{item?.mrp}</p> */}
                        </div>
                      </td>

                      <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        <div>
                          <img
                            src={item?.front_side}
                            alt=''
                            className='img-fluid w-[135px] '
                          />
                          {/* <p class="text-sm font-normal text-gray-600">{item?.mrp}</p> */}
                        </div>
                      </td>

                      {/* <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td> */}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={1}></td>
                    <td colSpan={1}></td>

                    <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      <div>
                        <h2 class='font-medium text-gray-800 '>Total Amount</h2>
                      </div>
                    </td>

                    <td class='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      <div>
                        <h2 class='font-medium text-gray-800 '>
                          {data[0]?.total}
                        </h2>
                        {/* <p class="text-sm font-normal text-gray-600">{}</p> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetails
