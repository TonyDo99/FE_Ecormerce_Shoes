import { useState, useEffect } from "react";
import { fetchUser, uploadProduct } from "../../api/adminAPI";
import { useFormik } from "formik";
import { Spin } from "react-cssfx-loading";
import * as Yup from "yup";

import { storage } from "../../firebase/initializeApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const axios = require("axios").default;
// const host = "http://localhost:3001";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  passwo_: "",
  avatar: null,
  address: "",
};

// Validate Schema formik
let validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches("^[a-zA-Z]+$", "You can only type letter")
    .max(8, "Only less than 8 letter"),
  lastName: Yup.string()
    .matches("^[a-zA-Z]+$", "You can only type letter")
    .max(8, "Only less than 8 letter"),
  phone: Yup.string()
    .matches("^[0-9]+", "You can only type number")
    .max(11, "Only less than 10 number"),
  passwo_: Yup.string().required("* Password cannot be blank"),
  avatar: Yup.mixed(),
  address: Yup.string(),
});

function AccountSite() {
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUser()
      .then((info) => {
        setAccount(info);
      })
      .catch((err) => {
        console.log(`%c ${err}`, "color: red");
      });
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        // Upload avatar to firebase storage
        if (values.avatar) {
          const storageRef = ref(storage, `${values.avatar.name}`);
          await uploadBytes(storageRef, values.avatar).then(() => {
            console.log("Upload image success !");
          });

          // GET url path image from firebase store
          let url_path = await getDownloadURL(ref(storage, values.avatar.name));

          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName);
          formData.append("phone", values.phone);
          formData.append("avatar", url_path);
          formData.append("passwo_", values.passwo_);
          formData.append("address", values.address);
          let { status, message } = await uploadProduct(formData);
          if (status) window.alert(message);
          else window.alert(message);
        } else {
          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName);
          formData.append("phone", values.phone);
          formData.append("passwo_", values.passwo_);
          formData.append("address", values.address);
          let { status, message } = await uploadProduct(formData);
          if (status) window.alert(message);
          else window.alert(message);
        }
      } catch (err) {
        console.log(`%c ${err}`, "color: red");
      }
    },
    validationSchema,
  });
  return (
    <div className="max-w-6xl pt-16 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <p className="font-bold ml-5 text-3xl lg:ml-0">Account</p>
        <div className="flex flex-wrap flex-col md:flex-row pt-8">
          {/* Left */}
          <div className="w-full px-5 lg:px-0 md:w-[30%]">
            <div className="flex flex-col justify-center items-center px-6 py-8 rounded-md shadow-all-rounded">
              <div className="w-24 h-24">
                <img
                  className="rounded-full w-full h-full"
                  src={account.avatar}
                  alt="Avatar"
                />
              </div>
              <p className="font-Inter font-semibold text-xl py-2">Phát Đỗ</p>
              <span className="font-Inter text-sm text-[#65748b] py-1">
                Los Angeles USA
              </span>
              <span className="font-Inter text-sm text-[#65748b]">GTM-7</span>
            </div>
            <div className="pt-3">
              <label htmlFor="avatar">
                <div className="px-1 py-3 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                  <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                    Upload picture
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      className="sr-only"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "avatar",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </p>
                </div>
              </label>
            </div>
            {formik.touched.avatar && formik.errors.avatar ? (
              <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                {formik.errors.avatar}
              </p>
            ) : null}
          </div>
          {/* Right */}
          <div className="pt-16 w-full md:w-[70%] md:pt-0 md:pl-6">
            <div className="sm:px-6 sm:pb-8">
              <h3 className="ml-5 md:ml-0 text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 ml-5 md:ml-0 text-sm text-[#65748b]">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="first-name"
                        defaultValue={account.firstName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.firstName}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        autoComplete="family-name"
                        defaultValue={account.lastName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.lastName}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email-address"
                        autoComplete="email"
                        defaultValue={account.email}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled={true}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
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
                        autoComplete="phone"
                        defaultValue={account.phone}
                        className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="passwo_"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="passwo_"
                        id="passwo_"
                        autoComplete="password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                      />
                      {formik.touched.passwo_ && formik.errors.passwo_ ? (
                        <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                          {formik.errors.passwo_}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        defaultValue={account.address}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={formik.handleChange}
                      />
                    </div>
                    {formik.touched.address && formik.errors.address ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.address}
                      </p>
                    ) : null}
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
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export { AccountSite };
