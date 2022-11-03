import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin } from "react-cssfx-loading";
import { useFormik } from "formik";
import * as Yup from "yup";

// Firestore upload image
import { storage } from "../../firebase/initializeApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { ModalMessage } from "../../components/Modal";

const axios = require("axios").default;
// const host = "https://be-shoes-web.herokuapp.com";
const host = "http://localhost:3001";
// Init values data formik
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  passwo_: "",
  avatar: null,
  address: "",
};

// Validate Schema formik
let validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches("^[a-zA-Z]+$", "You can only type letter")
    .max(8, "Only less than 8 letter")
    .required("Please enter your first name *"),
  lastName: Yup.string()
    .matches("^[a-zA-Z]+$", "You can only type letter")
    .max(8, "Only less than 8 letter")
    .required("Please enter you last name *"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email *"),
  phone: Yup.string()
    .matches("^[0-9]+", "You can only type number")
    .max(11, "Only less than 10 number")
    .required("Please enter your number *"),
  passwo_: Yup.string().required("Please enter your password *"),
  avatar: Yup.mixed().required("Please select your cover photo *"),
  address: Yup.string().required("Please enter your address *"),
});

// Form component
function FormRegister() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const cancelButtonRef = useRef(null);
  // Formik
  const formik = useFormik({
    initialValues,

    // POST HTTP lên cho server;
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        // Upload avatar to firebase storage
        const storageRef = ref(storage, `${values.avatar.name}`);
        await uploadBytes(storageRef, values.avatar).then(() => {
          console.log("Upload image success !");
        });

        // GET url path image from firebase store
        let url_path = await getDownloadURL(ref(storage, values.avatar.name));

        formData.append("avatar", values.avatar);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("avatar", url_path);
        formData.append("passwo_", values.passwo_);
        formData.append("address", values.address);
        const { data } = await axios.post(`${host}/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // const { data } = await axios.post(`/register`, formData);
        if (data.success) {
          setShowModal(data.success);
        } else window.alert("This email maybe exists already");

        setLoading(false);
      } catch (err) {
        console.log(`%c ${err}`, "color: red");
      }
    },
    validationSchema,
  });
  return (
    <>
      {/* Register Form */}
      <div
        data-aos="fade-left"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
        data-aos-once="true"
        className="w-max md:w-auto"
      >
        <div className="sm:px-6 sm:pb-8">
          <h3 className="ml-5 md:ml-0 text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 ml-5 md:ml-0 text-sm text-[#65748b]">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      className="mt-1 transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.firstName}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.lastName}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
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
                      autoComplete="email"
                      className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.email}
                      </p>
                    ) : null}
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
                      className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="passwo_"
                      className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="passwo_"
                      id="passwo_"
                      className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={formik.handleChange}
                      value={formik.values.passwo_}
                    />
                    {formik.touched.passwo_ && formik.errors.passwo_ ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.passwo_}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-semibold text-indigo-500 text-opacity-90">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="avatar"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span className="text-sm font-semibold text-indigo-500">
                              Upload a file
                            </span>
                            <input
                              id="avatar"
                              name="avatar"
                              type="file"
                              className="sr-only"
                              // accept="image/png, image/jpeg"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "avatar",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </label>
                          <p className="pl-1 font-semibold">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 font-semibold">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    {formik.touched.avatar && formik.errors.avatar ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.avatar}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-indigo-500 text-opacity-90"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      className="mt-1 transition-colors duration-500  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <p className="animate-pulse text-[#f2566e] text-sm md:text-base">
                        {formik.errors.address}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3">
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
                      className="py-2 px-4 sm:py-3 sm:px-5 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer"
                    >
                      <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                        Register
                      </p>
                    </button>
                  )}

                  <Link to="/login">
                    <button className="py-2 px-4 sm:py-3 sm:px-5 border-2 hover:border-opacity-60 rounded-md shadow-all-rounded transition-colors duration-500 hover:border-[#5048e5] cursor-pointer">
                      <p className="w-full text-center font-Inter font-semibold text-[#5048e5]">
                        Sign In
                      </p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Modal Message*/}
      <div>
        <ModalMessage
          showModal={showModal}
          setShowModal={setShowModal}
          caption={"Create account success"}
        />
      </div>
    </>
  );
}

function Register() {
  // Lưu state thay đổi để aos animation được render lại
  const [pageId, setPageId] = useState(0);

  // Sau khi state thay đổi thì did mound sẽ re-render lại component
  useEffect(() => {
    setPageId(Math.random());
  }, []);
  return (
    <div className="relative w-full h-screen">
      <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-2 absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:w-max">
        {/* Left animation */}
        <div
          // Key ID page để re-render lại nếu có sự thay đổi
          key={pageId}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-once="true"
          data-aos-duration="1000"
        >
          <video
            className="max-w-full md:max-w-max"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            poster="https://cdnl.iconscout.com/lottie/premium/thumb/mobile-marketing-4209913-3505408.mp4"
          >
            <source
              type="video/mp4"
              src="https://cdnl.iconscout.com/lottie/premium/thumb/mobile-marketing-4209913-3505408.mp4"
            />
          </video>
        </div>
        {/* Right formik */}
        <FormRegister />
      </div>
    </div>
  );
}

export { Register };
