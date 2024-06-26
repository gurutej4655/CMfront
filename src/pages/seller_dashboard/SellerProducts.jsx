import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAPI } from "../../utils/api/getRequest";
import { deleteAPI } from "../../utils/api/deleteRequest";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";
import { useDispatch, useSelector } from "react-redux";
import { editProductDetails } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";

function SellerProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sellerData = useSelector((state) => state.sellerReducer);

  const [isDeleting, setIsDeleting] = useState(false);

  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const [indexOfProduct, setIndexOfProduct] = useState(-1);

  // API to DELETE Data
  const handleDelete = async (productId, index) => {
    if (!isDeleting) {
      setIndexOfProduct(index);
      setIsDeleting(true);
      await deleteAPI(`product/delete/${productId}`);
      setIsDataUpdated(true);
      setIndexOfProduct(-1);
      setIsDeleting(false);
    } else {
      notify("Please wait", "info");
    }
  };

  const handleFilter = async (e) => {
    let updatedData = products.filter(
      (item) => item.category === e.target.value || e.target.value === "all"
    );
    setData(updatedData);
  };

  // API to GET Data
  const getProducts = async () => {
    let productData = await getAPI(`product/getProductData/${sellerData._id}`);
    setData(productData);
    //console.log(productData);
    setProducts(productData);
    setIsDataFetching(false);
  };

  useEffect(() => {
    setIsDataUpdated(false);
    getProducts();
  }, [isDataUpdated]);

  return (
    <>
      {/* Table Header */}
      <Heading text={"Your Products"} textAlign="text-left" />
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
        <div className="w-1/2">
          <div className="w-full justify-between grid grid-cols-2 ">
            <label className="text-sm font-medium text-gray-900 block mb-2 px-3 ">
              Filter
            </label>
          </div>
          <div className="w-full items-center grid grid-cols-2 ">
            <select
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mx-1 "
              required
              onChange={(e) => handleFilter(e)}
            >
              <option value="All" disabled selected>
                Filter Products
              </option>
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
              <option value="nuts">Nuts</option>
              <option value="sugar">Sugar</option>
              <option value="spices">Spices</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="pulses">Pulses</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <Link to="product/add" className="w-full md:w-fit text-center">
          <div className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700">
            <i className="fa-regular fa-plus mr-2"></i>Add Product
          </div>
        </Link>
      </div>
      {/* Table */}
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isDataFetching ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStateText text="Your seller dashboard currently does not display any products. To start selling, kindly add your products by navigating to the 'Add Product' section." />
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
                  <th scope="col" className="px-6 whitespace-nowrap  py-4">
                    Shelf Life
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap  py-4">
                    Quantity Left
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Minimum Order Quantity
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Measuring Unit
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Price Per Unit
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Operation
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className={
                      item.quantity <= item.minimumOrderQuantity
                        ? "border-b transition duration-300 ease-in-out bg-red-100 hover:bg-red-400 text-center"
                        : "border-b transition duration-300 ease-in-out hover:bg-neutral-100 text-center"
                    }
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-2">
                      <img src={item.image} alt="Image" />
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.shelfLife}</td>
                    <td className="px-6 py-4">
                      {item.quantity} {item.measuringUnit}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer font-medium text-sky-700 hover:underline whitespace-nowrap"
                      onClick={() => {
                        navigate(
                          `/map/${item.location.latitude}/${item.location.longitude}`
                        );
                      }}
                    >
                      {item.location.latitude.toFixed(4)},{" "}
                      {item.location.longitude.toFixed(4)}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.minimumOrderQuantity} {item.measuringUnit}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.measuringUnit}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      Rs. {item.pricePerUnit}/{item.measuringUnit}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.description}
                    </td>
                    <td className=" px-6 py-4">
                      <span className=" flex justify-center items-center gap-2">
                        <div
                          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700  whitespace-nowrap"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(editProductDetails(item));
                            navigate(`product/edit`);
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square mr-2"></i>
                          <span className="font-medium">Edit</span>
                        </div>

                        <div
                          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-rose-700 whitespace-nowrap"
                          onClick={() => {
                            handleDelete(item._id, index);
                          }}
                        >
                          <span className="font-medium flex flex-row gap-1 justify-center items-center">
                            {indexOfProduct === index ? (
                              <Spinner width="w-5" color="#ffffff" />
                            ) : (
                              <i className="fa-regular fa-trash-can"></i>
                            )}
                            <span className="ml-1">Delete</span>
                          </span>
                        </div>
                      </span>
                    </td>
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

export default SellerProducts;
