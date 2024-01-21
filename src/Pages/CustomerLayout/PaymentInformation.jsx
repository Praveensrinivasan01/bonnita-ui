import React from 'react'
import { useCurrencyStore } from '../../Zustand/currency'

const PaymentInformation = ({ data, paymentDetails }) => {
    console.log("PAYMNENT INFORMATION DATAS", data)
    const currencyConversion = useCurrencyStore((state) => state?.currencyConversion)
    const currencyType = useCurrencyStore((state) => state?.currencyCode)

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="font-bold text-xl">Payment Info</div>
            </div>

            <div className="title pb-10">
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col-3"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                SHIPPING ADDRESS
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                            >
                                                MODE OF PAYMENT
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                            >
                                                TOTAL
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                            >
                                                PAYMENT STATUS
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                                            >
                                                PAYMENT DATE
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {<>
                                            <tr style={{ cursor: "pointer" }}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap flex item-center">
                                                    <div>
                                                        <p className='text-uppercase'>{data?.username}</p>
                                                        <p className='text-lowercase'>{data?.email}</p>
                                                        <p className='text-capitalize'>{data.room_no} <span className='ps-1'>{data?.address_line1}</span><span className='ps-1'>{data?.address_line2 && data?.address_line2}</span></p>
                                                        <p className='text-capitalize'>{data?.city} <span className='ps-1'>{data?.country}</span> <span className='ps-1'> {data?.zip_code}</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <p>{paymentDetails?.mode_of_payment}</p>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 ">
                                                            <p>{currencyType.symbol}{currencyConversion(paymentDetails?.total)}</p>
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 ">
                                                            <p>{paymentDetails?.mode_of_payment == "E_PAY" ? paymentDetails.payment_status : paymentDetails.status == "DELIVERED" ? "PAID" :
                                                                paymentDetails?.status == "REFUNDED" ? "REFUNDED" : "UNPAID"
                                                            }</p>
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 ">
                                                            <p>{paymentDetails?.mode_of_payment == "E_PAY" ? paymentDetails.e_pay_date : paymentDetails.status == "DELIVERED" ? (paymentDetails.updated_at) : paymentDetails?.status == "REFUNDED" ? paymentDetails.payment_date :
                                                                "-"
                                                            }</p>
                                                        </h2>
                                                    </div>
                                                </td>
                                            </tr>

                                        </>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentInformation
