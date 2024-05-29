import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAPI } from "../../utils/api/getRequest";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import { useSelector } from "react-redux";

function userOrders() {
  const [data, setData] = useState([]);
  const [orderedData, setOrderedData] = useState([]);

  const navigate = useNavigate();

  const userData = useSelector((state) => state.userReducer);

  const [isDataFetching, setIsDataFetching] = useState(true);

  // API to GET Data
  const getOrders = async () => {
    let orders = await getAPI(`order/getuserorder/${userData.email}`);
    //console.log("Orders", orderedData);
    setOrderedData(orders);
    setData(orders);
    setIsDataFetching(false);
  };

  const handleOnChange = async (ide) => {
    //console.log("data", ide);
    let isShipped = 3;
    let newData = await getAPI(`order/${ide}/${isShipped}`);
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleFilter = async (e) => {
    let flag = 4;
    if (e.target.value === "Delivered") flag = 3;
    else if (e.target.value === "Shipped") flag = 2;
    else if (e.target.value === "Pending") flag = 1;
    const updatedData = await orderedData.filter(
      (item) => item.isShipped === flag || flag === 4
    );
    setData(updatedData);
    console.log(data, flag);
  };

  return (
    <>
      {/* Table Header */}
      <Heading text={"All Orders"} textAlign="text-left" />
      <div className="w-2/3 justify-between grid grid-cols-2 px-3">
        <label className="text-sm font-medium text-gray-900 block mb-2  ">
          Filter
        </label>
      </div>
      <div className="w-2/3 items-center grid grid-cols-2 px-3">
        <select
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mx-1 "
          required
          onChange={(e) => handleFilter(e)}
        >
          <option value="All" disabled selected>
            Filter Orders
          </option>
          <option value="Delivered">Delivered</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
          <option value="All">All</option>
        </select>
      </div>

      {/* Table */}
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isDataFetching ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStateText text="It seems like your order request queue is currently empty. No worries, though! Keep an eye out for incoming orders—they'll pop up right here in your dashboard." />
          ) : (
            <table className="text-center text-sm font-light w-full">
              <thead className="border-b font-medium bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Image
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Seller Name
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Brand Name
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Seller Email
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap  py-4">
                    Order Quantity
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Order Location
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Total Price
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 text-center"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-2">
                      <img src={item.image} alt="Image" />
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.sellerName}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.brandName}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.sellerEmail}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.orderQty} {item.measuringUnit}
                    </td>
                    <td
                      className=" px-6 py-4 max-w-sm cursor-pointer font-medium text-sky-700 hover:underline whitespace-nowrap"
                      onClick={() => {
                        navigate(
                          `/map/${item.orderLocation.latitude}/${item.orderLocation.longitude}`
                        );
                      }}
                    >
                      {item.orderLocation.latitude.toFixed(4)},{" "}
                      {item.orderLocation.longitude.toFixed(4)}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      Rs.{item.totalPrice}
                    </td>
                    {item.isShipped === 3 ? (
                      <td className=" px-6 py-2 max-w-sm truncate hover:whitespace-normal text-green-500 font-medium">
                        <span className="flex justify-center items-center">
                          <GoDotFill className="mr-1" />
                          Delivered
                        </span>
                      </td>
                    ) : item.isShipped === 1 ? (
                      <td className=" px-6 py-2 max-w-sm truncate hover:whitespace-normal text-yellow-500 font-medium">
                        <span className="flex justify-center items-center">
                          <GoDotFill className="mr-1" />
                          Pending
                        </span>
                      </td>
                    ) : (
                      <td className=" px-6 py-2 max-w-sm truncate hover:whitespace-normal text-orange-500 font-medium">
                        <span className="flex justify-center items-center">
                          <GoDotFill className="mr-1" />
                          Shipped
                        </span>
                        <button
                          className="bg-rose-700 px-6 py-2 w-full max-w-[150px] rounded-full text-black"
                          onClick={(e) => {
                            handleOnChange(item._id);
                          }}
                        >
                          Delivered
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default userOrders;
