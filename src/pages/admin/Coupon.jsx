import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Hypnosis, Spin } from "react-cssfx-loading/lib";
import { storage } from "../../firebase/initializeApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as Yup from "yup";
import { UpSearch } from "./Customers";
import { createCoupon, getCoupon } from "../../api/adminAPI";
import newIcon from "../../img/new.png";
import popularIcon from "../../img/popular.png";
import saleIcon from "../../img/sale.png";
import { ModalPayment } from "../../components/Modal";

function InsertCoupon() {
  let [now, setNow] = useState(new Date());
  let [select, setSelect] = useState(false);
  let [loading, setLoading] = useState(false);
  let [showModal, setShowModal] = useState(undefined);
  let ls_status = [
    {
      icon: popularIcon,
      type: "TEN_PERCENT",
      percent_discount: 10,
      color: "text-[#7affa3]",
    },
    {
      icon: newIcon,
      type: "TWENTY_PERCENT",
      percent_discount: 20,
      color: "text-[#47e979]",
    },
    {
      icon: saleIcon,
      type: "THIRTY_PERCENT",
      percent_discount: 30,
      color: "text-[#6bd98d]",
    },
    {
      icon: saleIcon,
      type: "FORTY_PERCENT",
      percent_discount: 40,
      color: "text-[#48cb8b]",
    },
    {
      icon: saleIcon,
      type: "FIFTY_PERCENT",
      percent_discount: 50,
      color: "text-[#16be4a]",
    },
    {
      icon: saleIcon,
      type: "SIXTY_PERCENT",
      percent_discount: 60,
      color: "text-[#08d773]",
    },
    {
      icon: saleIcon,
      type: "SEVENTY_PERCENT",
      percent_discount: 70,
      color: "text-[#1dd556]",
    },
    {
      icon: saleIcon,
      type: "EIGHTY_PERCENT",
      percent_discount: 80,
      color: "text-[#41a15f]",
    },
    {
      icon: saleIcon,
      type: "NINETY_PERCENT",
      percent_discount: 90,
      color: "text-[#146940]",
    },
    {
      icon: saleIcon,
      type: "NINETY_PERCENT",
      percent_discount: 90,
      color: "text-[#175235]",
    },
  ];
  const initialValues = {
    code: Math.round(Math.random() * 1000000),
    type: "FREE",
    shipping_discount: "",
    percent_discount: 100,
    logo: "",
  };

  let validationSchema = Yup.object().shape({
    shipping_discount: Yup.number().required("Code field can't be blank *"),
    logo: Yup.mixed().required("Please select your logo of coupon *"),
  });

  const formik = useFormik({
    initialValues,

    // POST HTTP lên cho server;
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        // Upload avatar to firebase storage
        const storageRef = ref(storage, `${values.logo.name}`);
        await uploadBytes(storageRef, values.logo).then(() => {
          console.log("Upload logo success !");
        });

        let url_path = await getDownloadURL(ref(storage, values.logo.name));
        formData.append("logo", url_path);
        formData.append("code", values.code);
        formData.append("type", values.type);
        formData.append("shipping_discount", values.shipping_discount);
        formData.append("percent_discount", values.percent_discount);

        let { status } = await createCoupon(formData);
        setShowModal(status);
        setLoading(false);
      } catch (err) {
        console.log(`%c ${err}`, "color: red");
      }
    },
    validationSchema,
  });

  setInterval(() => {
    setNow(new Date());
  }, 1000);

  // Change select type in formdata
  const selected = (formik, item) => {
    formik.values.type = item.type;
    formik.values.percent_discount = item.percent_discount;
    setSelect(!select);
  };

  return (
    <div className="max-w-6xl pt-16 mx-auto">
      <p className="font-bold ml-5 text-3xl lg:ml-0"> New coupon</p>
      <form onSubmit={formik.handleSubmit}>
        {/* Left */}
        <div className="flex flex-wrap flex-col md:flex-row pt-8">
          <div className="w-full px-5 lg:px-0 md:w-[30%]">
            <div className="flex flex-col justify-center items-center px-6 py-8 rounded-md shadow-all-rounded">
              <div>
                <video
                  className="max-w-full"
                  autoPlay="autoplay"
                  muted="muted"
                  loop="loop"
                  poster="https://cdnl.iconscout.com/lottie/premium/thumb/upload-data-to-cloud-4894787-4138955.mp4"
                >
                  <source
                    type="video/mp4"
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/upload-data-to-cloud-4894787-4138955.mp4"
                  />
                </video>
              </div>
              <span className="font-Inter text-sm text-[#65748b] py-1">
                PNG, JPG, GIF up to 10MB
              </span>
              <span className="font-Inter text-sm text-[#65748b]">{`${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()} ${now.getHours()}h:${now.getMinutes()}m:${now.getSeconds()}s`}</span>
            </div>
            <div className="pt-3">
              <label htmlFor="logo">
                <div className="px-1 py-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                  <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                    Upload logo
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      className="sr-only"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "logo",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </p>
                  {formik.touched.logo && formik.errors.logo ? (
                    <p className="text-center animate-pulse text-[#f2566e] text-sm md:text-base font-normal mt-1">
                      {formik.errors.logo}
                    </p>
                  ) : null}
                </div>
              </label>
            </div>
          </div>
          {/* Right */}
          <div className="pt-16 w-full md:w-[70%] md:pt-0 md:pl-6">
            <div className="sm:px-6 sm:pb-8">
              <h3 className="ml-5 md:ml-0 text-lg font-medium leading-6 text-gray-900">
                Coupon information
              </h3>
              <p className="mt-1 ml-5 md:ml-0 text-sm text-[#65748b]">
                This information of coupon will be saving into the database.
              </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="code"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        autoComplete="code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled={true}
                        value={formik.values.code}
                      />
                      {formik.touched.code && formik.errors.code ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.code}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        id="listbox-label"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Discount
                      </label>
                      <div className="mt-1 relative">
                        <button
                          type="button"
                          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          aria-haspopup="listbox"
                          aria-expanded="true"
                          aria-labelledby="listbox-label"
                          onClick={() => setSelect(!select)}
                        >
                          <span className="flex items-center">
                            <img
                              src={formik.values.src}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span className="text-[#b8f5d7] font-semibold ml-3 block truncate">
                              {formik.values.type}
                            </span>
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>

                        <ul
                          className={`${
                            select
                              ? "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                              : "hidden"
                          } `}
                          tabIndex="-1"
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-3"
                        >
                          {ls_status &&
                            ls_status.map((item, index) => (
                              <li
                                key={index}
                                className="text-gray-900 select-auto relative py-2 pl-3 pr-9 cursor-pointer"
                                id="listbox-option-0"
                                aria-selected="true"
                                role="option"
                                onClick={() => selected(formik, item)}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="flex-shrink-0 h-6 w-6 rounded-full"
                                  />

                                  <span
                                    className={`${item.color} font-semibold ml-3 block truncate`}
                                  >
                                    {item.type}
                                  </span>
                                </div>

                                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="shipping_discount"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Shipping discount
                      </label>
                      <input
                        type="text"
                        name="shipping_discount"
                        id="shipping_discount"
                        autoComplete="shipping_discount"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                        value={formik.values.shipping_discount}
                      />
                      {formik.touched.shipping_discount &&
                      formik.errors.shipping_discount ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.shipping_discount}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="percent_discount"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Percent
                      </label>
                      <input
                        type="text"
                        name="percent_discount"
                        id="percent_discount"
                        autoComplete="percent_discount"
                        className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled={true}
                        onChange={formik.handleChange}
                        value={formik.values.percent_discount}
                      />
                      {formik.touched.percent_discount &&
                      formik.errors.percent_discount ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.percent_discount}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className=" py-5 text-right">
                    {loading ? (
                      <button className="inline-flex items-center justify-center py-1 px-4 sm:py-3 sm:px-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                        <Spin color="#5048e5" width="20px" height="20px" />
                        <span className="text-center font-Inter font-semibold text-[#5048e5] ml-3">
                          Processing...
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showModal !== undefined && <ModalPayment status={showModal} />}
    </div>
  );
}

function UpdateCoupon() {
  let [now, setNow] = useState(new Date());
  let [select, setSelect] = useState(false);
  let [loading, setLoading] = useState(false);
  let [showModal, setShowModal] = useState(undefined);
  let ls_status = [
    {
      icon: popularIcon,
      type: "TEN_PERCENT",
      percent_discount: 10,
      color: "text-[#7affa3]",
    },
    {
      icon: newIcon,
      type: "TWENTY_PERCENT",
      percent_discount: 20,
      color: "text-[#47e979]",
    },
    {
      icon: saleIcon,
      type: "THIRTY_PERCENT",
      percent_discount: 30,
      color: "text-[#6bd98d]",
    },
    {
      icon: saleIcon,
      type: "FORTY_PERCENT",
      percent_discount: 40,
      color: "text-[#48cb8b]",
    },
    {
      icon: saleIcon,
      type: "FIFTY_PERCENT",
      percent_discount: 50,
      color: "text-[#16be4a]",
    },
    {
      icon: saleIcon,
      type: "SIXTY_PERCENT",
      percent_discount: 60,
      color: "text-[#08d773]",
    },
    {
      icon: saleIcon,
      type: "SEVENTY_PERCENT",
      percent_discount: 70,
      color: "text-[#1dd556]",
    },
    {
      icon: saleIcon,
      type: "EIGHTY_PERCENT",
      percent_discount: 80,
      color: "text-[#41a15f]",
    },
    {
      icon: saleIcon,
      type: "NINETY_PERCENT",
      percent_discount: 90,
      color: "text-[#146940]",
    },
    {
      icon: saleIcon,
      type: "NINETY_PERCENT",
      percent_discount: 90,
      color: "text-[#175235]",
    },
  ];
  const initialValues = {
    code: Math.round(Math.random() * 1000000),
    type: "FREE",
    shipping_discount: "",
    percent_discount: 100,
    logo: "",
  };

  let validationSchema = Yup.object().shape({
    shipping_discount: Yup.number().required("Code field can't be blank *"),
    logo: Yup.mixed().required("Please select your logo of coupon *"),
  });

  const formik = useFormik({
    initialValues,

    // POST HTTP lên cho server;
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        // Upload avatar to firebase storage
        const storageRef = ref(storage, `${values.logo.name}`);
        await uploadBytes(storageRef, values.logo).then(() => {
          console.log("Upload logo success !");
        });

        let url_path = await getDownloadURL(ref(storage, values.logo.name));
        formData.append("logo", url_path);
        formData.append("code", values.code);
        formData.append("type", values.type);
        formData.append("shipping_discount", values.shipping_discount);
        formData.append("percent_discount", values.percent_discount);

        let { status } = await createCoupon(formData);
        setShowModal(status);
        setLoading(false);
      } catch (err) {
        console.log(`%c ${err}`, "color: red");
      }
    },
    validationSchema,
  });

  setInterval(() => {
    setNow(new Date());
  }, 1000);

  // Change select type in formdata
  const selected = (formik, item) => {
    formik.values.type = item.type;
    formik.values.percent_discount = item.percent_discount;
    setSelect(!select);
  };

  return (
    <div className="max-w-6xl pt-16 mx-auto">
      <p className="font-bold ml-5 text-3xl lg:ml-0"> New coupon</p>
      <form onSubmit={formik.handleSubmit}>
        {/* Left */}
        <div className="flex flex-wrap flex-col md:flex-row pt-8">
          <div className="w-full px-5 lg:px-0 md:w-[30%]">
            <div className="flex flex-col justify-center items-center px-6 py-8 rounded-md shadow-all-rounded">
              <div>
                <video
                  className="max-w-full"
                  autoPlay="autoplay"
                  muted="muted"
                  loop="loop"
                  poster="https://cdnl.iconscout.com/lottie/premium/thumb/upload-data-to-cloud-4894787-4138955.mp4"
                >
                  <source
                    type="video/mp4"
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/upload-data-to-cloud-4894787-4138955.mp4"
                  />
                </video>
              </div>
              <span className="font-Inter text-sm text-[#65748b] py-1">
                PNG, JPG, GIF up to 10MB
              </span>
              <span className="font-Inter text-sm text-[#65748b]">{`${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()} ${now.getHours()}h:${now.getMinutes()}m:${now.getSeconds()}s`}</span>
            </div>
            <div className="pt-3">
              <label htmlFor="logo">
                <div className="px-1 py-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                  <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                    Upload logo
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      className="sr-only"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "logo",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </p>
                  {formik.touched.logo && formik.errors.logo ? (
                    <p className="text-center animate-pulse text-[#f2566e] text-sm md:text-base font-normal mt-1">
                      {formik.errors.logo}
                    </p>
                  ) : null}
                </div>
              </label>
            </div>
          </div>
          {/* Right */}
          <div className="pt-16 w-full md:w-[70%] md:pt-0 md:pl-6">
            <div className="sm:px-6 sm:pb-8">
              <h3 className="ml-5 md:ml-0 text-lg font-medium leading-6 text-gray-900">
                Coupon information
              </h3>
              <p className="mt-1 ml-5 md:ml-0 text-sm text-[#65748b]">
                This information of coupon will be saving into the database.
              </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="code"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        autoComplete="code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled={true}
                        value={formik.values.code}
                      />
                      {formik.touched.code && formik.errors.code ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.code}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        id="listbox-label"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Discount
                      </label>
                      <div className="mt-1 relative">
                        <button
                          type="button"
                          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          aria-haspopup="listbox"
                          aria-expanded="true"
                          aria-labelledby="listbox-label"
                          onClick={() => setSelect(!select)}
                        >
                          <span className="flex items-center">
                            <img
                              src={formik.values.src}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span className="text-[#b8f5d7] font-semibold ml-3 block truncate">
                              {formik.values.type}
                            </span>
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>

                        <ul
                          className={`${
                            select
                              ? "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                              : "hidden"
                          } `}
                          tabIndex="-1"
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-3"
                        >
                          {ls_status &&
                            ls_status.map((item, index) => (
                              <li
                                key={index}
                                className="text-gray-900 select-auto relative py-2 pl-3 pr-9 cursor-pointer"
                                id="listbox-option-0"
                                aria-selected="true"
                                role="option"
                                onClick={() => selected(formik, item)}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="flex-shrink-0 h-6 w-6 rounded-full"
                                  />

                                  <span
                                    className={`${item.color} font-semibold ml-3 block truncate`}
                                  >
                                    {item.type}
                                  </span>
                                </div>

                                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="shipping_discount"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Shipping discount
                      </label>
                      <input
                        type="text"
                        name="shipping_discount"
                        id="shipping_discount"
                        autoComplete="shipping_discount"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                        value={formik.values.shipping_discount}
                      />
                      {formik.touched.shipping_discount &&
                      formik.errors.shipping_discount ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.shipping_discount}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="percent_discount"
                        className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                      >
                        Percent
                      </label>
                      <input
                        type="text"
                        name="percent_discount"
                        id="percent_discount"
                        autoComplete="percent_discount"
                        className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled={true}
                        onChange={formik.handleChange}
                        value={formik.values.percent_discount}
                      />
                      {formik.touched.percent_discount &&
                      formik.errors.percent_discount ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.percent_discount}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className=" py-5 text-right">
                    {loading ? (
                      <button className="inline-flex items-center justify-center py-1 px-4 sm:py-3 sm:px-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                        <Spin color="#5048e5" width="20px" height="20px" />
                        <span className="text-center font-Inter font-semibold text-[#5048e5] ml-3">
                          Processing...
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showModal !== undefined && <ModalPayment status={showModal} />}
    </div>
  );
}

function CouponSite() {
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(true);
  let [couponList, setCouponList] = useState([]);
  useEffect(() => {
    (async () => {
      let { coupons } = await getCoupon();
      setCouponList(coupons);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="pt-10 px-8 mx-auto w-full">
      <UpSearch
        headTitle={"Coupons"}
        upTitle={"Add Coupon"}
        placeSearch={"Search coupon"}
        setSearch={setSearch}
        path="/dashboard/coupon/insert"
      />
      {loading ? (
        <div className="flex justify-center items-center mt-[15%]">
          <Hypnosis duration="4s" width="70px" height="70px" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7">
          {couponList
            .filter((item) =>
              item
                ? item.type.toLowerCase().includes(search.toLowerCase())
                : search === ""
            )
            .map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 w-full h-max rounded-lg shadow-all-rounded sm:text-sm cursor-pointer transition duration-500 hover:-translate-y-3"
              >
                <div className="col-span-2 py-6 pl-4">
                  <div className="flex flex-col">
                    <div className="inline-flex">
                      <p className="font-Inter text-lg font-semibold tracking-wider">
                        {item.percent_discount * 100}%
                      </p>
                      <span className="font-semibold text-green-500 ml-1">
                        off
                      </span>
                    </div>
                    <p className="font-Inter font-medium tracking-normal">
                      Code:
                      <span className="font-Inter font-bold tracking-normal text-bg_272b41 ml-1">
                        {item.code}
                      </span>
                    </p>
                    <p className="font-Inter font-medium tracking-normal">
                      Menu Maxi Best of
                    </p>
                  </div>
                </div>
                <div className="grid place-content-center w-full border-dashed border-l-2 border-gray_7a82a6 border-opacity-70">
                  <div className="w-10 h-10">
                    <img
                      className="w-full h-full"
                      src={item.logo}
                      alt="Logo rebook brand"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export { CouponSite, InsertCoupon, UpdateCoupon };
