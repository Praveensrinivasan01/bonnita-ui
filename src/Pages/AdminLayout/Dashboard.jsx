import React, { useEffect, useState } from "react";
import { AuthGet, AuthPost } from "../../Commons/httpService";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [count, setCount] = useState()
    const [TotalCount, SetTotalCount] = useState()
    const [last2hrRecord, setLast2hrRecord] = useState([])
    const [page, setPage] = useState(0);

    let getcount = async () => {
        console.log("page", page)
        await AuthPost(`order/total-records?offset=${15 * page}`, {}, 'admin').then((res) => {
            if (res.statusCode == 200) {
                console.log(res, "count")
                setCount(res.data)
                SetTotalCount(res.count)
                setLast2hrRecord(res.last24hrs_record)
            }
        }).catch((err) => {
            console.log('err::: ', err);
        })
    }

    console.log(Math.floor(TotalCount / 15), "TotalCount")

    useEffect(() => {
        getcount()
    }, [page])

    console.log("page", page)


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                <div className="bg-black shadow-lg rounded-md flex dash_cards items-center justify-between p-3 border-b-4 border-gray-700 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-red-400
 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{count?.total_users}</p>
                        <p>Customers</p>
                    </div>
                </div>
                <div className="bg-black shadow-lg rounded-md flex dash_cards items-center justify-between p-3 border-b-4 border-gray-700 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-red-400
 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{count?.total_order}</p>
                        <p>Orders</p>
                    </div>
                </div>
                <div className="bg-black shadow-lg rounded-md flex dash_cards items-center justify-between p-3 border-b-4 border-gray-700 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-red-400
 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{count?.last24hrs_order}</p>
                        <p>Total Sales</p>
                    </div>
                </div>
                <div className="bg-black shadow-lg rounded-md flex dash_cards items-center justify-between p-3 border-b-4 border-gray-700 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-red-400
 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">₹{count?.total_earned}</p>
                        <p>Earnings</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 mx-4">
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 ">
                                    <th className="px-4 py-3 bg-gray-100 text-black">Client</th>
                                    <th className="px-4 py-3  bg-gray-100 text-black">Amount</th>
                                    <th className="px-4 py-3  bg-gray-100 text-black">Status</th>
                                    <th className="px-4 py-3  bg-gray-100 text-black">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {last2hrRecord?.map((ele, idx) => {
                                    return (
                                        <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold">{ele?.username}</p>
                                                        <p className="text-xs text-gray-600">{ele?.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{ele.total}</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full"> {ele.status} </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{ele?.created_date}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-end">
                        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">

                            {
                                Math.floor(TotalCount / 15) >= page &&
                                <>
                                    {
                                        page !== 0 && (
                                            <button
                                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
                                                onClick={() => setPage((prev) => prev - 1)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                                    />
                                                </svg>

                                                <span>Previous</span>
                                            </button>
                                        )
                                    }

                                    {
                                        Math.floor(TotalCount / 15) > page && (

                                            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
                                                onClick={() => setPage(page + 1)}>


                                                <span>Next</span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                    />
                                                </svg>
                                            </button>
                                        )
                                    }

                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard