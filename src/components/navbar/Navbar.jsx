import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../../pages/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import {
  addSellerData,
  addUserData,
  removeFromCart,
} from "../../redux/actions";
import { FaUserCircle } from "react-icons/fa";
import { SiSellfy } from "react-icons/si";
import { notify } from "../../utils/helper/notification";
import { postAPI } from "../../utils/api/postRequest";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDropdownRef = useRef();
  const sellerDropdownRef = useRef();

  const [openCart, setOpenCart] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const sellerData = useSelector((state) => state.sellerReducer);
  const cartData = useSelector((state) => state.cartReducer);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);

  useEffect(() => {
    console.log("UserData SellerData", userData, sellerData);
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
      if (
        sellerDropdownRef.current &&
        !sellerDropdownRef.current.contains(event.target)
      ) {
        setShowSellerDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOnUserLogout = async () => {
    for (const element of cartData) {
      console.log("Cart data saved in db", element);
      let data = await postAPI(`cart/add`, element);
      dispatch(removeFromCart(element.productId));
    }
  };

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:px-12 h-12">
        <a
          onClick={(e) => {
            if (!sellerData) {
              navigate("/");
            } else navigate("/sellerdashboard");
          }}
          className="flex items-center"
        >
          <span className="text-xl md:text-2xl font-medium whitespace-nowrap">
            <span className="text-red-500 font-bold">C</span>rop
            <span className="text-red-500 font-bold">C</span>onnect
          </span>
        </a>
        <div className="flex flex-row gap-4 md:gap-8 text-2xl md:text-3xl">
          {!sellerData ? (
            <div
              ref={userDropdownRef}
              className="relative flex flex-row gap-1 justify-center items-center text-blue-700 cursor-pointer"
              onMouseEnter={() => {
                setShowUserDropdown(true);
                setShowSellerDropdown(false);
              }}
              onClick={() => {
                if (!userData) {
                  navigate("/account/user");
                }
              }}
            >
              <FaUserCircle />
              {userData ? (
                <span className="text-sm font-medium hidden md:block text-black">
                  Hi <b>{userData.name}</b>
                </span>
              ) : (
                <span className="text-sm font-medium hidden md:block">
                  User
                </span>
              )}
              {userData && (
                <div
                  className={`absolute ${
                    showUserDropdown ? "block" : "hidden"
                  } top-8 right-0 z-10 font-medium bg-white rounded-lg shadow-md pl-1 md:pl-4 pr-2 md:pr-8 py-0 md:py-2`}
                >
                  <ul className="py-1 md:py-2 flex flex-col text-sm gap-2 text-gray-700 ">
                    <li
                      onClick={() => {
                        navigate("/userhistory");
                      }}
                    >
                      <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  whitespace-nowrap">
                        History
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        dispatch(addUserData(null));
                        handleOnUserLogout();
                        notify("User Logged Out", "info");
                        navigate("/");
                      }}
                    >
                      <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  whitespace-nowrap">
                        User Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {!userData ? (
            <div
              ref={sellerDropdownRef}
              className="relative flex flex-row gap-1 justify-center items-center text-green-700 cursor-pointer"
              onMouseEnter={() => {
                setShowSellerDropdown(true);
                setShowUserDropdown(false);
              }}
              onClick={() => {
                if (!sellerData) {
                  navigate("/account/seller");
                }
              }}
            >
              <SiSellfy />
              {sellerData ? (
                <span className="text-sm font-medium hidden md:block text-black">
                  Hi <b>{sellerData.name}</b>
                </span>
              ) : (
                <span className="text-sm font-medium hidden md:block">
                  User
                </span>
              )}
              {sellerData && (
                <div
                  className={`absolute ${
                    showSellerDropdown ? "block" : "hidden"
                  } top-8 right-0 z-10 font-medium bg-white rounded-lg shadow-md pl-1 md:pl-4 pr-2 md:pr-8 py-0 md:py-2`}
                >
                  <ul className="py-2 flex flex-col text-sm gap-2 text-gray-700 ">
                    <li
                      onClick={() => {
                        navigate("/sellerdashboard");
                      }}
                    >
                      <a className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0  whitespace-nowrap">
                        Seller Dashboard
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        dispatch(addSellerData(null));
                        navigate("/");
                        notify("Seller Logged Out", "info");
                      }}
                    >
                      <a className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0  whitespace-nowrap">
                        Seller Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {!sellerData && userData ? (
            <div
              className="flex flex-row gap-1 justify-center items-center text-red-700 cursor-pointer"
              onClick={() => {
                setOpenCart(true);
              }}
            >
              <AiOutlineShoppingCart />
              <span className="text-sm font-medium hidden md:block">Cart</span>
            </div>
          ) : (
            <> </>
          )}
          {openCart && <Cart setOpenCart={setOpenCart} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
