import React, { useState, useEffect, useRef, Fragment } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import { DetailProduct } from "../../components/DetailProduct";
import { Footer, About } from "./Home";
import { ShoesComponent } from "../../components/home/Shoes";
import { DropDown } from "../../components/home/DropDown";
import { NavPage } from "../../components/Context/NavPage";
import { fetchProducts } from "../../api/clientAPI";

// Idea: Transition rendering list sản phẩm theo tên mỗi lần click
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import { Hypnosis } from "react-cssfx-loading";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { BsGridFill, BsClockHistory } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { AiFillTags, AiFillStar } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";

const axios = require("axios").default;

export const HeaderCategories = (props) => {
  let [isShowing, setIsShowing] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);
  return (
    <div className="flex flex-col justify-center items-center pt-10 w-full bg-gray-700">
      <p className="text-xl text-white font-semibold">{props.title}</p>
      <div className="flex flex-col items-center py-7">
        <div className="w-40 h-auto">
          <Transition
            as={Fragment}
            show={isShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="w-full h-full bg-red-500 rounded-md shadow-lg text-center">
              {props.btnTitle}
            </div>
          </Transition>
        </div>
        <button
          onClick={() => {
            setIsShowing(false);
            resetIsShowing();
          }}
          className="flex items-center px-3 py-2 mt-8 text-sm font-medium text-white transition transform bg-black rounded-full backface-visibility-hidden active:bg-opacity-40 hover:scale-105 hover:bg-opacity-30 focus:outline-none bg-opacity-20"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 opacity-70">
            <path
              d="M14.9497 14.9498C12.2161 17.6835 7.78392 17.6835 5.05025 14.9498C2.31658 12.2162 2.31658 7.784 5.05025 5.05033C7.78392 2.31666 12.2161 2.31666 14.9497 5.05033C15.5333 5.63385 15.9922 6.29475 16.3266 7M16.9497 2L17 7H16.3266M12 7L16.3266 7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="ml-3">Click to transition</span>
        </button>
      </div>
    </div>
  );
};

