import React, { useEffect, useState, useRef, createContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { applyCoupon, fetchCart, payment } from "../../api/clientAPI";
import * as Yup from "yup";

import { NavPage } from "../../components/Context/NavPage";
import { HeaderCategories } from "./Categories";

import { FaUserFriends, FaShieldAlt, FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ModalMess, ModalPayment } from "../../components/Modal";
import { useContext } from "react";

const axios = require("axios").default;
const ResponseContext = createContext();

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name *"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email *"),
  phone: Yup.string()
    .matches("^[0-9]+", "You can only type number")
    .max(11, "Only less than 10 number")
    .required("Please enter your number *"),
  address: Yup.string().required("Please enter your address"),
  message: Yup.string().required("Please enter your message *"),
});

const ShippingAddress = () => {
  const [info, setInfo] = useState("");
  let [paid, setPaid] = useState({
    status: undefined,
  });
  const [response, total_price] = useContext(ResponseContext);
  useEffect(() => {
    (async () => {
      try {
        let data = await fetchCart();
        setInfo(data || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const form = useRef();

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema,
  });

  return (
    <div className="container mx-auto">
      <div className="pt-10">
        <p className="text-lg font-semibold tracking-wider font-roboto">
          Contact information
        </p>
        <div className="inline-flex items-center pt-5">
          <img
            className="w-10 h-10 rounded-full"
            src={info.avatar}
            alt="Avatar"
          />
          <div className="pl-2">
            <p className="text-xs font-semibold">Tấn Phát Đỗ</p>
            <Link
              to="/login"
              className="text-xs text-orange_fa8b0c font-semibold w-max"
              onClick={() => localStorage.clear()}
            >
              Log out
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 ml-1">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-xs text-gray-900"
            >
              Keep me up to date on news and offers
            </label>
          </div>
        </div>
      </div>
      {/* Register Form */}
      <div className="pt-6 pb-8 ml-1">
        <h3 className="md:ml-0 text-lg font-medium leading-6 text-gray-900">
          Few more information
        </h3>
        <p className="mt-1 md:ml-0 text-sm text-[#3d424b]">
          Use a permanent address where you can receive mail.
        </p>
      </div>
      <form
        ref={form}
        onSubmit={formik.handleSubmit}
        id="contactForm"
        className="grid grid-cols-6 gap-6 shadow overflow-hidden sm:rounded-md bg-white sm:px-0 ml-1"
      >
        <div className=" col-span-6 lg:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-indigo-500 text-opacity-90"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="given-name"
            className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={info.firstName || ""}
            readOnly={true}
          />
        </div>
        <div className="col-span-6 lg:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-indigo-500 text-opacity-90"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="given-email"
            className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={info.email || ""}
            readOnly={true}
          />
        </div>
        <div className="col-span-6 lg:col-span-3">
          <div className="">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-indigo-500 text-opacity-90"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="given-phone"
              className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={info.phone || ""}
              readOnly={true}
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-indigo-500 text-opacity-90"
            >
              Message
            </label>
            <textarea
              rows="10"
              name="message"
              id="message"
              form="contactForm"
              className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={formik.handleChange}
              value={formik.values.message || ""}
              placeholder="Type here..."
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                {formik.errors.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3">
          <label
            htmlFor="address"
            className="block text-sm font-semibold text-indigo-500 text-opacity-90"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="given-address"
            className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={info.address || ""}
            readOnly={true}
          />
        </div>
      </form>
      <div className="flex justify-between items-center pt-3">
        <Link
          to="/categories"
          className="flex justify-center items-center max-w-max text-[#5048e5] cursor-pointer"
        >
          <IoIosArrowRoundBack />
          <p className="text-xs ml-2 font-semibold">Return to shop</p>
        </Link>
        <button
          type="submit"
          className="w-full py-2 px-4 sm:py-2 sm:px-10 border-2 hover:border-opacity-60 rounded-full shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer max-w-max"
          onClick={() => payment(response, total_price, setPaid)}
        >
          <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
            Check out
          </p>
        </button>
      </div>
      {paid.status !== undefined && <ModalPayment status={paid.status} />}
    </div>
  );
};

const Process = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-baseline h-[fit-content]">
        <div className="flex flex-col h-max ml-2">
          <div className="grid place-content-center w-12 h-12 rounded-full bg-purpel_903af9">
            <FaUserFriends
              size={20}
              style={{
                color: "#fff",
              }}
            />
          </div>
          <p className="text-sm font-semibold pt-1 text-center">Login</p>
        </div>
        <span className="relative border-2 border-purpel_903af9 -top-1 h-3 bg-purpel_903af9 w-full -mx-2"></span>
        <div className="flex flex-col h-max">
          <div className="grid place-content-center w-12 h-12 rounded-full bg-purpel_903af9">
            <FaShieldAlt
              size={20}
              style={{
                color: "#fff",
              }}
            />
          </div>
          <p className="text-sm font-semibold pt-1">Confirm</p>
        </div>
        <span className="relative border-2 border-gray_7a82a6 -top-1 h-3 bg-gray_7a82a6 w-full -mx-2"></span>
        <div className="flex flex-col h-max">
          <div className="grid place-content-center w-12 h-12 rounded-full bg-gray_7a82a6">
            <FaStarHalfAlt
              size={20}
              style={{
                color: "#fff",
              }}
            />
          </div>
          <p className="text-sm font-semibold pt-1">Success</p>
        </div>
      </div>
      <ShippingAddress />
    </div>
  );
};

const Info = ({ response, setResponse, total_price }) => {
  let [coupon, setCoupon] = useState("");
  let [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full h-full px-0 lg:px-44 pt-16 lg:pt-0">
        <div className="flex flex-col items-center justify-center lg:w-max p-5 md:p-10 lg:p-20 border-2 border-gray-700 border-opacity-80 rounded-md shadow-all-rounded">
          <video
            className="max-w-full md:max-w-max w-64 h-52"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            poster="https://cdnl.iconscout.com/lottie/premium/thumb/online-shopping-3572874-3017339.mp4"
          >
            <source
              type="video/mp4"
              src="https://cdnl.iconscout.com/lottie/premium/thumb/online-shopping-3572874-3017339.mp4"
            />
          </video>
          <p className="font-semibold font-roboto pt-5">Payment is here</p>
          <div className="flex justify-around items-center mt-5 py-8 border-b border-t border-gray-700 border-opacity-60 w-full">
            <input
              className="rounded-full py-1 mr-4 border-1 text-sm mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 focus:placeholder-transparent "
              type="text"
              placeholder="code"
              defaultValue=""
              onChange={(e) => setCoupon(e.target.value)}
              disabled={response.status}
            />
            <button
              className="flex justify-center items-center hover:bg-opacity-80 px-4 py-2 rounded-full bg-opacity-35 font-roboto border-2 hover:border-opacity-60 shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer"
              type="button"
              onClick={() => applyCoupon(coupon, setResponse, setShowModal)}
            >
              <span className="text-gray-600 text-xs font-roboto font-semibold tracking-widest hover:text-[#5048e5]">
                APPLY
              </span>
            </button>
          </div>
          <div className="flex flex-col w-full pt-5 pb-7 border-b border-gray-400">
            <div className="flex justify-between items-center w-full text-xs lg:text-sm font-roboto text-gray-600 tracking-wide">
              <p className="font-semibold">Discount</p>
              <p>{response.discount_percent * 100 || 0}%</p>
            </div>
            <div className="flex justify-between items-center w-full text-xs lg:text-sm text-gray-600 font-roboto pt-2 tracking-wide">
              <p className="font-semibold">Shipping Cost</p>
              <p>{response.shipping || "Free"}</p>
            </div>
            <div className="flex justify-between items-center w-full text-xs lg:text-sm text-gray-600 font-roboto pt-2 tracking-wide">
              <p className="font-semibold">Taxes (estimated)</p>
              <p>$0</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-5 w-full font-roboto text-gray-600 tracking-wide font-semibold">
            <p>Total</p>
            <p>${response.totalHasVoucher ?? total_price}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalMess
          show={showModal}
          message={response.message}
          setShow={setShowModal}
        />
      )}
    </>
  );
};

const Main = () => {
  let [response, setResponse] = useState({
    status: false,
    shipping: "Free",
    discount_percent: 0,
    totalHasVoucher: undefined,
    message: "",
  });

  let list_cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total_price = list_cart.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    0
  );
  return (
    <div className="container mx-auto px-10 pb-10 grid grid-cols-1 lg:grid-cols-2 pt-20">
      <ResponseContext.Provider value={[response, total_price]}>
        <Process />
      </ResponseContext.Provider>

      <Info
        response={response}
        setResponse={setResponse}
        total_price={total_price}
      />
    </div>
  );
};

function Checkout() {
  const tokenHeader = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + tokenHeader;

  return tokenHeader ? (
    <div>
      <NavPage />
      <HeaderCategories title={"Payment"} btnTitle={"Payment"} />
      <Main />
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export { Checkout };
