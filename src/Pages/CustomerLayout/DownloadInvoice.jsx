import React from 'react'
import download from '../../Assets/Icons/Download.svg'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import html2pdf from 'html2pdf.js'
import logoImage from '../../Assets/Logo/LogoForBonnita.jpg'

const DownloadInvoice = () => {
  const downloadInvoice = () => {
    const doc = new jsPDF()

    // Add logo
    const logoHeight = 20
    const logoWidth = 20
    doc.addImage(logoImage, 'PNG', 10, 10, logoWidth, logoHeight)

    // Add styles
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')

    // Add address, billing details, GSTIN, etc.
    const addressSpacing = 10
    const fromAddressY = 10 + logoHeight + addressSpacing
    const toAddressY = fromAddressY + 30

    doc.text('From:', 10, fromAddressY)
    doc.text('Your Address Line 1', 10, fromAddressY + 10)
    doc.text('Your Address Line 2', 10, fromAddressY + 20)
    doc.text('City, State, Postal Code', 10, fromAddressY + 30)

    doc.text('To:', 120, fromAddressY)
    doc.text('Customer Address Line 1', 120, fromAddressY + 10)
    doc.text('Customer Address Line 2', 120, fromAddressY + 20)
    doc.text('City, State, Postal Code', 120, fromAddressY + 30)

    // doc.setFontStyle('italic'); // Set font style to italic

    doc.text('Billing Details:', 10, toAddressY + 20)
    doc.text('Bill To: Customer Name', 10, toAddressY + 30)
    doc.text('Invoice Date: 12 Oct 2023', 10, toAddressY + 40)
    doc.text('GSTIN: ABCDE12345FGH', 10, toAddressY + 50)

    // doc.setFontStyle('normal') // Reset font style to normal

    // Add the table
    const columns = ['#', 'Product', 'Quantity', 'Price']
    const rows = [
      [1, 'Vegan Leather Bag', 'x1', '₹ 300.00']
      // Add more rows as needed
    ]

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: toAddressY + 60,
      margin: { top: toAddressY + 60 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        halign: 'center',
        valign: 'middle',
        fontStyle: 'normal',
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 10 }
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255]
      },
      headerStyles: {
        fillColor: [51, 122, 183],
        textColor: [255, 255, 255],
        halign: 'center',
        fontStyle: 'bold'
      }
    })

    // Save the PDF
    doc.save('invoice.pdf')
  }

  return (
    <div className='container PaddingTop' id='invoice-container'>
      <h1 className='text-center mt-md-3 text-2xl font-semibold  pb-3'>
        Congratulation! You’ve completed Order.
      </h1>
      <div className='flex justify-center items-center gap-20 pb-4'>
        <div className='flex flex-col'>
          <p className='font-semibold'>Order ID</p>
          <p className='text-gray-500'>#123747247284</p>
        </div>
        <div className='flex flex-col'>
          <p className='font-semibold'>Date</p>
          <p className='text-gray-500'>12 Oct 2023</p>
        </div>
        <div className='flex flex-col'>
          <p className='font-semibold'>Total</p>
          <p className='text-gray-500'>₹ 1058.47</p>
        </div>
        <div className='flex flex-col'>
          <p className='font-semibold'>Payment Method</p>
          <p className='text-gray-500'>Online</p>
        </div>
      </div>
      <div className=' m-auto'>
        <h2 className='text-center pt-2 pb-2 text-xl font-bold'>
          Order Details
        </h2>

        <div class='relative overflow-x-auto m-auto md:w-[80%]  mt-4 mb-5  border-1'>
          <table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead class='text-base font-medium bg-[#F5F5F5] text-black dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' class='px-6 py-3 font-medium'>
                  ProductId:
                  <span className='text-[#777777]'>#123747247284</span>
                </th>
                <th scope='col' class='px-6 py-3 font-medium'>
                  Nos
                </th>
                <th scope='col' class='px-6 py-3 font-medium'>
                  Price
                </th>
                <th scope='col' class='px-6 py-3 font-medium'>
                  <div
                    className='flex gap-2 cursor-pointer'
                    onClick={() => downloadInvoice()}
                  >
                    <img src={download} alt='downloadIcon' />
                    <p className='font-semibold' style={{ color: '#EE7B7B' }}>
                      Download
                    </p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Vegan Leather Bag
                </th>
                <td class='px-6 py-4'>x1</td>
                <td class='px-6 py-4'>₹ 300.00</td>
              </tr>
            </tbody>
          </table>
          <table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2'>
            <tbody>
              <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Vegan Leather Bag
                </th>
                <td class='px-6 py-4'>x1</td>
                <td class='px-6 py-4'>₹ 300.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DownloadInvoice