export const Pagination = ({
  products,
  postsPerPage,
  setCurrentPage,
  path,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="bg-white px-4 py-5 border-t border-gray-200 sm:px-6">
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-center md:flex-col xl:flex-row">
        <div className="block sm:hidden text-center text-sm pb-4 md:pb-5 xl:pb-0 2xl:pb-0">
          <p className="text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex items-center rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="/#"
              className="relative inline-flex items-center px-2 py-2 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {pageNumber &&
              pageNumber.map((page) => (
                <div className="px-2" key={page}>
                  <Link
                    to={`/${path}`}
                    aria-current="page"
                    className="z-10 hover:ring-2 hover:ring-indigo-500 text-indigo-600 relative inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Link>
                </div>
              ))}
            <a
              href="/#"
              className="relative inline-flex items-center px-2 py-2 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

const CollectRequire = () => {
  const inputRef = useRef(null);
  const [value, setMinPrice] = useState(200);

  function refMinPrice() {
    setMinPrice(inputRef.current.value);
  }

  return (
    <>
      <p className="text-sm ml-1 font-semibold pb-3">Filter by type</p>
      <DropDown title={"Select type Shoes"} />
      <span className="flex justify-between items-center text-sm text-gray_7a82a6 pt-5">
        <p className="ml-1">Price Range:</p>
        <p className="text-pink_f5548e">${`${value}`} - $20000</p>
      </span>
      <input
        className="pt-3 w-full"
        type="range"
        id="volume"
        name="volume"
        min="200"
        max="20000"
        step="100"
        ref={inputRef}
        onChange={refMinPrice}
      />
      <div className="flex justify-between sm:justify-start items-center w-full">
        <button className="inline-flex items-center text-sm py-1 px-2 text-green-500 border rounded-sm">
          <span className="pr-2">
            <BsClockHistory />
          </span>
          Open Now
        </button>
        <button className="inline-flex items-center text-sm py-1 px-2 text-pink_f5548e border rounded-sm sm:ml-5">
          <span className="pr-1">
            <AiFillTags />
          </span>
          Offering Deal
        </button>
      </div>
      <p className="text-sm ml-1 font-semibold mt-5">Filter by Tags</p>
      <form className="flex flex-col ml-1 mt-4 leading-10 gap-y-2">
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            Accept Cards
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            Electronics
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            Bike Parking
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            Wheelchair
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            Accessories
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            WiFi Internet
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray_7a82a6 opacity-60"
          >
            Parking Street
          </label>
        </div>
        <span className="text-pink_f5548e text-xs font-semibold pt-1">
          Show More
        </span>
      </form>
      <p className="text-sm ml-1 font-semibold mt-5">Filter by Ratings</p>
      <form className="flex flex-col ml-1 mt-4 leading-10 gap-y-4">
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
        </div>
        <div className="inline-flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
          <div className="p-1 rounded-full ring-4 ring-pink-600 ring-opacity-40 bg-pink_f5548e ml-3 text-white opacity-30">
            <AiFillStar size={10} />
          </div>
        </div>
        <button className="inline-flex justify-center items-center py-3 mt-2 bg-gradient-to-r from-pink_f5548e to-orange_fa8b0c text-xs text-white font-semibold hover:from-orange_fa8b0c hover:to-pink_f5548e">
          Search Filter
          <IoMdArrowDropright
            size={16}
            style={{
              marginLeft: "5px",
            }}
          />
        </button>
      </form>
    </>
  );
};

function Main() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((items) => {
      setProducts(items || []);
      setLoading(false);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="max-w-max mx-auto px-4">
      <div className="flex flex-col flex-wrap sm:flex-row sm:justify-between items-center mt-10 border border-gray-200">
        <div className="w-full sm:w-max px-5 pt-5 sm:pt-0">
          <p className="text-sm font-semibold">All items</p>
          <p className="text-sm text-gray_7a82a6">
            Total Listing Found: {products.length}
          </p>
        </div>
        <div className="inline-flex justify-start items-center w-full sm:w-max mt-2 pb-4 sm:mt-0 sm:p-4 gap-3 text-gray_7a82a6">
          <a href="/#" className="ml-5 py-2 px-2 bg-pink_f5548e">
            <BsGridFill size={12} />
          </a>
          <a href="/#" className="border py-2 px-2">
            <FaList size={14} />
          </a>
          <a href="/#" className="border text-sm py-1 px-4">
            Sort By
          </a>
        </div>
      </div>
      <div className="pt-8" />

      <div className="container grid grid-flow-row grid-cols-1 sm:grid-flow-col sm:auto-cols-grid-admin gap-x-10">
        <div className="px-4 py-7 border order-1 md:order-2 sm:max-w-max">
          <CollectRequire />
        </div>

        <div className="flex flex-wrap max-w-max gap-y-8 order-2 md:order-1 pt-10 sm:pt-0">
          {loading ? (
            <div className="grid place-items-center w-full">
              <Hypnosis duration="4s" width="70px" height="70px" />
            </div>
          ) : (
            currentPosts.map((items, index) => (
              <ShoesComponent
                key={index}
                _id={items._id}
                name={items.name}
                url={items.path}
                quantity={items.quantity}
                price={items.price}
                status={items.status}
              />
            ))
          )}
          <div className="grid place-items-center w-full">
            <Pagination
              products={products}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              path={"categories"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Categories() {
  // Set Authorization for Header Categories
  const tokenHeader = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + tokenHeader;
  return tokenHeader ? (
    <>
      <NavPage />
      <HeaderCategories title={"Product"} btnTitle={"Nike"} />

      {/* Switch Route main của Categories và chi tiết sản phẩm */}
      <Switch>
        <Route exact path="/categories" component={Main} />
        <Route
          path="/categories/:_id"
          render={(props) => <DetailProduct {...props} />}
        />
      </Switch>

      <About />
      <Footer />
    </>
  ) : (
    <Redirect to="/login" />
  );
}
