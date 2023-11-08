import React from 'react'

const OrderDetails = () => {
  return (
    <>
    <div class="bg-white group grid w-full grid-cols-12 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
        <div class="col-span-11 flex flex-col pr-8 text-left sm:pl-4">

            <h3 class="text-sm text-gray-600">User Name</h3>

            <a href="#" class="overflow-hidden pr-7 text-lg font-semibold sm:text-xl"> #0001 </a>

            <p class="overflow-hidden pr-7 text-sm">Address Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna .</p>

            <div class="mt-2 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div class="">Items:<span class="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900"> 2 </span></div>
                <div class="">Price:<span class="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">50k</span></div>
            </div>

            <div class="relative flex items-center mt-2 md:mt-0">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Status</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-2 p-2.5">
                    <option selected>Filter Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Packed">Packed</option>
                    <option value="Ready To Ship">Ready To Ship</option>
                    <option value="On The Way">On The Way</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Returned">Returned</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div> 
        </div>
    </div>

    <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                        Name
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                        Quantity
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                        Price
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                        Sub Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">Catalog</h2>
                                            <p class="text-sm font-normal text-gray-600">catalogapp.io</p>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>


                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">Catalog</h2>
                                            <p class="text-sm font-normal text-gray-600">catalogapp.io</p>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>


                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">Catalog</h2>
                                            <p class="text-sm font-normal text-gray-600">catalogapp.io</p>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>


                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">Catalog</h2>
                                            <p class="text-sm font-normal text-gray-600">catalogapp.io</p>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>


                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>
                                    </td>

                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">Total Amount</h2>
                                        </div>
                                    </td>


                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800 ">123</h2>
                                            <p class="text-sm font-normal text-gray-600">123</p>
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